import * as vscode from "vscode"

let textDecorationSetting = vscode.workspace.getConfiguration('markdown-header-coloring').get<string>('textDecoration');
let fontColorSetting = vscode.workspace.getConfiguration('markdown-header-coloring').get<string | boolean>('fontColor');
let fontColorOpacity = vscode.workspace.getConfiguration('markdown-header-coloring').get<number>('fontColorOpacity');
let backgroundColor = vscode.workspace.getConfiguration('markdown-header-coloring').get<string | boolean>('backgroundColor');
let backgroundColorOpacity = vscode.workspace.getConfiguration('markdown-header-coloring').get<number>('backgroundColorOpacity');
let overviewRulerColor = vscode.workspace.getConfiguration('markdown-header-coloring').get<number>('overviewRulerColor');
let afterTextDecoration = vscode.workspace.getConfiguration('markdown-header-coloring').get<number>('afterTextDecoration');
let beforeTextDecoration = vscode.workspace.getConfiguration('markdown-header-coloring').get<number>('beforeTextDecoration');

let colors = [
    "128,243,31",
    "165,222,11",
    "199,193,1",
    "227,158,3",
    "246,120,15",
    "254,83,38",
    "251,50,68",
    "237,24,104",
    "213,7,142",
    "182,1,179",
    "145,6,211",
    "107,22,236",
    "71,47,250",
    "40,80,254",
    "17,117,247",
    "3,155,229",
    "1,190,202",
    "10,220,168",
    "29,242,131",
    "58,253,93",
    "92,253,58",
    "130,242,30",
    "167,221,10",
    "201,191,1",
    "228,156,3",
    "247,118,16",
    "254,81,39",
    "251,48,70",
    "236,22,106",
    "212,6,144",
    "180,1,181",
    "143,6,213",
    "105,23,237",
    "69,49,251",
    "39,82,254",
    "16,119,246",
    "3,157,228",
    "1,192,200",
    "11,222,166",
    "31,243,129",
    "59,253,91",
    "94,253,57",
    "132,241,29",
    "169,219,10",
    "203,189,1",
    "230,154,4",
    "247,116,17",
    "254,79,41",
    "250,46,72",
    "235,21,109",
];

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
    color: (fontColorSetting === "") ? `rgba(${x}, ${fontColorOpacity})` : (fontColorSetting === false) ? "" : fontColorSetting,
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
        offset = colors.length;
    }

    while ((match = regex.exec(text))) {
        let lines: string[] = [...(match[1] || match[2])];

        if (backgroundColor === "") {
            offset--;
            lines.forEach((_, index) => {
                let matchIndex = match.index + 1;
                let rainbowIndex =  Math.abs((index + offset) % colors.length);
                let startIndex = matchIndex;
                let start = editor.document.positionAt(startIndex);
                let end = start;
                decorators[rainbowIndex].push(new vscode.Range(start, end));
            });
        } else {
            lines.forEach((_, index) => {
                let matchIndex = match.index + 1;
                let startIndex = matchIndex;
                let start = editor.document.positionAt(startIndex);
                let end = start;
                decorators[index].push(new vscode.Range(start, end));
            });
        }
    }

    rainbowsLine.forEach((v, index) => {
        rainbowsLine[index].dispose;
    });

    decorators.forEach(async (d, index) => {
        editor.setDecorations(rainbowsLine[index], d);
    })
}
