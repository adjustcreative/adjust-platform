// React Medium Editor Wrapper with help of this file:
// https://github.com/wangzuo/react-medium-editor/blob/master/dist/editor.js

var MediumEditorReact = React.createClass({

  medium: undefined,

  store: {
    text: "",
    updated: false,
  }

  componentWillMount: function() {
    this.store.text = this.props.text;
  },

  componentDidMount: function() {
    var self = this;
    var dom = self.domNode;
    self.medium = new MediumEditor(dom, this.props.options);
    self.medium.subscribe("editableInput", function(e){
      self.store.updated = true;
      self.change( dom.innerHTML );
    });
  },

  componentDidUpdate: function(){
    this.medium.restoreSelection();
  },

  componentWillUnmount: function() {
    this.medium.destroy();
  },

  componentWillReceiveProps: function(nextProps) {
    if(nextProps.text !== this.store.text && !this.store.updated){
      this.forceUpdate();
    }
    if( this.store.updated ) this.updated = false;
  },

  change: function(text){
    if(this.props.onChange) this.props.onChange(text, this.medium);
  },

  render: function(){
    var classes = this.props.className + " editable";

    return(
      <div 
        ref={node => this.domNode = node}
        className={classes}
        onInput={this.emitChange} 
        onBlur={this.emitChange}
        contentEditable
        dangerouslySetInnerHTML={{__html: this.store.text }}>
      </div>
    )
  }
});