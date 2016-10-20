// https://github.com/yabwe/medium-editor/blob/master/src/js/extensions/WALKTHROUGH-BUTTON.md

$(document).ready( function(){
  rangy.init();
});

var MediumEditorSectionBlockToggle = MediumEditor.Extension.extend({
  name: "section_block_toggle",

  init: function(){

    
    // this.classApplier = rangy.createCssClassApplier( 'section_block_toggle', {
    //   elementTagName: 'blockquote'
    // });

    this.button = this.document.createElement("button");
    this.button.classList.add("medium-editor-action");
    this.button.innerHTML = "Adj";
    this.button.title = "Light/Dark section toggle";

    this.on(this.button, 'click', this.handleClick.bind(this));
  },

  getButton: function(){
    return this.button;
  },


  replaceSelectedText: function(replacementText) {
    var sel, range;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            range.insertNode(document.createTextNode(replacementText));
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.text = replacementText;
    }
  },


  handleClick: function(event){
    this.classApplier.toggleSelection();
    this.base.checkContentChanged();
  }

});