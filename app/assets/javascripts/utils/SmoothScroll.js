var SmoothScroll = {
  do: function( target, offset ){
    $(target).animate({
      scrollTop: offset
    }, 500);
  }
};