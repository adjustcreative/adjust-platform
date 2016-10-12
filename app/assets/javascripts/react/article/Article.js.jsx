var Article = React.createClass({

  etInitialState: function() { 
  },

  componentWillMount: function() {
  },

  componentDidMount: function() {
  },

  render:function(){
    
    return(
      <article>
        <div className="h1">{ this.props.title }</div>
        <div className="h2">{ this.props.subtitle } </div>
        <div className="body">{ this.props.body } </div>
      </article>
    )
  }
});



















