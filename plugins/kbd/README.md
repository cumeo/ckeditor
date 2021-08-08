# CKEditor kbd Plugin

This plugin allows formatting the text as keyboard input in CKEditor.
https://sestolab.pp.ua/addons/CKEditor/kbd

## Requirements

* [CKEditor](https://ckeditor.com/ckeditor-4) version 4.11.3 or greater
* [Dialog](https://ckeditor.com/cke4/addon/dialog)
* [SMethods](https://ckeditor.com/cke4/addon/dialog)

## Browser Compatibility

Any modern browser should be supported.

## Installation

1. Put the plugin into the CKEditor `plugins` folder.
2. Enable the plugin in the CKEditor configuration file (`config.js`):

```js
config.extraPlugins = 'kbd';
```

## Configuration

```js
config.kbdDelimiter = ' + '; // The default delimiter between keys.
```

## Translations

* English
* Russian
* Ukrainian

Translations are welcome.

