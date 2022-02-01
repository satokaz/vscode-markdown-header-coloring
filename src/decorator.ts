import * as vscode from "vscode"
import * as colormap from "colormap";
import { userDefinedHeaderProperties, userDefinedColormapProperties } from "./userDefinedHeaderProperties";
import * as os from "os";

let textDecorationSetting = vscode.workspace.getConfiguration('markdown-header-coloring').get<string>('textDecoration');
let fontColorSetting = vscode.workspace.getConfiguration('markdown-header-coloring').get<string | boolean>('fontColor');
let fontColorOpacity = vscode.workspace.getConfiguration('markdown-header-coloring').get<number>('fontColorOpacity');
let backgroundColor = vscode.workspace.getConfiguration('markdown-header-coloring').get<string | boolean>('backgroundColor');
let backgroundColorOpacity = vscode.workspace.getConfiguration('markdown-header-coloring').get<number>('backgroundColorOpacity');
let overviewRulerColor = vscode.workspace.getConfiguration('markdown-header-coloring').get<string>('overviewRulerColor');
let afterTextDecoration = vscode.workspace.getConfiguration('markdown-header-coloring').get<string>('afterTextDecoration');
let beforeTextDecoration = vscode.workspace.getConfiguration('markdown-header-coloring').get<string>('beforeTextDecoration');
let userDefinedColormap: userDefinedColormapProperties = vscode.workspace.getConfiguration('markdown-header-coloring').get<object>('colormapConfig');

let colors: string[];
let rainbowsLine = [];

// console.log(userDefinedColormap);

// userDefinedHeaderColor
let userDefinedHeaderColor: userDefinedHeaderProperties = vscode.workspace.getConfiguration('markdown-header-coloring').get<object>('userDefinedHeaderColor');
// console.log(userDefinedHeaderColor);

if (userDefinedHeaderColor.enabled === true) {
    colors = [
        userDefinedHeaderColor.Header_1.color,
        userDefinedHeaderColor.Header_2.color,
        userDefinedHeaderColor.Header_3.color,
        userDefinedHeaderColor.Header_4.color,
        userDefinedHeaderColor.Header_5.color,
        userDefinedHeaderColor.Header_6.color,
    ];

    for (let i = 1; i < Object.keys(userDefinedHeaderColor).length; i++) {
        // console.log(`userDefinedHeaderColor.userDefinedHeader_${i}`);
        // console.log('i =', i);
        rainbowsLine.push(generateHeaderDecorations(colors[i -1], i)); 
    }
    // console.log('rainbowsLine =', rainbowsLine);

} else {
    colors = colormap({
        colormap: userDefinedColormap.colormap,
        nshades: userDefinedColormap.nshades,
        format: 'rba',
        alpha: 1
    }).filter(v => {
        return v.pop();
    }); 

    // colors = rainbowColors;
    for (let i = 0; i < colors.length; i++) {
        // console.log('i =', i);
        rainbowsLine.push(generateDecorations(colors[i])); 
    }
}

// console.log('colors =', colors);
// console.log('userDefinedHeaderColor length =', Object.keys(userDefinedHeaderColor).length);

function generateDecorations(x:string) {
    // console.log('x =', x);
    // console.log(`rgba(${x}, ${fontColorOpacity})`);
    return vscode.window.createTextEditorDecorationType({
        isWholeLine: true,
        // before: {
        //     contentText: "",
        //     textDecoration: `${beforeTextDecoration}`
        // },
        // after: {
        //     contentText: "",
        //     textDecoration: `${afterTextDecoration}`
        // },
        color: (fontColorSetting !== "") ? (fontColorSetting === false) ? "" : fontColorSetting : `rgba(${x}, ${fontColorOpacity})`,
        // color: (fontColorSetting === "") ? `rgba(${x}, ${fontColorOpacity})` : (fontColorSetting === false) ? "" : fontColorSetting,
        backgroundColor: (backgroundColor === "" ) ? `rgba(${x}, ${backgroundColorOpacity})` : (backgroundColor == false ) ? "" : backgroundColor,
        overviewRulerColor: (overviewRulerColor === "") ? `rgba(${x}, 0.8)` : overviewRulerColor,
        rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
        textDecoration: 'none;' + textDecorationSetting,
    });
}

