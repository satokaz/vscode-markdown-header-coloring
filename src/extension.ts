import * as vscode from 'vscode';
import { decorate, userDecorate } from './decorator';
import { userDefinedHeaderProperties } from './userDefinedHeaderProperties';

// Helper to check for markdown or quarto
function isLanguageEnabled(editor: vscode.TextEditor): boolean {
    const enabledLanguages = vscode.workspace.
        getConfiguration('markdown-header-coloring')
        .get<string[]>('enabledLanguages');
    return enabledLanguages.includes(editor.document.languageId);
}

// Main trigger function
function triggerDecoration() {
    const editor = vscode.window.activeTextEditor;
    if (!editor || !isLanguageEnabled(editor)) { 
        return; 
    }

    const userDefinedHeaderColor: userDefinedHeaderProperties = vscode.workspace
        .getConfiguration('markdown-header-coloring')
        .get<object>('userDefinedHeaderColor');

    if (userDefinedHeaderColor.enabled === false) {
        decorate();
    } else {
        userDecorate();
    }
}

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "vscode-ramarkdown-header-coloring" is now active!');

    // Initial trigger on activation
    triggerDecoration();

    // Register events to re-trigger decoration
    context.subscriptions.push(
        vscode.workspace.onDidChangeTextDocument((e: vscode.TextDocumentChangeEvent) => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) { return; }
            if (e.document.uri.toString() !== editor.document.uri.toString()) { return; }
            if (!isLanguageEnabled(editor)) { return; }
            triggerDecoration();
        }),
        vscode.workspace.onDidChangeConfiguration(triggerDecoration),
        vscode.window.onDidChangeTextEditorViewColumn(triggerDecoration),
        vscode.window.onDidChangeActiveTextEditor(triggerDecoration)
    );
}

export function deactivate() {}
