CKEDITOR.plugins.add('kbd', {
	requires: 'dialog',
	lang: 'en',
	icons: 'kbd',
	init: function(editor){
		editor.addCommand('kbd', {
			exec: function(editor){
				var selection = editor.getSelection().getSelectedText();
				if(selection) editor.insertElement(CKEDITOR.dom.element.createFromHtml('<kbd>' + selection + '</kbd>'));
				else alert('please select some text');

				// selection
				// 	? editor.insertElement(CKEDITOR.dom.element.createFromHtml('<kbd>' + selection + '</kbd>'))
				// 	: editor.openDialog('kbdDialog');
			}
		});

		editor.ui.addButton('kbd', {
			label: editor.lang.kbd.label,
			command: 'kbd'
		});

		CKEDITOR.dialog.add('kbdDialog', this.path + 'dialogs/kbd.js');

	}
});

