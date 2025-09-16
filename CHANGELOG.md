# Change Log

## 0.1.11

* Optimize re-decoration on edits: only re-run when the active editor exists, the changed document matches the active one, and the language is enabled. Reduces unnecessary work and improves responsiveness.
* Minor robustness: normalize decoration colors from settings to valid strings to prevent type issues in rendering.
* Fix: Prevent header coloring from breaking on horizontal rules (`---`). YAML front matter now only starts at the top of the file (first non-empty line) and strictly matches `---` (and ends on `---` or `...`). This avoids misclassifying in-body horizontal rules as front matter.
* Improve fenced code block detection: support both backtick and tilde fences (``` and ~~~), allow up to 3 leading spaces (CommonMark), and require matching fence type and length for closure. Prevents false positives/negatives in complex layouts.
* Add support for indented code blocks (4 spaces or a tab). Indented blocks persist across empty lines and end on the first non-indented, non-empty line.

## 0.1.10

* Add support for Quarto (`.qmd`) files.
* Add configuration `markdown-header-coloring.enabledLanguages` to control which languages are enabled (default: markdown, quarto).
* Refactor: Consolidated decoration logic into `triggerDecoration()` and re-run it on editor/configuration change events for consistency.

## 0.1.9

* Ignore YAML front matter comments: issue#30
## 0.1.8

* Add support for running in web environments

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
