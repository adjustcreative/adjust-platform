


var Homepage = {

  slides: [],
  currentIndex: 0,

  widthSmall: 500,

  init: function(){
    var self = this;
    $(window).resize( function(){ self.resize(); });
    self.resize();
  },

  resize: function(){
    var windowObj = $(window);
    var hometop = $("#hometop");
    var adj1 = $("#hp-adjust1");
    var adj2 = $("#hp-adjust2");
    var adj3 = $("#hp-adjust3");

    var wh = windowObj.height();
    var ww = windowObj.width();

    hometop.css({
      "min-height": wh-80
    });

    adj1.css({
      "top": wh*0.15
    });

    adj2.css({
      "top": adj1.offset().top
    });


    adj3.css({
      "top": (adj2.offset().top-50) + (ww*0.15),
      "left": ( ww > this.widthSmall ) ? (ww*0.22) : (ww*0.05),
      "width": "auto",
      "max-width": "480px",

    });

    $(".home-features").css({
      position: "relative",
      "min-height": windowObj.height()
    });
    for(var i=0; i<this.slides.length; i++){
      var slide = this.slides[i];
      slide.css({
        width: "100%",
        "min-height": wh * 0.8,
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