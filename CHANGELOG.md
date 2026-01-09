# Change Log

## 0.2.0

* **Major Performance Improvements**
  - Implement document caching with LRU eviction (50-95% faster parsing)
  - Add 300ms debounce timer to prevent excessive re-rendering
  - Optimize event handling for better responsiveness

* **Memory Management**
  - Fix memory leak by properly disposing TextEditorDecorationType objects
  - Add disposeAllDecorations() and initializeDecorations() lifecycle helpers
  - Improve global state management

* **Configuration Management**
  - Remove "Reload Window" requirement - settings now apply immediately
  - Apply decorations to all visible editors on configuration changes
  - Add refreshConfiguration() export for external configuration refresh
  - Add getConfiguration<T>() helper to reduce code duplication

* **YAML Front Matter**
  - Stricten YAML front matter regex patterns for better accuracy
  - YAML front matter now only starts at the top of the file (first non-empty line)
  - Prevent header coloring from breaking on horizontal rules (`---`)

* **Multi-Editor Support**
  - Support split-view scenarios with multiple Markdown editors
  - Apply decorations to all visible editors simultaneously
  - Add applyDecorationsToAllVisibleEditors() function

* **Code Block Improvements**
  - Improve fenced code block detection: support both backtick and tilde fences
  - Allow up to 3 leading spaces (CommonMark compliance)
  - Add support for indented code blocks (4 spaces or a tab)
  - Fix: Indented list items no longer incorrectly trigger indented code block detection

* **Language Support**
  - Add support for Quarto (`.qmd`) files
  - Add configuration `markdown-header-coloring.enabledLanguages`

* **Type Safety**
  - Add explicit type annotation to rainbowsLine array
  - Improve TypeScript type definitions throughout

* **Dependencies**
  - Update VS Code engine requirement from ^1.80.0 to ^1.87.0
  - Update @types/vscode from ^1.85.0 to ^1.87.0

## 0.1.9

* Ignore YAML front matter comments: issue#30
## 0.1.8

* Add support for running in web environments

## 0.1.7

* Fix misuse of os.EOL. (Wrong display in Windows environment)
* The occurrence of codeblock tag checks only the beginning of the line.

## 0.1.6

* Revert: Fix not to apply to '#' appearing in YAML

## 0.1.5

* Adopt webpack
* Add CSS Injection to "backgroundColor"
* Fix not to apply to '#' appearing in YAML

## 0.1.4

* Fixed debug message suppression

## 0.1.3

* Fix not to apply to '#' appearing in codeblock without indentation

## 0.1.2

* Explicitly activate in Markdown mode
* [Issue #12](https://github.com/satokaz/vscode-markdown-header-coloring/issues/12), Remove update by onDidChangeVisibleTextEditors.

## 0.1.1

* [Issue #7](https://github.com/satokaz/vscode-markdown-header-coloring/issues/7#issuecomment-456640884), Added workaround by CSS Injection.

## 0.1.0

* Adopt [bpostlethwaite/colormap](https://github.com/bpostlethwaite/colormap). 
  - New `markdown-header-coloring.colormapConfig` setting
  
* Add user defined settings for each header level
  - New `markdown-header-coloring.userDefinedHeaderColor` setting

## 0.0.5

* again: To reduce the CPU load, do not generate coloring arrays

## 0.0.4

* To reduce the CPU load, do not generate coloring arrays
