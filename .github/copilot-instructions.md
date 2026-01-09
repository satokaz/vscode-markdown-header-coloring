# GitHub Copilot Instructions for Markdown Header Coloring Extension

## Project Overview

This VS Code extension applies colors and styles to Markdown header lines (`#`, `##`, `###`, etc.) to improve readability. It supports two modes:
- **Colormap Mode**: Automatically generates colors using the colormap library
- **User-Defined Mode**: Allows users to customize colors for each header level (H1-H6)

**Supported Languages**: Markdown and Quarto (configurable via `enabledLanguages` setting)

## Architecture

### Core Components

1. **extension.ts**: Extension lifecycle and event management
   - Handles activation, event subscriptions, and debouncing
   - Manages editor changes with 300ms debounce timer
   - Applies decorations to all visible editors on configuration changes
   - `isLanguageEnabled(editor)`: Checks if editor's language is in `enabledLanguages`
   - `FULL_UPDATE_INTERVAL`: 5 second periodic full update tracking

2. **decorator.ts**: Core decoration logic
   - Document parsing (excludes YAML front matter and code blocks)
   - Supports fenced code blocks (``` and ~~~) with fence type/length tracking
   - Supports indented code blocks (4 spaces or tab)
   - YAML front matter only at file start (first non-empty line)
   - Header detection using regex `/(^#{1,}\s)/gm`
   - Decoration generation and application
   - Document caching for performance (LRU cache, max 10 entries)

3. **userDefinedHeaderProperties.ts**: TypeScript type definitions

### Key Functions

- `isLanguageEnabled(editor)`: Checks if editor's language is enabled
- `applyDecorations(editor?)`: Applies decorations to a specific or active editor
- `applyDecorationsToAllVisibleEditors()`: Applies to all visible enabled language editors
- `decorate(editor?)`: Applies colormap-based decorations
- `userDecorate(editor?)`: Applies user-defined decorations
- `codeblockParse(text)`: Parses and filters document content (YAML, fenced code, indented code)
- `getParsedContent(editor)`: Returns cached parsed content
- `refreshConfiguration()`: Reloads all settings and reinitializes decorations
- `clearDocumentCache(uri?)`: Clears document cache (specific or all)

## Coding Standards

### Memory Management

**CRITICAL**: Always call `dispose()` on `TextEditorDecorationType` objects:

```typescript
// ✅ CORRECT
rainbowsLine.forEach(decoration => decoration.dispose());

// ❌ WRONG - Missing parentheses!
rainbowsLine.forEach(decoration => decoration.dispose);
```

**Pattern**: Always use helper functions for lifecycle management:

```typescript
function disposeAllDecorations() {
    rainbowsLine.forEach(decoration => decoration.dispose());
    rainbowsLine = [];
}

function initializeDecorations() {
    disposeAllDecorations();  // Always dispose first
    // ... create new decorations
}
```

### Type Safety

- Use explicit types for arrays: `vscode.TextEditorDecorationType[]`
- Use `boolean` (primitive) not `Boolean` (wrapper class)
- Always type function parameters and return values

```typescript
// ✅ CORRECT
function getParsedContent(editor: vscode.TextEditor): string {
    // ...
}

// ❌ AVOID
function getParsedContent(editor) {
    // ...
}
```

### Performance Optimization

#### Debouncing

Always debounce text change events to prevent excessive re-rendering:

```typescript
let debounceTimer: NodeJS.Timeout | undefined;
const DEBOUNCE_DELAY = 300; // milliseconds

function handleEditorChange(immediate: boolean = false) {
    if (immediate) {
        applyDecorations();
        return;
    }
    
    if (debounceTimer) {
        clearTimeout(debounceTimer);
    }
    
    debounceTimer = setTimeout(() => {
        applyDecorations();
    }, DEBOUNCE_DELAY);
}
```

#### Document Caching

Cache parsed document content to avoid redundant parsing:

```typescript
let documentCache: Map<string, {
    content: string;
    parsedContent: string;
    version: number;
}> = new Map();

function getParsedContent(editor: vscode.TextEditor): string {
    const uri = editor.document.uri.toString();
    const version = editor.document.version;
    const content = editor.document.getText();
    
    const cached = documentCache.get(uri);
    if (cached && cached.version === version && cached.content === content) {
        return cached.parsedContent;
    }
    
    const parsed = codeblockParse(content);
    documentCache.set(uri, {content, parsedContent: parsed, version});
    
    // LRU eviction
    if (documentCache.size > 10) {
        const firstKey = documentCache.keys().next().value;
        documentCache.delete(firstKey);
    }
    
    return parsed;
}
```

**IMPORTANT**: Always clear cache on document/configuration changes:

```typescript
// On document change
clearDocumentCache(event.document.uri.toString());

// On configuration change
clearDocumentCache(); // Clear all
```

### Configuration Changes

Configuration changes should apply immediately to ALL visible editors:

```typescript
// Helper to check for enabled languages (markdown, quarto, etc.)
function isLanguageEnabled(editor: vscode.TextEditor): boolean {
    const enabledLanguages = vscode.workspace.
        getConfiguration('markdown-header-coloring')
        .get<string[]>('enabledLanguages');
    return enabledLanguages.includes(editor.document.languageId);
}

vscode.workspace.onDidChangeConfiguration(event => {
    if (event.affectsConfiguration('markdown-header-coloring')) {
        clearDocumentCache();           // Clear cache
        refreshConfiguration();          // Reload settings
        applyDecorationsToAllVisibleEditors(); // Apply to all
    }
});
```

**DO NOT** rely on `activeTextEditor` alone - users may have multiple editors open in split view.

### YAML Front Matter Parsing

Use strict regex patterns for YAML front matter detection:

```typescript
// Start delimiter: exactly "---" with optional whitespace
if (v.match(/^---\s*$/)) {
    isFrontMatter = true;
}

// End delimiter: "---" or "..." with optional content after
if (v.match(/^(---|\.\.\.)\s*$/)) {
    isFrontMatter = false;
    isFrontMatterEnd = true;
}
```

**IMPORTANT**: YAML front matter is only valid at the very beginning of the file (first non-empty line).

### Code Block Parsing

Support both fenced and indented code blocks:

```typescript
let fenceChar: string | null = null; // '`' or '~'
let fenceLen: number = 0; // Number of fence chars (3+)
let isIndentedCode: boolean = false;
let prevLineWasBlank: boolean = true;

// Fence code block detection (``` or ~~~, up to 3 leading spaces)
const m = v.match(/^\s{0,3}(```+|~~~+)/);
if (m) {
    isCodeBlock = true;
    fenceChar = m[1][0];
    fenceLen = m[1].length;
}

// Indented code block (4 spaces or tab after blank line)
if (prevLineWasBlank && /^(\t| {4})/.test(v)) {
    isIndentedCode = true;
}
```

## Common Pitfalls

### 1. Memory Leaks
- Always dispose TextEditorDecorationType objects
- Use `disposeAllDecorations()` before creating new decorations

### 2. Excessive Re-rendering
- Always debounce text change events
- Don't call decoration functions directly in event handlers without debouncing

### 3. Stale Configuration
- Call `refreshConfiguration()` on configuration changes
- Re-fetch configuration in decoration functions if needed

### 4. Cache Inconsistency
- Clear cache when documents change
- Clear ALL cache when configuration changes

### 5. Missing Editors
- Apply decorations to all visible editors, not just active one
- Use `vscode.window.visibleTextEditors.forEach(...)` for configuration changes

## Testing Checklist

When making changes, verify:

- [ ] No memory leaks (decorations properly disposed)
- [ ] Performance is acceptable (debouncing works)
- [ ] Configuration changes reflect immediately in all open editors
- [ ] YAML front matter is correctly excluded
- [ ] Fenced code blocks (``` and ~~~) are correctly excluded
- [ ] Indented code blocks (4-space/tab) are correctly excluded
- [ ] Cache is cleared appropriately
- [ ] TypeScript compiles without errors: `npm run compile`
- [ ] Works in split-view scenarios
- [ ] Works with Quarto files (.qmd) when enabled

## Development Commands

```bash
# Compile TypeScript
npm run compile

# Watch mode (auto-compile on save)
npm run watch

# Run extension in debug mode
F5 in VS Code

# Package extension
npm run package
```

## commit

- Commit messages should be generated in English

## References

- Full architecture documentation: See `ARCHITECTURE.md`
- VS Code Extension API: https://code.visualstudio.com/api
- Decoration API: https://code.visualstudio.com/api/references/vscode-api#TextEditorDecorationType
