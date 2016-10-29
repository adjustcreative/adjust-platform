var OverlayMenu = React.createClass({

  isToggle: false,

  etInitialState: function() { 
  },

  componentWillMount: function() {
    CSEventManager.addListener( "OPEN_GLOBAL_MENU", this, "onOpenGlobalMenu" );

    var self = this;
    // setup the hamburger
    $("#site-menu").css("cursor", "pointer");
    $("#site-menu").on("click", function(){
      self.toggle();
    });
  },

  toggle: function(){
    var self = this;
    if( self.isToggle ){
      self.isToggle=false;
      self.forceUpdate();
    }else{
      self.isToggle=true;
      self.forceUpdate();
    }
  },

  componentDidMount: function() { 
    this.setInteraction(); 
  },

  componentDidUpdate: function() { 
    this.setInteraction(); 
    console.log(this.isToggle)
    if(this.isToggle){
      $(".globalmenu").css("opacity",0);
      $(".globalmenu").animate({"opacity":1}, 300);
    }
  },

  setInteraction: function(){
    var self = this;
    $("#globalmenu-close").off();
    $("#globalmenu-close").on("click", function(e){
      self.toggle();
    });

  },

  render:function(){

    var style = { display: "none" };
    if( this.isToggle ) {
      style.display = "block";
      // style.opacity = 0;
    }

    return(
      <div className="globalmenu" style={style}>
        
        <div id="globalmenu-close" className="closex"></div>

        <ul>
          <li><a href="/#case-studies">Case Studies</a></li>
          <li><a href="/p/capabilities">Services</a></li>
          <li><a href="#">Who We Are</a></li>
        </ul>
      </div>
      
    )
  }
});

