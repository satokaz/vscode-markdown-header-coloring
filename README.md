# Markdown Header Coloring Extension README

## Features

This extension provides the function of coloring the Markdown Header tag on the editor.

![](https://raw.githubusercontent.com/satokaz/vscode-markdown-header-coloring/assets/images/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202018-07-04%209.11.45.png)

![](https://raw.githubusercontent.com/satokaz/vscode-markdown-header-coloring/assets/images/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202018-07-04%209.20.22.png)

By default, it will be colored according to the number of headers as shown in the screenshot above.

Supported languages by default: `markdown`, `quarto` (Quarto .qmd). You can extend this via settings (see below).

## Requirements

* This extension only applies to markdown-formatted documents, and is not guaranteed to work on other file formats. Quarto (`.qmd`) is supported by default.
* No commands are provided.

## Extension Settings

Some settings use tricks to embed CSS.

This extension contributes the following settings:

* **`markdown-header-coloring.enabledLanguages`**
   - Array of VS Code language IDs for which this extension is active.
   - Default: `["markdown", "quarto"]`
   - Example (enable for R Markdown as well):
      ```jsonc
      // settings.json
      "markdown-header-coloring.enabledLanguages": [
         "markdown",
         "quarto",
         "rmd"
      ]
      ```


* **`"markdown-header-coloring.colormapConfig`**
   - In the `"colormap"` setting, it is possible to select candidates for colormap.
   - In the `"nshades"` setting, Specify the number of colors that make up the color map.

   The default setting:   
   ```jsonc
   "markdown-header-coloring.colormapConfig": {
      "colormap": "hsv",
      "nshades": 20
   },
   ```



* **`markdown-header-coloring.textDecoration`: (default: empty)**

  Setting to decorate character string of markdown header.

  **Example 1:**

  Set the font size to 1.5em and drop shadows.

  ```json
  "markdown-header-coloring.textDecoration": "position: relative; display: inline-block; padding: 1px; font-size: 1.5em; text-shadow :1px  1px 1px rgba(255,255,255,0.08),-1px  1px 1px rgba(255,255,255,0.08),1px -1px 1px rgba(255,255,255,0.08),-1px -1px 1px rgba(255,255,255,0.08),1px  0px 1px rgba(255,255,255,0.08),0px  1px 1px rgba(255,255,255,0.08),-1px  0px 1px rgba(255,255,255,0.08),0px -1px 1px rgba(255,255,255,0.08);",
  ```
  ![](https://raw.githubusercontent.com/satokaz/vscode-markdown-header-coloring/assets/images/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202018-07-04%209.24.06.png)


  **Example 2:**

  Color string of "markdown header" to rainbow color, convert text to upper case. Display font size to 1.5em.

  ```json
  "markdown-header-coloring.textDecoration": "position: absolute, padding: 1px; font-size: 1.5em;text-transform: uppercase;background: linear-gradient(to right, #f00 0%, #f80 14.28%, #dd0 28.56%, #0d0 42.85%, #0dd 57.14%, #00f 71.42%, #e0e 85.71%, #f00 100%) 0% center / 200% auto;background-clip: text;-webkit-background-clip: text;text-fill-color: transparent;-webkit-text-fill-color: transparent;"
  ```

  ![](https://raw.githubusercontent.com/satokaz/vscode-markdown-header-coloring/assets/images/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202018-07-04%209.31.25.png)


* **`markdown-header-coloring.fontColor`: (default: empty)**

  Set font color of Markdown header. If you do not like the default coloring, you can overwrite it with this setting.However, it is limited to one color.
  
  Coloring can also be specified in hex, rgb, rgba.

  **Example:** White with opacity 0.9
  
  ```json
    "markdown-header-coloring.fontColor": "rgba(255,255,255,0.9)"
  ```

  or You can disable font coloring by setting `false`. Coloring according to theme will be provided

  ```json
    "markdown-header-coloring.fontColor": false
  ``` 

* **`markdown-header-coloring.fontColorOpacity`: (default: 1.0)**

  Set opacity of font coloring.
  It has no effect on coloring set by `markdown-header-coloring.fontColor`.

  **Example:**

  ```json
      "markdown-header-coloring.fontColorOpacity": 0.5
  ```


* **`markdown-header-coloring.backgroundColor`: (default: empty)**

  Set the background color of Markdown header line.
  
  **Example:**

    ```json
    "markdown-header-coloring.backgroundColor": "background: #43c6ac; /* fallback for old browsers */ background: -webkit-linear-gradient(to left, #43c6ac, #191654); /* Chrome 10-25, Safari 5.1-6 */ background: linear-gradient(to left, #43c6ac, #191654); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */"
    
    ```

  ![](https://raw.githubusercontent.com/satokaz/vscode-markdown-header-coloring/assets/images/2018-07-02-19-34-45.png)

  > I would recommend [uigradients.com](https://uigradients.com) to find a better background color. Remove the line feed code from the generated CSS, add it to `markdown-header-coloring.backgroundColor` as a single line of character string.
    
  or You can disable font background coloring by setting `false`.

  ```json
      "markdown-header-coloring.backgroundColor": false
  ```

* **`markdown-header-coloring.backgroundColorOpacity`: (default: 0.1)**

  Set opacity of background coloring.
  It has no effect on coloring set by `markdown-header-coloring.backgroundColor`.

  ```json
      "markdown-header-coloring.backgroundColorOpacity": 0.1
  ```

* **`markdown-header-coloring.destroyMode`: (default: false)**

  Update coloring every time an event occurs. Specifically, it changes each time a single character is entered.

  Please be careful because it uses many CPU resources.

  ![](https://raw.githubusercontent.com/satokaz/vscode-markdown-header-coloring/assets/images/md_header_destroy.gif)

## Example

  Example combining `markdown-header-coloring.textDecoration` and `markdown-header-coloring.backgroundColor`.

  Add the following to settings.json and execute `Reload Window` commmand:
    
  ```json
  "markdown-header-coloring.textDecoration": "position: absolute, padding: 1px; font-size: 1.5em;text-transform: uppercase;background: linear-gradient(to right, #f00 0%, #f80 14.28%, #dd0 28.56%, #0d0 42.85%, #0dd 57.14%, #00f 71.42%, #e0e 85.71%, #f00 100%) 0% center / 200% auto;background-clip: text;-webkit-background-clip: text;text-fill-color: transparent;-webkit-text-fill-color: transparent;",
  "markdown-header-coloring.backgroundColor": "background: rgba(67, 198, 172, 0.6); /* fallback for old browsers */ background: -webkit-linear-gradient(to left, rgba(67, 198, 172, 0.6), rgba(25, 22, 84, 0.6)); /* Chrome 10-25, Safari 5.1-6 */ background: linear-gradient(to left, rgba(67, 198, 172, 0.6), rgba(25, 22, 84, 0.6)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */",

  ```

  ![](https://raw.githubusercontent.com/satokaz/vscode-markdown-header-coloring/assets/images/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202018-07-04%200.39.45.png)

  ![](https://raw.githubusercontent.com/satokaz/vscode-markdown-header-coloring/assets/images/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202018-07-04%200.42.05.png)

  Please make use of CSS and make your own coloring


## User defined header coloring

**With this setting, all the settings introduced earlier can not be used.**

Added `markdown-header-coloring.userDefinedHeaderColor` setting that allows user-defined decoration.

The default setting is `false`, and no decorations are defined.
Headers 1 (#) through 6 (######) must be defined by users themselves.

To enable decoration according to header level, set `enabled` to `true`.

   The default setting: 
   ```jsonc
   "markdown-header-coloring.userDefinedHeaderColor": {
      "enabled": false,
      "Header_1": {
         "color": "",
         "backgroundColor": "",
         "textDecoration": "",
         "overviewRulerColor": ""
      },
      "Header_2": {
         "color": "",
         "backgroundColor": "",
         "textDecoration": "",
         "overviewRulerColor": ""
      },
      "Header_3": {
         "color": "",
         "backgroundColor": "",
         "textDecoration": "",
         "overviewRulerColor": ""
      },
      "Header_4": {
         "color": "",
         "backgroundColor": "",
         "textDecoration": "",
         "overviewRulerColor": ""
      },
      "Header_5": {
         "color": "",
         "backgroundColor": "",
         "textDecoration": "",
         "overviewRulerColor": ""
      },
      "Header_6": {
         "color": "",
         "backgroundColor": "",
         "textDecoration": "",
         "overviewRulerColor": ""
      }
   }
   ```

Example: User defined header 1

![alt](https://github.com/satokaz/vscode-markdown-header-coloring/blob/assets/images/スクリーンショット%202019-01-14%2023.14.53.png?raw=true)

```
"markdown-header-coloring.userDefinedHeaderColor": {
   "enabled": true,
   "Header_1": {
      "color": "",
      "backgroundColor": "background: #9cecfb;background: -webkit-linear-gradient(to right, #9cecfb, #65c7f7, #0052d4);background: linear-gradient(to right, #9cecfb, #65c7f7, #0052d4);opacity: 0.5",
      "textDecoration": "font-weight: 600; font-size: 1.8em;background: -webkit-linear-gradient(0deg, #FFFFFF, #6DD5FA, #2980B9);-webkit-background-clip: text;-webkit-text-fill-color: transparent;"
   },
   "Header_2": {
      "color": "",
      "backgroundColor": "background: #83a4d4;background: -webkit-linear-gradient(to right, #83a4d4, #b6fbff);background: linear-gradient(to right, #83a4d4, #b6fbff);opacity: 0.5",
      "textDecoration": "font-weight: 600; font-size: 1.6em;background: -webkit-linear-gradient(0deg, #83a4d4, #83a4d4, #b6fbff);-webkit-background-clip: text;-webkit-text-fill-color: transparent;"
   },
   "Header_3": {
      "color": "",
      "backgroundColor": "background: #2bc0e4;background: -webkit-linear-gradient(to right, #2bc0e4, #eaecc6);background: linear-gradient(to right, #2bc0e4, #eaecc6);;opacity: 0.5",
      "textDecoration": "font-weight: 600; font-size: 1.4em;background: -webkit-linear-gradient(0deg, #1FA2FF, #12D8FA, #A6FFCB);-webkit-background-clip: text;-webkit-text-fill-color: transparent;"
   },
   "Header_4": {
      "color": "",
      "backgroundColor": "background: #1fa2ff;background: -webkit-linear-gradient(to right, #1fa2ff, #12d8fa, #a6ffcb);background: linear-gradient(to right, #1fa2ff, #12d8fa, #a6ffcb);opacity: 0.5",
      "textDecoration": "font-weight: 600; font-size: 1.4em;background: -webkit-linear-gradient(0deg, #77A1D3, #79CBCA, #A6FFCB);-webkit-background-clip: text;-webkit-text-fill-color: transparent;"
   },
   "Header_5": {
      "color": "",
      "backgroundColor": "background: #ff6e7f; background: -webkit-linear-gradient(to right, #bfe9ff, #ff6e7f); background: linear-gradient(to right, #bfe9ff, #ff6e7f);opacity: 0.5",
      "textDecoration": "font-weight: 600; font-size: 1.2em;background: -webkit-linear-gradient(0deg, #ff6e7f, #bfe9ff);-webkit-background-clip: text;-webkit-text-fill-color: transparent;"
   },
   "Header_6": {
      "color": "",
      "backgroundColor": "background: #9796f0; background: -webkit-linear-gradient(to right, #9796f0, #fbc7d4); background: linear-gradient(to right, #9796f0, #fbc7d4);opacity: 0.5",
      "textDecoration": "font-weight: 600; font-size: 1.1em;background: -webkit-linear-gradient(0deg, #9796f0, #fbc7d4);-webkit-background-clip: text;-webkit-text-fill-color: transparent;"
   }
},
```

Example User defined header 2:

Specify jpg accessible with https as background.
http (not https) access is not allowed for security.

Can also be local file.

![alt](https://raw.githubusercontent.com/satokaz/vscode-markdown-header-coloring/assets/images/スクリーンショット%202019-01-14%2014.22.17.png)

```jsonc
"markdown-header-coloring.userDefinedHeaderColor": {
   "enabled": true,
   "Header_1": {
      "color": "",
      "backgroundColor": "color: white;background-image: url(https://images.pexels.com/photos/1382393/pexels-photo-1382393.jpeg?dl&fit=crop&crop=entropy&w=1920&h=1280);background-size: cover;background-position: 0% 20%;opacity: 0.2",
      "textDecoration": "font-weight: 600; font-size: 1.8em;background: -webkit-linear-gradient(0deg, #FFFFFF, #6DD5FA, #2980B9);-webkit-background-clip: text;-webkit-text-fill-color: transparent;"
   },
   "Header_2": {
      "color": "",
      "backgroundColor": "color: white;background-image: url(https://images.pexels.com/photos/1382393/pexels-photo-1382393.jpeg?dl&fit=crop&crop=entropy&w=1920&h=1280);background-size: cover;background-position: 0% 40%;opacity: 0.2",
      "textDecoration": "font-weight: 600; font-size: 1.8em;background: -webkit-linear-gradient(0deg, #FFFFFF, #6DD5FA, #2980B9);-webkit-background-clip: text;-webkit-text-fill-color: transparent;"
   },
   "Header_3": {
      "color": "",
      "backgroundColor": "color: white;background-image: url(https://images.pexels.com/photos/1382393/pexels-photo-1382393.jpeg?dl&fit=crop&crop=entropy&w=1920&h=1280);background-size: cover;background-position: 0% 50%;opacity: 0.2",
      "textDecoration": "font-weight: 600; font-size: 1.8em;background: -webkit-linear-gradient(0deg, #FFFFFF, #6DD5FA, #2980B9);-webkit-background-clip: text;-webkit-text-fill-color: transparent;"
   },
   "Header_4": {
      "color": "",
      "backgroundColor": "color: white;background-image: url(https://images.pexels.com/photos/1382393/pexels-photo-1382393.jpeg?dl&fit=crop&crop=entropy&w=1920&h=1280);background-size: cover;background-position: 0% 70%;opacity: 0.2",
      "textDecoration": "font-weight: 600; font-size: 1.8em;background: -webkit-linear-gradient(0deg, #FFFFFF, #6DD5FA, #2980B9);-webkit-background-clip: text;-webkit-text-fill-color: transparent;"
   },
   "Header_5": {
      "color": "",
      "backgroundColor": "color: white;background-image: url(https://images.pexels.com/photos/1382393/pexels-photo-1382393.jpeg?dl&fit=crop&crop=entropy&w=1920&h=1280);background-size: cover;background-position: 0% 80%;opacity: 0.2",
      "textDecoration": "font-weight: 600; font-size: 1.8em;background: -webkit-linear-gradient(0deg, #FFFFFF, #6DD5FA, #2980B9);-webkit-background-clip: text;-webkit-text-fill-color: transparent;"
   },
   "Header_6": {
      "color": "",
      "backgroundColor": "color: white;background-image: url(https://images.pexels.com/photos/1382393/pexels-photo-1382393.jpeg?dl&fit=crop&crop=entropy&w=1920&h=1280);background-size: cover;background-position: 0% 90%;opacity: 0.2",
      "textDecoration": "font-weight: 600; font-size: 1.8em;background: -webkit-linear-gradient(0deg, #FFFFFF, #6DD5FA, #2980B9);-webkit-background-clip: text;-webkit-text-fill-color: transparent;"
   }
},
```

## Tips

Example of using a local image file:

**macOS/Linux**
```
"backgroundColor": "background-image: url(/Users/kazus/Pictures/07_est.jpg);opacity: 0.2;"
```
**Windows** 
```
"backgroundColor": "background-image: url(file:///c:/Users/kazus/Desktop/test.jpg);opacity: 0.2;"
```

## Known Issues

* `Reload Window` commmand or Restart of vscode instance is necessary to apply setting

## References

* [Tutorial: Making annoying rainbows and other color cycles in Javascript](https://krazydad.com/tutorials/makecolors.php)
* [Rainbow&#32;String&#32;-&#32;Visual&#32;Studio&#32;Marketplace](https://marketplace.visualstudio.com/items?itemName=wk-j.vscode-rainbow-string)

-----------------------------------------------------------------------------------------------------------

**Enjoy!**

