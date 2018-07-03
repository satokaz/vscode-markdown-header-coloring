function RGB2Color(r, g, b) {
    // return String('rgba(' + Math.floor(r) + ',' +  Math.floor(g) + ',' + Math.floor(b) + ',' + '0.1' + ')');
    return Math.floor(r) + ',' + Math.floor(g) + ',' + Math.floor(b); 
}

function* makeColorGradient(frequency1, frequency2, frequency3, phase1, phase2, phase3, center = 128, width = 127, len = 20) {
    for (var i = 0; i < len; ++i) {
        var red = Math.sin(frequency1 * i + phase1) * width + center;
        var grn = Math.sin(frequency2 * i + phase2) * width + center;
        var blu = Math.sin(frequency3 * i + phase3) * width + center;
        // console.log(red, grn, blu);
        // return String('rgba(' + Math.floor(red) + ',' +  Math.floor(grn) + ',' + Math.floor(blu) + ',' + '0.9' + ')'); 
        yield RGB2Color(red, grn, blu)
    }
}

// export const rainborColors = makeColorGradient(.0, .1, .9, 0, 1, 5)
// export const rainborColors = makeColorGradient(.5, .5, .5, 0, 2, 4)

// export const rainborColors = makeColorGradient(.3, .3, .3, 0, 2, 4);
// export const rainborColors = makeColorGradient(.2, .2, .2, 0, 2, 4)

// export const rainborColors = makeColorGradient(2 * Math.PI/6 , 2 * Math.PI/6, 2 * Math.PI/6, 0, 2, 4);

export const rainborColors = makeColorGradient(.3, .3, .3, 0, 2, 4);