(function () {
  "use strict";

  CKEDITOR.plugins.add("pastebase64", {
    init: init,
  });
  var editor = CKEDITOR.instances.content;
  editor.on("paste", function (evt) {
    var file = evt.data.dataTransfer._.files[0];
    if (file && file.type.match("image/png")) {
      sendBlobImageToServer(file, editor);
    }
  });

  function init(editor) {
    if (editor.addFeature) {
      editor.addFeature({
        allowedContent: "img[alt,id,!src]{width,height};",
      });
    }
  }

  function sendBlobImageToServer(file, editor) {
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
            alt: "", // better empty alt than without it.
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
