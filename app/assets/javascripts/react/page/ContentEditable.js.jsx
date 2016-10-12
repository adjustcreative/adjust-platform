var ContentEditable = React.createClass({

  shouldComponentUpdate: function(nextProps){
    return nextProps.html !== this.domNode.innerHTML;
  },

  emitChange: function(){
    var html = this.domNode.innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange({
        target: { value: html }
      });
    }
    this.lastHtml = html;
    // broadcast the change
    // console.log("boardcast change", html)
    CSEventManager.broadcast("PAGE_EDIT_CHANGE", {
      fieldName: this.props.data.fieldName,
      html: html
    });
  },

  render: function(){
    classes = this.props.className + " editable";
    return(
      <div 
        ref={node => this.domNode = node}
        className={classes}
        onInput={this.emitChange} 
        onBlur={this.emitChange}
        contentEditable
        dangerouslySetInnerHTML={{__html: this.props.data.html}}>
      </div>
    )
  }
});