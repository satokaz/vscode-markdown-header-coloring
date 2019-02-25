import * as vscode from 'vscode'
import { decorate, userDecorate } from './decorator';
import { userDefinedHeaderProperties } from "./userDefinedHeaderProperties";

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "vscode-ramarkdown-header-coloring" is now active!');

    // let userDefinedHeaderColor;
    // let userDefinedHeaderColor: Boolean = vscode.workspace.getConfiguration('markdown-header-coloring').get<Boolean>('userDefinedHeaderColor');
    let userDefinedHeaderColor: userDefinedHeaderProperties = vscode.workspace.getConfiguration('markdown-header-coloring').get<object>('userDefinedHeaderColor');

    
    // if (!vscode.window.activeTextEditor) {
        
    // } else {
    //     // editor = vscode.window.activeTextEditor;
    //     if (vscode.window.activeTextEditor.document.languageId == 'markdown') {
    //         (userDefinedHeaderColor.enabled === false) ? decorate() : userDecorate();
    //         // userDecorate();
    //     }    
    // }


    if (vscode.window.activeTextEditor.document.languageId == 'markdown') {
        (userDefinedHeaderColor.enabled === false) ? decorate() : userDecorate();
        // userDecorate();
    }

    // vscode.window.onDidChangeVisibleTextEditors(e => {
    //     if (vscode.window.activeTextEditor.document.languageId == 'markdown') {
    //         (userDefinedHeaderColor.enabled === false) ? decorate() : userDecorate();
    //         // userDecorate();
    //     }
    // });

    vscode.workspace.onDidChangeTextDocument(e => {
        if (vscode.window.activeTextEditor.document.languageId == 'markdown') {
            (userDefinedHeaderColor.enabled === false) ? decorate() : userDecorate();
            // userDecorate();
        }
    });

    vscode.workspace.onDidChangeConfiguration(e => {
        if (vscode.window.activeTextEditor.document.languageId == 'markdown') {
            (userDefinedHeaderColor.enabled === false) ? decorate() : userDecorate();
            // userDecorate();
        }
    });

    vscode.window.onDidChangeTextEditorViewColumn(e => {
        if (vscode.window.activeTextEditor.document.languageId == 'markdown') {
            (userDefinedHeaderColor.enabled === false) ? decorate() : userDecorate();
            // userDecorate();
        }
    });

    vscode.window.onDidChangeActiveTextEditor(e => {
        if (vscode.window.activeTextEditor.document.languageId == 'markdown') {
            (userDefinedHeaderColor.enabled === false) ? decorate() : userDecorate();
            // userDecorate();
        }
    });
}

export function deactivate() {}