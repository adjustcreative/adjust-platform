var ContentEditable = React.createClass({

  shouldComponentUpdate: function(nextProps){
    return nextProps.html !== this.innerHTML;
  },

  emitChange: function(){
    var html = this.innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange({
        target: { value: html }
      });
    }
    this.lastHtml = html;
  },


  render: function(){
    classes = this.props.className + " editable";
    return(
      <div 
        className={classes}
        onInput={this.emitChange} 
        onBlur={this.emitChange}
        contentEditable
        dangerouslySetInnerHTML={{__html: this.props.html}}>
      </div>
    )
  }
});