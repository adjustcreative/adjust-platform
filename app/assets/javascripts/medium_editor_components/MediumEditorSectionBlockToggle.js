// https://github.com/yabwe/medium-editor/blob/master/src/js/extensions/WALKTHROUGH-BUTTON.md

$(document).ready( function(){
  rangy.init();
});

var MediumEditorSectionBlockToggle = MediumEditor.Extension.extend({
  name: "section_block_toggle",

  init: function(){

    this.classApplier = rangy.createCssClassApplier( 'section_block_toggle', {
      elementTagName: 'blockquote'
    });

    this.button = this.document.createElement("button");
    this.button.classList.add("medium-editor-action");
    this.button.innerHTML = "Adj";
    this.button.title = "Light/Dark section toggle";

    this.on(this.button, 'click', this.handleClick.bind(this));
  },

  getButton: function(){
    return this.button;
  },

  handleClick: function(event){
    this.classApplier.toggleSelection();
    this.base.checkContentChanged();
  }

});