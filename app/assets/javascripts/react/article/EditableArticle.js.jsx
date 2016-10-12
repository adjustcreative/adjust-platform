var EditableArticle = React.createClass({

  etInitialState: function() { 
  },

  componentWillMount: function() {
  },

  componentDidMount: function() {
  },

  render:function(){
    
    return(
      <article>
        <ContentEditable className="h1" html={ this.props.title } />
        <ContentEditable className="h2" html={ this.props.subtitle } />
        <ContentEditable className="body" html={ this.props.body } />
        <button>Save</button>
      </article>
    )
  }
});



















