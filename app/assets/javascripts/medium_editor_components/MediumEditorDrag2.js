(function () {
    'use strict';

    var CLASS_DRAG_OVER = 'medium-editor-dragover';

    function clearClassNames(element) {
        var editable = MediumEditor.util.getContainerEditorElement(element),
            existing = Array.prototype.slice.call(editable.parentElement.querySelectorAll('.' + CLASS_DRAG_OVER));

        existing.forEach(function (el) {
            el.classList.remove(CLASS_DRAG_OVER);
        });
    }


    var FileDragging2 = MediumEditor.Extension.extend({
        name: 'fileDragging',

        allowedTypes: ['image'],

        init: function () {
            MediumEditor.Extension.prototype.init.apply(this, arguments);

            this.subscribe('editableDrag', this.handleDrag.bind(this));
            this.subscribe('editableDrop', this.handleDrop.bind(this));
        },

        handleDrag: function (event) {
            event.preventDefault();
            event.dataTransfer.dropEffect = 'copy';

            var target = event.target.classList ? event.target : event.target.parentElement;

            // Ensure the class gets removed from anything that had it before
            clearClassNames(target);

            if (event.type === 'dragover') {
                target.classList.add(CLASS_DRAG_OVER);
            }
        },

        handleDrop: function (event) {
            // Prevent file from opening in the current window
            event.preventDefault();
            event.stopPropagation();
            // Select the dropping target, and set the selection to the end of the target
            // https://github.com/yabwe/medium-editor/issues/980
            this.base.selectElement(event.target);
            var selection = this.base.exportSelection();
            selection.start = selection.end;
            this.base.importSelection(selection);
            // IE9 does not support the File API, so prevent file from opening in the window
            // but also don't try to actually get the file
            if (event.dataTransfer.files) {
                Array.prototype.slice.call(event.dataTransfer.files).forEach(function (file) {
                    if (this.isAllowedFile(file)) {
                        if (file.type.match('image')) {
                            this.insertImageFile(file);
                        }
                    }
                }, this);
            }

            // Make sure we remove our class from everything
            clearClassNames(event.target);
        },

        isAllowedFile: function (file) {
            return this.allowedTypes.some(function (fileType) {
                return !!file.type.match(fileType);
            });
        },

        insertImageFile: function (file) {
            if (typeof FileReader !== 'function') {
                return;
            }
            var fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            // instead of just pushing this uploaded data into the DOM, send it to api to process first.
            var self = this;
            // attach the onload event handler, makes it easier to listen in with jasmine
            fileReader.addEventListener('load', function (e) {
              // console.log("insert image file", e);
              self.sendBlobToAPI(e.target.result);
            }.bind(this));
        },


        // send to api for iamge processing..

        sendBlobToAPI: function( blob ){
          // console.log("send image file to api", blob);
          var self = this;
          var data = { image: blob };
          var api = "/api/media/images";
          var method = "post";

          self.serverRequest = $.ajax({
            url: api,
            method: method,
            data: data,
          }).complete(function (response) {
            // when a response from API, add the image file source in an image file to DOM
            // console.log('database response')
            var src = response.responseText;
            // add it to the DOM
            var addImageElement = self.document.createElement('img');
            addImageElement.src = src;
            MediumEditor.util.insertHTMLCommand(self.document, addImageElement.outerHTML);

          });

        }


    });

    // replace the default MediumEditor extension for fileDragging to this override class...
    MediumEditor.extensions.fileDragging = FileDragging2;
}());