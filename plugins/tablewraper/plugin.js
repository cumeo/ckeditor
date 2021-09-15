// Register the plugin within the editor.
CKEDITOR.plugins.add('tablewraper', {
    init: function (editor) {
        editor.on('insertElement', function (event) {
            if (event.data.getName() === 'table') {
                var div = new CKEDITOR.dom.element('div').addClass('table-scroll'); // Create a new div element to use as a wrapper.
                div.append(event.data); // Append the original element to the new wrapper.
                event.data = div; // Replace the original element with the wrapper.
            }
        }, null, null, 1);
    }
});