CKEDITOR.dialog.add('kbdDialog', function(editor){
	var lang = editor.lang.kbd,
		delimiter = editor.config.kbdDelimiter || ' + ';

	return {
		title: lang.label,
		minWidth: 300,
		minHeight: 100,
		contents: [{
			id: 'main',
			elements: [
				{
					type: 'textarea',
					rows: 1,
					id: 'kbd',
					onShow: function(){
						this.getInputElement().setAttribute('readonly', '');
					},
					onKeyUp: function(e){
						var key = e.data.getKey() != 32 ? CKEDITOR.tools.capitalize(e.data.$.key, true) : e.data.$.code,
							val = this.getValue(),
							arrows = {
								'ArrowUp': '▲',
								'ArrowRight': '►',
								'ArrowDown': '▼',
								'ArrowLeft': '◄'
							};

						e.data.preventDefault(true);

						if (this.getDialog().getValueOf('main', 'editMode'))
							return;

						if (key.includes('Arrow'))
							key = arrows[key];

						this.setValue(val && val.slice(-1) != delimiter ? val + delimiter+ key : val.slice(-1) == delimiter ? val + key : key);
					},
					onBlur: function(){
						this.focus();
					}
				},
				{
					type: 'hbox',
					children: [
						{
							type: 'button',
							id: 'clearInput',
							label: lang.clearInput,
							onClick: function() {
								this.getDialog().setValueOf('main', 'kbd', '');
							}
						},
						{
							type: 'checkbox',
							id: 'editMode',
							label: lang.editMode,
							onChange: function(){
								this.getDialog().getContentElement('main', 'kbd').getInputElement().toggleAttribute('readonly', '');
							}
						}
					]
				}
			]
		}],

		onOk: function(){
			CKEDITOR.tools.array.forEach(this.getValueOf('main', 'kbd').split(delimiter), function(k, i){
				editor.insertHtml(i == 0 ? '<kbd>' + k + '</kbd>' : delimiter + '<kbd>' + k + '</kbd>');
			});
		}

	};
});

