var SimpleContentEditorReact = React.createClass({

  store: {
    html:"",
  },

  componentWillMount: function() {
    this.store.html = this.props.html;
    this.refguid = Guid.get();
  },
  render: function(){
    return <div 
      ref={this.refguid}
      onInput={this.emitChange} 
      onBlur={this.emitChange}
      onPaste={ this.stripStyles }
      contentEditable
      dangerouslySetInnerHTML={{__html: this.store.html}}></div>;
  },
  
  stripStyles: function(){
    this.store.html = this.refs[this.refguid].innerText;
  },

  shouldComponentUpdate: function(nextProps){
    return nextProps.html !== this.refs[this.refguid].innerHTML;
  },
  emitChange: function(){
    var html = this.refs[this.refguid].innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange({
        target: {
          value: html
        }
      });
    }
    this.lastHtml = html;
  }
});