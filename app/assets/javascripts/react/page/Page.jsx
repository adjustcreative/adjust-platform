var Page = React.createClass({

  etInitialState: function() { 
  },

  componentWillMount: function() {
  },

  componentDidMount: function() {
  },

  render:function(){
    
    return(
      <article>
        <div className="h1" dangerouslySetInnerHTML={{__html: this.props.title}} />
        <div className="body" dangerouslySetInnerHTML={{__html: this.props.body}} />
      </article>
    )
  }
});



















