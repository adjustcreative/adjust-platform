var Page = React.createClass({

  etInitialState: function() { 
  },

  componentWillMount: function() {
  },

  componentDidMount: function() {
  },

  render:function(){
    
    var bodyClasses = "medium-element body";

    return(
      <article>

        <div className={bodyClasses} dangerouslySetInnerHTML={{__html: this.props.body}} />

      </article>
      
    )
  }
});



















