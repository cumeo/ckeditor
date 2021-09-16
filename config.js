/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config

    // Break line
    // config.enterMode = CKEDITOR.ENTER_BR;
	// config.shiftEnterMode = CKEDITOR.ENTER_P;

	// The toolbar groups arrangement, optimized for a single toolbar row.
	config.toolbarGroups = [
	{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
	{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
	{ name: 'forms' },
	// { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
	{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
	{ name: 'links' },
	{ name: 'insert' },
	{ name: 'styles' },
	{ name: 'colors' },
	{ name: 'tools' },
	{ name: 'others' },
	{ name: 'about' }
	];
	config.forcePasteAsPlainText = true;

	// The default plugins included in the basic setup define some buttons that
	// are not needed in a basic editor. They are removed here.


	// Dialog windows are also simplified.
	config.removeDialogTabs = 'link:advanced;image:advanced';
	config.magicline_everywhere = true;
	config.filebrowserUploadUrl = '/posts/image';// api upload image.
	config.uploadUrl = '/posts/image-clipboard';
	config.extraPlugins = 'html5video,magicline,tablewraper,table,tabletools,contextmenu,menu,uploadimage,uploadwidget,filetools,notificationaggregator,sourcearea,autolink,textmatch,kbd,autogrow,resize,codesnippet,widget,lineutils,notification,toolbar,button,widgetselection,image2,dialog,dialogui';
	config.basicEntities = false;// How to prevent CKEditor replacing spaces with &nbsp;?
	// config.toolbarLocation = 'bottom';
    config.autoGrow_bottomSpace = 50;
	config.allowedContent = true;
	config.autoGrow_maxHeight = 400;
	config.format_tags = 'h2;h3';
};
