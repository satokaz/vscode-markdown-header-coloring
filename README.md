# Markdown Header Coloring Extension README

## Features

This extension provides the function of coloring the Markdown Header tag on the editor.

## Requirements

* This extension only applies to markdown documents.
* No commands are provided.

## Extension Settings

Some settings use tricks to embed CSS.

This extension contributes the following settings:

* `markdown-header-coloring.textDecoration`: (default: empty)

  Setting to decorate character string of markdown header.

  **Example 1:**

  ```json
  "markdown-header-coloring.textDecoration": "position: relative; display: inline-block; padding: 1px; font-size: 1.5em; text-shadow :1px  1px 1px rgba(255,255,255,0.08),-1px  1px 1px rgba(255,255,255,0.08),1px -1px 1px rgba(255,255,255,0.08),-1px -1px 1px rgba(255,255,255,0.08),1px  0px 1px rgba(255,255,255,0.08),0px  1px 1px rgba(255,255,255,0.08),-1px  0px 1px rgba(255,255,255,0.08),0px -1px 1px rgba(255,255,255,0.08);",
  ```

  **Example 2:**

  Color string of "markdown header" to rainbow color, convert text to upper case. Display font size slightly larger.

  ```json
  "markdown-header-coloring.textDecoration": "position: absolute, padding: 1px; font-size: 1.5em;text-transform: uppercase;background: linear-gradient(to right, #f00 0%, #f80 14.28%, #dd0 28.56%, #0d0 42.85%, #0dd 57.14%, #00f 71.42%, #e0e 85.71%, #f00 100%) 0% center / 200% auto;background-clip: text;-webkit-background-clip: text;text-fill-color: transparent;-webkit-text-fill-color: transparent;"
  ```
  ![](https://raw.githubusercontent.com/satokaz/vscode-markdown-header-coloring/assets/images/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202018-07-04%200.39.45.png)

  ![](https://raw.githubusercontent.com/satokaz/vscode-markdown-header-coloring/assets/images/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202018-07-04%200.42.05.png)

* `markdown-header-coloring.fontColor`: (default: empty)

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

* `markdown-header-coloring.fontColorOpacity`: (default: 1.0)

  Set opacity of font coloring.
  It has no effect on coloring set by `markdown-header-coloring.fontColor`.

  **Example:**

  ```json
      "markdown-header-coloring.fontColorOpacity": 1.0,
  ```


* `markdown-header-coloring.backgroundColor`: (default: empty)

  Set the background color of Markdown header line.
  
  **Example:**

    ```json
    "markdown-rainbow-header.backgroundColor": "background: #43c6ac; /* fallback for old browsers */ background: -webkit-linear-gradient(to left, #43c6ac, #191654); /* Chrome 10-25, Safari 5.1-6 */ background: linear-gradient(to left, #43c6ac, #191654); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */"
    
    ```

  ![](https://raw.githubusercontent.com/satokaz/vscode-markdown-header-coloring/assets/images/2018-07-02-19-34-45.png)

  > I would recommend [uigradients.com](https://uigradients.com) to find a better background color. Remove the line feed code from the generated CSS, add it to `markdown-header-coloring.backgroundColor` as a single line of character string.
    
  or You can disable font background coloring by setting `false`.

  ```json
      "markdown-header-coloring.backgroundColor": false
  ```

* `markdown-header-coloring.backgroundColorOpacity`: (default: 0.1)

  Set opacity of background coloring.
  It has no effect on coloring set by `markdown-header-coloring.backgroundColor`.

  ```json
      "markdown-header-coloring.backgroundColorOpacity": 0.1
  ```

* `markdown-header-coloring.destroyMode`: (default: false)

  Update coloring every time an event occurs. Specifically, it changes each time a single character is entered.

  Please be careful because it uses many CPU resources.

  ![](https://raw.githubusercontent.com/satokaz/vscode-markdown-header-coloring/assets/images/md_header_destroy.gif)

  

## Known Issues

* `Reload Window` commmand or Restart of vscode instance is necessary to apply setting

## References

* [Tutorial: Making annoying rainbows and other color cycles in Javascript](https://krazydad.com/tutorials/makecolors.php)
* [Rainbow&#32;String&#32;-&#32;Visual&#32;Studio&#32;Marketplace](https://marketplace.visualstudio.com/items?itemName=wk-j.vscode-rainbow-string)

-----------------------------------------------------------------------------------------------------------

**Enjoy!**
