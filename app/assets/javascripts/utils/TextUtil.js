var TextUtil = {
  
  convertLineBreakToBr: function(text) {
    return text.replace(/\n/g,"<br>");
  },

  slugify: function( text ){
    return text
      .toLowerCase()
      .replace(/ /g,'-')
      .replace(/[^\w-]+/g,'');
  }
};