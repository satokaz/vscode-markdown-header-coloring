import * as vscode from 'vscode';
import { generateHeaderDecorations, refreshConfiguration, clearDocumentCache } from './decorator';
import { decorate, userDecorate } from './decorator';
import { userDefinedHeaderProperties } from './userDefinedHeaderProperties';

// Helper to check for enabled languages (markdown, quarto, etc.)
function isLanguageEnabled(editor: vscode.TextEditor): boolean {
    const enabledLanguages = vscode.workspace.
        getConfiguration('markdown-header-coloring')
        .get<string[]>('enabledLanguages');
    return enabledLanguages.includes(editor.document.languageId);
}

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "vscode-markdown-header-coloring" is now active!');

    let userDefinedHeaderColor: userDefinedHeaderProperties = vscode.workspace.getConfiguration('markdown-header-coloring').get<userDefinedHeaderProperties>('userDefinedHeaderColor');

    // Debounce timer for handling editor changes
    let debounceTimer: NodeJS.Timeout | undefined;
    const DEBOUNCE_DELAY = 300; // milliseconds
    
    // Track last full decoration update
    let lastFullUpdate: number = Date.now();
    const FULL_UPDATE_INTERVAL = 5000; // Full update every 5 seconds if needed

    function applyDecorations(editor?: vscode.TextEditor) {
        // Re-fetch the configuration every time this function is called
        userDefinedHeaderColor = vscode.workspace.getConfiguration('markdown-header-coloring').get<userDefinedHeaderProperties>('userDefinedHeaderColor');

        // If specific editor provided, use it
        if (editor && isLanguageEnabled(editor)) {
            userDefinedHeaderColor.enabled === false ? decorate(editor) : userDecorate(editor);
            return;
        }

        // Otherwise use active editor
        if (vscode.window.activeTextEditor && isLanguageEnabled(vscode.window.activeTextEditor)) {
            // Periodically force full update to prevent accumulated errors
            const now = Date.now();
            const shouldForceFullUpdate = (now - lastFullUpdate) > FULL_UPDATE_INTERVAL;
            
            if (shouldForceFullUpdate) {
                lastFullUpdate = now;
            }
            
            userDefinedHeaderColor.enabled === false ? decorate() : userDecorate();
        }
    }

    function applyDecorationsToAllVisibleEditors() {
        userDefinedHeaderColor = vscode.workspace.getConfiguration('markdown-header-coloring').get<userDefinedHeaderProperties>('userDefinedHeaderColor');
        
        const enabledEditors = vscode.window.visibleTextEditors.filter(editor => isLanguageEnabled(editor));
        
        enabledEditors.forEach(editor => {
            userDefinedHeaderColor.enabled === false ? decorate(editor) : userDecorate(editor);
        });
    }

    function handleEditorChange(immediate: boolean = false) {
        // If immediate, apply decorations without debouncing
        if (immediate) {
            applyDecorations();
            return;
        }

        // Clear existing timer
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }

        // Set new timer
        debounceTimer = setTimeout(() => {
            applyDecorations();
        }, DEBOUNCE_DELAY);
    }

    // Apply decorations to all visible enabled language editors on activation
    applyDecorationsToAllVisibleEditors();

    context.subscriptions.push(vscode.workspace.onDidChangeTextDocument(event => {
        // Find all visible editors displaying this document
        const affectedEditors = vscode.window.visibleTextEditors.filter(
            editor => editor.document.uri.toString() === event.document.uri.toString() && isLanguageEnabled(editor)
        );
        
        if (affectedEditors.length === 0) { return; }
        
        // Clear cache for the changed document
        clearDocumentCache(event.document.uri.toString());
        
        // Clear existing timer
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }
        
        // Apply decorations to all affected editors after debounce
        debounceTimer = setTimeout(() => {
            userDefinedHeaderColor = vscode.workspace.getConfiguration('markdown-header-coloring').get<userDefinedHeaderProperties>('userDefinedHeaderColor');
            affectedEditors.forEach(editor => {
                userDefinedHeaderColor.enabled === false ? decorate(editor) : userDecorate(editor);
            });
        }, DEBOUNCE_DELAY);
    }));
    context.subscriptions.push(vscode.workspace.onDidChangeWorkspaceFolders(() => applyDecorationsToAllVisibleEditors()));
    context.subscriptions.push(vscode.window.onDidChangeTextEditorViewColumn(() => applyDecorationsToAllVisibleEditors()));
    context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor((editor) => {
        if (editor && isLanguageEnabled(editor)) {
            applyDecorations(editor);
        }
    }));
    context.subscriptions.push(vscode.window.onDidChangeVisibleTextEditors(() => applyDecorationsToAllVisibleEditors()));
    context.subscriptions.push(vscode.window.onDidChangeWindowState(() => applyDecorationsToAllVisibleEditors()));
    context.subscriptions.push(vscode.window.onDidChangeTextEditorOptions(() => applyDecorationsToAllVisibleEditors()));

    // Handle configuration changes
    context.subscriptions.push(
        vscode.workspace.onDidChangeConfiguration(event => {
            if (event.affectsConfiguration('markdown-header-coloring')) {
                console.log('Configuration changed - refreshing decorations');
                
                // Clear all caches since configuration changed
                clearDocumentCache();
                
                // Refresh configuration and re-initialize decorations
                refreshConfiguration();
                
                // Apply decorations to all visible enabled language editors immediately
                applyDecorationsToAllVisibleEditors();
            }
        })
    );
}

export function deactivate() {}