function generateHeaderDecorations(x:string, i:number) {
    // console.log('in generateHeaderDecorations x =', x);
    // console.log('in generateHeaderDecorations i =', i);

    userDefinedHeaderColor = vscode.workspace.getConfiguration('markdown-header-coloring').get<object>('userDefinedHeaderColor');

    // console.log(userDefinedHeaderColor);

    return vscode.window.createTextEditorDecorationType({
        isWholeLine: true,

        color:
        (i == 1) 
        ? userDefinedHeaderColor.Header_1.color
        : (i == 2) 
        ? userDefinedHeaderColor.Header_2.color 
        : (i == 3) 
        ? userDefinedHeaderColor.Header_3.color 
        : (i == 4) 
        ? userDefinedHeaderColor.Header_4.color 
        : (i == 5) 
        ? userDefinedHeaderColor.Header_5.color
        : (i == 6) 
        ? userDefinedHeaderColor.Header_6.color 
        : "",

        backgroundColor: 
        (i == 1) 
        ? 'none;' + userDefinedHeaderColor.Header_1.backgroundColor 
        : (i == 2) 
        ? 'none;' + userDefinedHeaderColor.Header_2.backgroundColor 
        : (i == 3) 
        ? 'none;' + userDefinedHeaderColor.Header_3.backgroundColor 
        : (i == 4) 
        ? 'none;' + userDefinedHeaderColor.Header_4.backgroundColor 
        : (i == 5) 
        ? 'none;' + userDefinedHeaderColor.Header_5.backgroundColor
        : (i == 6) 
        ? 'none;' + userDefinedHeaderColor.Header_6.backgroundColor 
        : 'none;' + "",
        
        textDecoration: 
        (i == 1) 
        ? 'none;' + userDefinedHeaderColor.Header_1.textDecoration 
        : (i == 2) 
        ? 'none;' + userDefinedHeaderColor.Header_2.textDecoration 
        : (i == 3) 
        ? 'none;' + userDefinedHeaderColor.Header_3.textDecoration 
        : (i == 4) 
        ? 'none;' + userDefinedHeaderColor.Header_4.textDecoration 
        : (i == 5) 
        ? 'none;' + userDefinedHeaderColor.Header_5.textDecoration
        : (i == 6) 
        ? 'none;' + userDefinedHeaderColor.Header_6.textDecoration 
        : 'none;' + "",

        overviewRulerColor: 
        (i == 1) 
        ? (userDefinedHeaderColor.Header_1.overviewRulerColor == "") ? userDefinedHeaderColor.Header_1.color : userDefinedHeaderColor.Header_1.overviewRulerColor
        : (i == 2) 
        ? (userDefinedHeaderColor.Header_2.overviewRulerColor == "") ? userDefinedHeaderColor.Header_2.color : userDefinedHeaderColor.Header_2.overviewRulerColor
        : (i == 3) 
        ? (userDefinedHeaderColor.Header_3.overviewRulerColor == "") ? userDefinedHeaderColor.Header_3.color : userDefinedHeaderColor.Header_3.overviewRulerColor
        : (i == 4) 
        ? (userDefinedHeaderColor.Header_4.overviewRulerColor == "") ? userDefinedHeaderColor.Header_4.color : userDefinedHeaderColor.Header_4.overviewRulerColor
        : (i == 5) 
        ? (userDefinedHeaderColor.Header_5.overviewRulerColor == "") ? userDefinedHeaderColor.Header_5.color : userDefinedHeaderColor.Header_5.overviewRulerColor
        : (i == 6) 
        ? (userDefinedHeaderColor.Header_6.overviewRulerColor == "") ? userDefinedHeaderColor.Header_6.color : userDefinedHeaderColor.Header_6.overviewRulerColor
        : "", 
        
        rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
    });
}

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function decorate() {

    let editor: vscode.TextEditor;

    if (!vscode.window.activeTextEditor) {
        return;
    } else {
        editor = vscode.window.activeTextEditor;
    }


    let text = codeblockParse(editor.document.getText());
    console.log("text =", text.split('\n'));
    console.log("test =", text);

    let regex = /(^#{1,}\s.*)/gm;
    let decorators = colors.map(color => []);
    let match: RegExpMatchArray;
    let offset: number;

    if (vscode.workspace.getConfiguration('markdown-header-coloring').get<boolean>('destroyMode')) {
        offset = getRandomInt(0, colors.length);
    } else { 
        offset = 0;
        // offset = colors.length;
    }

    while ((match = regex.exec(text))) {
        let lines: string[] = [...(match[1] || match[2])];

        // console.log('match =', match);
        // console.log('match.index =', match.index);
        // console.log('match の中身 =', JSON.stringify(lines));
        // console.log('match.length =', match.length);
        // console.log('lines length =', lines.length);

        if (backgroundColor === "") {
            for (let index = 0; index < lines.length; index++) {
                // console.log('value =', lines);
                // console.log('value =', lines[index]);
                // console.log('value length =', lines[index].length);
                // console.log('index =', index);
                // console.log('lines length =', lines.length);
                // let matchIndex = match.index + 1;
                let matchIndex = match.index + 1;
                let rainbowIndex = Math.abs((index + offset) % colors.length);
                let startIndex = matchIndex;
                let start = editor.document.positionAt(startIndex);
                // console.log('start =', start);
                let end = start;
                // console.log('rainbowIndex =', rainbowIndex);
                decorators[rainbowIndex].push(new vscode.Range(start, end));
                break;
            }
        } else {
            for (let index = 0; index < lines.length; index++) {
                let matchIndex = match.index + 1;
                let startIndex = matchIndex;
                let start = editor.document.positionAt(startIndex);
                let end = start;
                decorators[index].push(new vscode.Range(start, end));
                break;
            }
        }
        offset++;
    }

    rainbowsLine.forEach((v, index) => {
        rainbowsLine[index].dispose;
    });

    // debug
    // decorators.forEach((a, i) => {
    //     console.log(`decorators[${i}] =`, JSON.stringify(a).toString());
    // });

    decorators.forEach(async (d, index) => {
        editor.setDecorations(rainbowsLine[index], d);
    })
}

export function userDecorate() {
    // console.log('call userDecorate()')
    let editor: vscode.TextEditor;

    if (!vscode.window.activeTextEditor) {
        return;
    } else {
        editor = vscode.window.activeTextEditor;
    }

    let text = codeblockParse(editor.document.getText());
    let regex = /(^#{1,}\s)/gm;
    let decorators = colors.map(x => []); // colors に定義された色の数だけ配列を作る
    let match: RegExpMatchArray;

    while ((match = regex.exec(text))) {
        let lines: string[] = [...(match[1] || match[2])];

        // console.log('match の中身 =', JSON.stringify(lines));
        // console.log('match.length =', match.length);

        // 1 回 push されるだけで良いので、push されたら break で loop を抜けるために foreach ではなく for を使う
        for (let i = 0; i < lines.length; i++) {
            // console.log('value =', lines[i]);
            // console.log('value length =', lines[i].length);
            // console.log('index =', i);
            // console.log('lines length =', lines.length);
            let matchIndex = match.index + 1;
            let startIndex = matchIndex;
            let start = editor.document.positionAt(startIndex);
            let end = start;
            decorators[lines.length - 2].push(new vscode.Range(start, end));
            break;
        }
    }

    rainbowsLine.forEach((v, index) => {
        rainbowsLine[index].dispose;
    });

    // decorators.forEach((a, i) => {
    //     console.log(`decorators[${i}] =`, JSON.stringify(a).toString());
    // });

    decorators.forEach(async (d, index) => {
        editor.setDecorations(rainbowsLine[index], d);
    });
}

function codeblockParse(text) {

    let isCodeBlock: boolean = false;
    let isFrontMatter: boolean = false;
    let isFrontMatterEnd: boolean = false;
    
    return text.split('\n').map(v => {
        
        // yaml header
        // if(isYamlHeaderEnd === false) {
        //     if (isYamlHeader === false) {
        //         if (v.match(/(^---$)/g)) {
        //             console.log("YAML");
        //             isYamlHeader = true;
        //         }
        //     } else {
        //         if(v.match(/^#{1,}.*/)) {
        //             // console.log('v.match(/^#{1,}.*/) =', String(v.match(/^#{1,}.*/)).length);
        //             v = v.replace(/^#/g, ' ');
        //         }
        //         if (v.match(/(^---$)/g)) {
        //             isYamlHeader = false;
        //             isYamlHeaderEnd = true;
        //             console.log("YAML End");
        //         }
        //     }
        // }

        // yaml front matter
        if(isFrontMatterEnd === false) {
            if (isFrontMatter === false) {
                if (v.match(/(^---.*)/g)) {
                    isFrontMatter = true;
                }
            } else {
                if(v.match(/^#{1,}.*/)) {
                    // console.log('v.match(/^#{1,}.*/) =', String(v.match(/^#{1,}.*/)).length);
                    v = v.replace(/^#/g, ' ');
                }

                if (v.match(/(^---.*)/g)) {
                    isFrontMatter = false;
                    isFrontMatterEnd = true;
                }
            }
        }

        // CodeBlock
        if (isCodeBlock === false) {
            if (v.match(/(^```.*)/g)) {
                isCodeBlock = true;
            }
        } else {
            if(v.match(/^#{1,}.*/)) {
                // console.log('v.match(/^#{1,}.*/) =', String(v.match(/^#{1,}.*/)).length);
                v = v.replace(/^#/g, ' ');
            }

            if (v.match(/(^```.*)/g)) {
                isCodeBlock = false;
            }
        }
        return v;
    }).join('\n');
}