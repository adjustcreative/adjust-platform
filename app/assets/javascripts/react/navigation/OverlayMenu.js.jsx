var OverlayMenu = React.createClass({

  etInitialState: function() { 
  },

  componentWillMount: function() {
    CSEventManager.addListener( "OPEN_GLOBAL_MENU", this, "onOpenGlobalMenu" );
  },

  componentDidMount: function() {
  },

  onOpenGlobalMenu: function(){

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

