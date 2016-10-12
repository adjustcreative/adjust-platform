window.PageScrollManager = {

  // left: 37, up: 38, right: 39, down: 40,
  // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
  keys: {37: 1, 38: 1, 39: 1, 40: 1},

  preventDefault: function (e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
  },

  preventDefaultForScrollKeys: function (e) {
      if (DisablePageScroll.keys[e.keyCode]) {
          DisablePageScroll.preventDefault(e);
          return false;
      }
  },

  disable: function() {
    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = DisablePageScroll.preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove  = DisablePageScroll.preventDefault; // mobile
    document.onkeydown  = DisablePageScroll.preventDefaultForScrollKeys;
  },

  enable: function() {
      if (window.removeEventListener)
          window.removeEventListener('DOMMouseScroll', DisablePageScroll.preventDefault, false);
      window.onmousewheel = document.onmousewheel = null;
      window.onwheel = null;
      window.ontouchmove = null;
      document.onkeydown = null;
  }

};