import * as vscode from 'vscode';
import { generateHeaderDecorations, refreshConfiguration, clearDocumentCache } from './decorator';
import { decorate, userDecorate } from './decorator';
import { userDefinedHeaderProperties } from "./userDefinedHeaderProperties";

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "vscode-ramarkdown-header-coloring" is now active!');

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
        if (editor && editor.document.languageId === 'markdown') {
            userDefinedHeaderColor.enabled === false ? decorate(editor) : userDecorate(editor);
            return;
        }

        // Otherwise use active editor
        if (vscode.window.activeTextEditor && vscode.window.activeTextEditor.document.languageId === 'markdown') {
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
        // Re-fetch the configuration
        userDefinedHeaderColor = vscode.workspace.getConfiguration('markdown-header-coloring').get<userDefinedHeaderProperties>('userDefinedHeaderColor');
        
        // Apply decorations to all visible markdown editors
        vscode.window.visibleTextEditors.forEach(editor => {
            if (editor.document.languageId === 'markdown') {
                userDefinedHeaderColor.enabled === false ? decorate(editor) : userDecorate(editor);
            }
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

    // Check if a Markdown file is open before applying decoration
    if (vscode.window.activeTextEditor && vscode.window.activeTextEditor.document.languageId == 'markdown') {
        handleEditorChange();
    }

    context.subscriptions.push(vscode.workspace.onDidChangeTextDocument(event => {
        // Clear cache for the changed document
        if (event.document.languageId === 'markdown') {
            clearDocumentCache(event.document.uri.toString());
        }
        handleEditorChange(); // Use debounced update for text changes
    }));
    context.subscriptions.push(vscode.workspace.onDidChangeWorkspaceFolders(() => handleEditorChange()));
    context.subscriptions.push(vscode.window.onDidChangeTextEditorViewColumn(() => handleEditorChange()));
    context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(() => handleEditorChange()));
    context.subscriptions.push(vscode.window.onDidChangeVisibleTextEditors(() => handleEditorChange()));
    context.subscriptions.push(vscode.window.onDidChangeWindowState(() => handleEditorChange()));
    context.subscriptions.push(vscode.window.onDidChangeTextEditorOptions(() => handleEditorChange()));

    // Handle configuration changes
    context.subscriptions.push(
        vscode.workspace.onDidChangeConfiguration(event => {
            if (event.affectsConfiguration('markdown-header-coloring')) {
                console.log('Configuration changed - refreshing decorations');
                
                // Clear all caches since configuration changed
                clearDocumentCache();
                
                // Refresh configuration and re-initialize decorations
                refreshConfiguration();
                
                // Apply decorations to all visible markdown editors immediately
                applyDecorationsToAllVisibleEditors();
            }
        })
    );
}

export function deactivate() {}