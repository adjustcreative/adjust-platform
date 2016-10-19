var ContentModifierMenu = React.createClass({

  store:{
    position: {left:0,top:0},  
    display: "inline-block"
  },

  componentWillMount: function() {
    var self = this;
    // set button click ids
    self.btn_bold_id = "btn_"+Guid.get();
    self.btn_italic_id = "btn_"+Guid.get();
    self.btn_link_id = "btn_"+Guid.get();
    self.btn_upper_id = "btn_"+Guid.get();
    self.btn_lower_id = "btn_"+Guid.get();
    self.btn_quote_id = "btn_"+Guid.get();


    $(window).on("mouseup", function(e){
      e.stopPropagation();
      var sel = window.getSelection();
      if(sel.focusOffset != sel.anchorOffset){
        self.show();
      }
    });

    // $(window).on("blur focus keydown mousedown", function(e){
    //   // e.stopPropagation();
    //   self.hide();
    // });

  },

  componentDidMount: function(){
    var self = this;
    console.log( "component mount", $("#"+self.btn_bold_id) )
    $("#"+self.btn_bold_id).on("click", function(e){
      // console.log("make bold");
      var text = window.getSelection().toString();
      console.log(text)
      var newText = "<b>" + text + "</b>";
      self.replaceSelectedText(newText);
    });

  },



  show: function(  ){
    var markerTextChar = "\ufeff";
    var markerTextCharEntity = "&#xfeff;";
    var sel, range, markerEl, selectionEl, markerId = "sel_"+Guid.get();
    if (window.getSelection) {
      sel = window.getSelection();

      if(sel.getRangeAt) {
        range = sel.getRangeAt(0).cloneRange();
      }else{
        // Older WebKit doesn't have getRangeAt
        range.setStart(sel.anchorNode, sel.anchorOffset);
        range.setEnd(sel.focusNode, sel.focusOffset);
        // Handle the case when the selection was selected backwards (from the end to the start in the
        // document)
        if (range.collapsed !== sel.isCollapsed) {
          range.setStart(sel.focusNode, sel.focusOffset);
          range.setEnd(sel.anchorNode, sel.anchorOffset);
        }
      }
      range.collapse(false);
      // Create the marker element containing a single invisible character using DOM methods and insert it
      markerEl = document.createElement("span");
      markerEl.id = markerId;
      markerEl.appendChild( document.createTextNode(markerTextChar) );
      range.insertNode(markerEl);
    }else if(document.selection && document.selection.createRange){
      // Clone the TextRange and collapse
      range = document.selection.createRange().duplicate();
      range.collapse(false);
      // Create the marker element containing a single invisible character by creating literal HTML and insert it
      range.pasteHTML('<span id="' + markerId + '" style="position: relative;">' + markerTextCharEntity + '</span>');
      markerEl = document.getElementById(markerId);
    }

    if (markerEl) {
      // Find markerEl position http://www.quirksmode.org/js/findpos.html
      var obj = markerEl;
      var left = 0, top = 0;
      do {
        left += obj.offsetLeft;
        top += obj.offsetTop;
      }while(obj = obj.offsetParent){
        // Move the button into place.
        // Substitute your jQuery stuff in here
        this.store.position.left = left + "px";
        this.store.position.top = top + "px";
        this.store.display = "inline-block";
        // remove it.
        $(markerEl).remove();
        // update react.
        this.forceUpdate();
      }
    }
  },

  hide: function(){
    this.store.display = "none";
    // update react.
    this.forceUpdate();
  },

  replaceSelectedText: function( text ) {
    var sel, range;
    if (window.getSelection) {
      sel = window.getSelection();
      if (sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(text));
      }
    }else if(document.selection && document.selection.createRange){
      range = document.selection.createRange();
      range.text = text;
    }
  },


  render:function(){

    var style = {
      left: this.store.position.left,
      top: this.store.position.top,
      display: this.store.display,
    }
    
    return(
      <div className="content-modifier-editor" style={style}>
        <div id={this.btn_bold_id} className="style-attr-bold">B</div>
        <div id={this.btn_italic_id} className="style-attr-italic"><i>i</i></div>
        <div id={this.btn_link_id} className="style-attr-link"><div className="fa fa-link"></div></div>
        <div id={this.btn_upper_id} className="style-attr-uppercase">T</div>
        <div id={this.btn_lower_id} className="style-attr-lowercase">T</div>
        <div id={this.btn_quote_id} className="style-attr-blockquote"><div className="fa fa-quote-left"></div></div>
      </div>
    )
  }
});



















