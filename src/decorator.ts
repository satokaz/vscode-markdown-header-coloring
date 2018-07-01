import * as vscode from "vscode"
import { rainborColors } from "./rainbow";
import * as hex2rgba from "hex2rgba";

let textDecorationSetting = vscode.workspace.getConfiguration('markdown-header-coloring').get<string>('textDecoration');
let fontColorSetting = vscode.workspace.getConfiguration('markdown-header-coloring').get<string>('fontColor');
let backgroundColor = vscode.workspace.getConfiguration('markdown-header-coloring').get<string>('backgroundColor');

let colors = Array.from(rainborColors);

let rainbowsLine = colors.map(x => vscode.window.createTextEditorDecorationType({
    isWholeLine: true,
    backgroundColor: (backgroundColor == "" ) ? hex2rgba(x, 0.3) : backgroundColor,
    overviewRulerColor: (fontColorSetting == "") ? x : fontColorSetting,
    color: (fontColorSetting == "") ? x : fontColorSetting,
    rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
    textDecoration: textDecorationSetting,
    // textDecoration: `position: relative; display: inline-block; padding: 1px; font-size: 1.5em; text-shadow : 
    // 1px  1px 1px rgba(255,255,255,0.1),
    // -1px  1px 1px rgba(255,255,255,0.1),
    //  1px -1px 1px rgba(255,255,255,0.1),
    // -1px -1px 1px rgba(255,255,255,0.1),
    //  1px  0px 1px rgba(255,255,255,0.1),
    //  0px  1px 1px rgba(255,255,255,0.1),
    // -1px  0px 1px rgba(255,255,255,0.1),
    //  0px -1px 1px rgba(255,255,255,0.1);`,
}));

vscode.workspace.onDidChangeConfiguration(e => {
    if (vscode.window.activeTextEditor.document.languageId == 'markdown') {
        backgroundColor = vscode.workspace.getConfiguration('markdown-header-coloring').get<string>('backgroundColor');
        decorate();
    }
})

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function decorate() {

    let editor = vscode.window.activeTextEditor;
    let text = editor.document.getText().split('\n');

    if(!editor) {
        return;
    }

    // let regex = /(^#\s|^(.)#+\s)/gm;
    let regex = /(^#{1,}\s)/g;
    let decorators = colors.map(color => []);
    let match: RegExpMatchArray;
    let offset: number;

    if (vscode.workspace.getConfiguration('markdown-rainbow-header').get<boolean>('destroyMode')) {
        offset = getRandomInt(0, colors.length);
    } else {
        offset = 10;
    }

    text.forEach((v, i) => {
        match = v.match(regex);
        if (!match) {
            return;
        }
        // console.log(` ${i} match =`, match);
        offset--;

        let matchLine = i + 1;
        let rainbowIndex = Math.abs((i + offset) % colors.length);
        // console.log("rainbowIndex =", rainbowIndex);
        let start = new vscode.Position(Number(matchLine) -1, 0);
        decorators[rainbowIndex].push(new vscode.Range(start, start));
        // console.log('decorators[rainbowIndex] =', decorators[rainbowIndex])
    });

    decorators.forEach(async (d, index) => {
        // console.log(d);
        rainbowsLine[index].dispose;
        editor.setDecorations(rainbowsLine[index], d);
    })
}
