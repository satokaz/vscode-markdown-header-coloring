import * as vscode from "vscode"
import { rainborColors } from "./rainbow";

let textDecorationSetting = vscode.workspace.getConfiguration('markdown-header-coloring').get<string>('textDecoration');
let fontColorSetting = vscode.workspace.getConfiguration('markdown-header-coloring').get<string | boolean>('fontColor');
let fontColorOpacity = vscode.workspace.getConfiguration('markdown-header-coloring').get<number>('fontColorOpacity');
let backgroundColor = vscode.workspace.getConfiguration('markdown-header-coloring').get<string | boolean>('backgroundColor');
let backgroundColorOpacity = vscode.workspace.getConfiguration('markdown-header-coloring').get<number>('backgroundColorOpacity');

let colors = Array.from(rainborColors);
// let colors2 = Array.from(rainborColors2);
// let colors = shuffle(Array.from(rainborColors));
// console.log(colors);
// console.log(`rgba(${colors[1]}, ${backgroundColorOpacity})`);

let rainbowsLine = colors.map(x => vscode.window.createTextEditorDecorationType({
    isWholeLine: true,
    backgroundColor: (backgroundColor === "" ) ? `rgba(${x}, ${backgroundColorOpacity})` : (backgroundColor == false ) ? "" : backgroundColor,
    color: (fontColorSetting === "") ? `rgba(${x}, ${fontColorOpacity})` : (fontColorSetting === false) ? "" : fontColorSetting,
    overviewRulerColor: (fontColorSetting === "") ? `rgba(${x}, 1.0)` : fontColorSetting,
    rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
    textDecoration: textDecorationSetting,
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

    if(!editor) {
        return;
    }

    let text = editor.document.getText();

    let regex = /(^#{1,}\s)/gm;
    let decorators = colors.map(color => []);
    let match: RegExpMatchArray;
    let offset: number;

    if (vscode.workspace.getConfiguration('markdown-header-coloring').get<boolean>('destroyMode')) {
        offset = getRandomInt(0, colors.length);
    } else { 
        offset = Math.floor(2 * Math.PI/6);
        // colors.length;
    }

    while ((match = regex.exec(text))) {
        let lines: string[] = [...(match[1] || match[2])];
        offset--;

        lines.forEach((_, index) => {
            let matchIndex = match.index + 1;
            let rainbowIndex =  Math.abs((index + offset) % colors.length);
            let startIndex = matchIndex;
            let start = editor.document.positionAt(startIndex);
            let end = start;
            decorators[rainbowIndex].push(new vscode.Range(start, end));
            // decorators[rainbowIndex].push(new vscode.Range(start, end));
            // console.log('rainbowIndex =', rainbowIndex);
        });
    }

    rainbowsLine.forEach((v, index) => {
        rainbowsLine[index].dispose;
    });

    decorators.forEach(async (d, index) => {
        editor.setDecorations(rainbowsLine[index], d);
    })
}

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
    }
    return array;
}