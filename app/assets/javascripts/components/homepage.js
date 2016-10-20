


var Homepage = {

  slides: [],
  currentIndex: 0,

  init: function(){

    var self = this;

    $(".home-features").css({
      position: "relative",
      overflow: "hidden",
      "min-height": $(window).height()-80
    });

    $(".home-feature-controls").css({
      position:"absolute",
      bottom:"0px",
      left:$(window).width()/2,
    });

    $(".home-features .feature").each( function(i, target){
      var slide = $(this);
      slide.css({
        "position": "relative",
        width: "100%",
        "min-height": $(window).height() * 0.8
      });
      self.slides.push( slide );
    });
    $(window).resize( function(){ self.resize(); });
  },


  resize: function(){
    $(".home-features").css({
      position: "relative",
      "min-height": $(window).height()
    });
    for(var i=0; i<this.slides.length; i++){
      var slide = this.slides[i];
      slide.css({
        width: "100%",
        "min-height": $(window).height() * 0.8,
      });
    }
  },







};



$(document).ready(function(){
  if( HOMEPAGE ){
    var homepage = Object.create( Homepage );
    homepage.init(); 
  }
});