import * as vscode from 'vscode'
import { decorate } from './decorator';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "vscode-ramarkdown-header-coloring" is now active!');

    vscode.window.onDidChangeVisibleTextEditors(e => {
        if (vscode.window.activeTextEditor.document.languageId == 'markdown') {
            decorate();
        }
    })

    vscode.workspace.onDidChangeTextDocument(e => {
        if (vscode.window.activeTextEditor.document.languageId == 'markdown') {
            decorate();
        }
    })

    vscode.workspace.onDidChangeConfiguration(e => {
        if (vscode.window.activeTextEditor.document.languageId == 'markdown') {
            decorate();
        }
    })

    vscode.window.onDidChangeTextEditorViewColumn(e => {
        if (vscode.window.activeTextEditor.document.languageId == 'markdown') {
            decorate();
        }
    })

    if (vscode.window.activeTextEditor.document.languageId == 'markdown') {
        decorate();
    }
}

export function deactivate() { }