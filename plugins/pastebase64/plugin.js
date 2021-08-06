(function () {
  "use strict";

  CKEDITOR.plugins.add("pastebase64", {
    init: init,
  });

  function init(editor) {
    if (editor.addFeature) {
      editor.addFeature({
        allowedContent: "img[alt,id,!src]{width,height};",
      });
    }

    editor.on("contentDom", function () {
      var editableElement = editor.editable
        ? editor.editable()
        : editor.document;
      editableElement.on("paste", onPaste, null, { editor: editor });
    });
  }

  function onPaste(event) {
    var editor = event.listenerData && event.listenerData.editor;
    var $event = event.data.$;
    var clipboardData = $event.clipboardData;
    var found = false;
    var imageType = /^image/;

    if (!clipboardData) {
      return;
    }

    return Array.prototype.forEach.call(
      clipboardData.types,
      function (type, i) {
        if (found) {
          return;
        }

        if (
          type.match(imageType) ||
          clipboardData.items[i].type.match(imageType)
        ) {
          console.log(clipboardData.items[i]);
          sendBlobImageToServer(clipboardData.items[i], editor);
          return (found = true);
        }
      }
    );
  }

  function sendBlobImageToServer(item, editor) {
    if (!item || typeof item.getAsFile !== "function") {
      return;
    }

    var file = item.getAsFile();
    var formData = new FormData();
    formData.append("upload", file);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    // SEND FILE TO SERVER.
    fetch("/posts/image-clipboard", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        var element = editor.document.createElement("img", {
          attributes: {
            src: data.url,
          },
        });
        setTimeout(function () {
          editor.insertElement(element);
        }, 10);
      })

      .catch((err) => {
        console.log(err);
      });
  }
})();
