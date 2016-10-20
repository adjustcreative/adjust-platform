// https://github.com/yabwe/medium-editor/blob/master/src/js/extensions/WALKTHROUGH-BUTTON.md

$(document).ready( function(){
  rangy.init();
});

var MediumEditorSectionBlockToggle = MediumEditor.Extension.extend({
  name: "section_block_toggle",

  init: function(){

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
    // console.log(this.wrapSelection, event.target)
    // toggle..
    if(this.toggled) this.unwrapSelection();
    else this.wrapSelection();
    // this.classApplier.toggleSelection();
    this.base.checkContentChanged();
  },

  toggled: false,
  selection_text: "",

  wrapSelection: function() {
    this.selection_text = TextUtil.getSelectionHtml();
    var wrappedText = "<section>" + this.selection_text + "</section>";
    this.base.pasteHTML(wrappedText);
  },

  unwrapSelection: function(){

  }

});