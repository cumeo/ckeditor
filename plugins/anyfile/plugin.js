CKEDITOR.plugins.add("anyfile", {
  icons: "anyfile",
  // allowedContent: 'img[alt,!src,width,height,data-width,data-height]{border-style,border-width,float,height,margin‌​,margin-bottom,margi‌​n-left,margin-right,‌​margin-top,width}',
  init: function (editor) {
    editor.addCommand("anyfile", {
      exec: function (editor) {
        var a = document.createElement("input");
        a.setAttribute("type", "file");
        // a.setAttribute("accept", ".jpg,.pdf,.jpeg,.png,.tif,.gif,.svg");
        a.click();
        a.onchange = function () {
          file = a.files[0];
          $(CKEDITOR.currentInstance).trigger("enableFormSubmit");
          // curr = CKEDITOR.currentInstance
          formData = new FormData();
          formData.append("file", file);
          loaderElem = new CKEDITOR.dom.element("loader-elem");
          loaderHtmlStr =
            '<div style="position: relative; z-index: 100;width: 100%;height: 100%;text-align: center;background: white;opacity: 0.75;pointer-events:none">' +
            '<div style="width: 100%;height: 30px;margin-top: 100px;">Uploading...</div>' +
            "</div>";
          loaderDomEle = CKEDITOR.dom.element.createFromHtml(loaderHtmlStr);
          loaderElem.append(loaderDomEle);
          editor.insertElement(loaderElem);
          // CKEDITOR.currentInstance.setReadOnly(true)
          $.ajax({
            url: editor.config.fileUploadURL,
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
          })
            .done(
              (function (_this) {
                return function (data, textStatus, jqXHR) {
                  console.log("data", data);
                  // data = JSON.parse(data)
                  if (jqXHR.status == 200) {
                    // CKEDITOR.instances[curr.name].setReadOnly(false)
                    const url = data.url;
                    const newLine =
                      CKEDITOR.dom.element.createFromHtml("<br>");
                    let fileElem ='';
                    if (data.type.match("image.*")) {
                      fileElem = `<img data-enlargeable style="cursor: zoom-in" src="${url}">`;
                    } 
                    else if (data.type.match("video.*")) {
                      fileElem = `<div class="ckeditor-html5-video" data-responsive="true">
                         <video controls="controls" style="max-width: 700px; height: auto;" src="${url}"> </video>
                      </div>`;
                    } 
                    else if (data.type.match("audio.*")) {
                      fileElem = `<audio controls>
                      <source src="${url}" type="${data.type}">
                    </audio>`;
                    } 
                    else {
                      fileElem = `<div class="anyfile">
					<a class="btn btn-default" href="${url}">
          <i class="fa fa-paperclip" aria-hidden="true"></i>
					${data.name}</a></div>`;
                    }

                    const imgDomElem =
                      CKEDITOR.dom.element.createFromHtml(fileElem);
                    editor.insertElement(imgDomElem);
                    editor.insertElement(newLine);
                    loaderElem.remove();
                  }
                };
              })(this)
            )
            .fail(
              (function (_this) {
                return function (data, textStatus, jqXHR) {
                  alert(data.responseText || "Error! Please try again");
                  loaderElem.remove();
                };
              })(this)
            );
        };
      },
    });

    editor.ui.addButton("anyfile", {
      label: "Custom Image Uploader",
      command: "anyfile",
      toolbar: "insert",
    });
  },
});
