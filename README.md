# Markdown Header Coloring Extension README

## Features

This extension provides the function of coloring the Markdown Header tag on the editor.

## Requirements

This extension only applies to markdown documents.
No commands are provided.

## Extension Settings

Some settings use tricks to embed CSS.

This extension contributes the following settings:

* `markdown-header-coloring.textDecoration`: (default: empty)

  Setting to decorate character string of markdown header.

  ```
  "markdown-header-coloring.textDecoration": "position: relative; display: inline-block; padding: 1px; font-size: 1.5em; text-shadow: 1px  1px 1px rgba(255,255,255,0.1), -1px  1px 1px rgba(255,255,255,0.1), 1px -1px 1px rgba(255,255,255,0.1), -1px -1px 1px rgba(255,255,255,0.1), 1px  0px 1px rgba(255,255,255,0.1), 0px  1px 1px rgba(255,255,255,0.1), -1px  0px 1px rgba(255,255,255,0.1), 0px -1px 1px rgba(255,255,255,0.1);"
  ```

* `markdown-header-coloring.fontColor`: (default: empty)

  Set font color of Markdown header. If you do not like the default coloring, you can overwrite it with this setting.

  However, it is limited to one color.

  ```

  ```
  

* `markdown-header-coloring.backgroundColor`: (default: empty)

  Set the background color of Markdown header line.
  
  example:

    ```
    "markdown-rainbow-header.backgroundColor": "background: #43c6ac; /* fallback for old browsers */ background: -webkit-linear-gradient(to left, #43c6ac, #191654); /* Chrome 10-25, Safari 5.1-6 */ background: linear-gradient(to left, #43c6ac, #191654); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */"
    
    ```
    
    https://uigradients.com

* `markdown-header-coloring.destroyMode`: (default: false)

  Update coloring every time an event occurs. Specifically, it changes each time a single character is entered.

  Please be careful because it uses many CPU resources.

## Known Issues

* `Reload Window` commmand or Restart of vscode instance is necessary to apply setting

## References

* [Rainbow&#32;String&#32;-&#32;Visual&#32;Studio&#32;Marketplace](https://marketplace.visualstudio.com/items?itemName=wk-j.vscode-rainbow-string)

-----------------------------------------------------------------------------------------------------------

**Enjoy!**
