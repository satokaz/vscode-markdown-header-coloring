# Change Log

## 0.1.7

* Fix misuse of os.EOL. (Wrong display in Windows environment)
* The occurrence of codeblock tag checks only the beginning of the line.

## 0.1.6

* Revert: Fix not to apply to '#' appearing in YAML

## 0.1.5

* Adopt webpack
* Add CSS Injection to "backgroundColor"
* Fix not to apply to '#' appearing in YAML

## 0.1.4

* Fixed debug message suppression

## 0.1.3

* Fix not to apply to '#' appearing in codeblock without indentation

## 0.1.2

* Explicitly activate in Markdown mode
* [Issue #12](https://github.com/satokaz/vscode-markdown-header-coloring/issues/12), Remove update by onDidChangeVisibleTextEditors.

## 0.1.1

* [Issue #7](https://github.com/satokaz/vscode-markdown-header-coloring/issues/7#issuecomment-456640884), Added workaround by CSS Injection.

## 0.1.0

* Adopt [bpostlethwaite/colormap](https://github.com/bpostlethwaite/colormap). 
  - New `markdown-header-coloring.colormapConfig` setting
  
* Add user defined settings for each header level
  - New `markdown-header-coloring.userDefinedHeaderColor` setting

## 0.0.5

* again: To reduce the CPU load, do not generate coloring arrays

## 0.0.4

* To reduce the CPU load, do not generate coloring arrays