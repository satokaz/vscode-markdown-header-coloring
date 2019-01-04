import * as vscode from "vscode"

let textDecorationSetting = vscode.workspace.getConfiguration('markdown-header-coloring').get<string>('textDecoration');
let fontColorSetting = vscode.workspace.getConfiguration('markdown-header-coloring').get<string | boolean>('fontColor');
let fontColorOpacity = vscode.workspace.getConfiguration('markdown-header-coloring').get<number>('fontColorOpacity');
let backgroundColor = vscode.workspace.getConfiguration('markdown-header-coloring').get<string | boolean>('backgroundColor');
let backgroundColorOpacity = vscode.workspace.getConfiguration('markdown-header-coloring').get<number>('backgroundColorOpacity');
let overviewRulerColor = vscode.workspace.getConfiguration('markdown-header-coloring').get<number>('overviewRulerColor');
let afterTextDecoration = vscode.workspace.getConfiguration('markdown-header-coloring').get<number>('afterTextDecoration');
let beforeTextDecoration = vscode.workspace.getConfiguration('markdown-header-coloring').get<number>('beforeTextDecoration');

let colors = ["255,255,255"];

// console.log(`rgba(${colors[1]}, ${backgroundColorOpacity})`);

let rainbowsLine = colors.map(x => vscode.window.createTextEditorDecorationType({
    isWholeLine: true,
    before: {
        textDecoration: `${beforeTextDecoration}`
    },
    after: {
        contentText: "",
        textDecoration: `${afterTextDecoration}`
    },

    backgroundColor: (backgroundColor === "" ) ? `rgba(${x}, ${backgroundColorOpacity})` : (backgroundColor == false ) ? "" : backgroundColor,
    // color: (fontColorSetting === "") ? `rgba(${x}, ${fontColorOpacity})` : (fontColorSetting === false) ? "" : fontColorSetting,
    color: (fontColorSetting !== "") ? (fontColorSetting === false) ? "" : fontColorSetting : `rgba(${x}, ${fontColorOpacity})` ,
    overviewRulerColor: (fontColorSetting === "") ? `rgba(${x}, 0.8)` : fontColorSetting,
    rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
    textDecoration: textDecorationSetting,
}));


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
        // offset = 1;
        // offset = colors.length;
    }

    while ((match = regex.exec(text))) {
        let lines: string[] = [...(match[1] || match[2])];
        let lines2: string[] = match;

        // ex) # 1
        // match[0] = #
        // match[1] = # 
        // match[2] = undefined
        console.log('match[0] =', match[0]);
        console.log('match[1] =', match[1]);
        console.log('match[2] =', match[2]);

        match.forEach((v, i) => {
            console.log('v =', v);
            console.log('i =', i);
        });

        // lines.forEach((a, i) => {
        //     console.log('a =', a);
        //     console.log('i=',i);
        // });

        // console.log('lines', lines);

        // if (backgroundColor === "") {
            lines.forEach((v, index) => {
                // console.log('v =', v);
                let matchIndex = match.index + 1;
                let startIndex = matchIndex;
                let start = editor.document.positionAt(startIndex);
                let end = start;

                // 結局、rainbowIndex は 0 のママで decorators[0] に push され続けてるからって大丈夫だったってことか。。。
                decorators[0].push(new vscode.Range(start, end));
            });
        // } else {
        //     lines.forEach((_, index) => {
        //         let matchIndex = match.index + 1;
        //         let startIndex = matchIndex;
        //         let start = editor.document.positionAt(startIndex);
        //         let end = start;
        //         decorators[index].push(new vscode.Range(start, end));
        //     });
        // }
    }

    rainbowsLine.forEach((v, index) => {
        rainbowsLine[index].dispose;
    });

    rainbowsLine.forEach((a, i) => {
        console.log(a);
        console.log(i);
    });

    decorators.forEach(async (d, index) => {
        editor.setDecorations(rainbowsLine[index], d);
    })
}
