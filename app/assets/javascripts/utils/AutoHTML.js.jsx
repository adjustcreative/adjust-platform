

var AutoHTML = {

  willParse: function( text ){
    // images
    if(text.indexOf("jpg") != -1) return "image";
    if(text.indexOf("gif") != -1) return "image";
    if(text.indexOf("png") != -1) return "image";
    // videos
    if(text.indexOf("vimeo.com") != -1) return "video";
    if((text.indexOf("youtube.com") != -1) || (text.indexOf("youtu.be") != -1)) return "video";
    // audio..
    return false;
  },

  parseMedia: function( text ){

    // TODO: have a blacklist of bad URLs or a way to sniff out problems???

    var bodyText = "";
    var mediaComponent = "";

    // images
    var jpg = newText.indexOf("jpg") != -1;
    var gif = newText.indexOf("gif") != -1;
    var png = newText.indexOf("png") != -1;
    // videos
    var vimeo = newText.indexOf("vimeo.com") != -1;
    var youtube = (newText.indexOf("youtube.com") != -1) || (newText.indexOf("youtu.be") != -1);
    // audio
    var soundcloud = false;
    // text/paragraph
    var lineBreak = newText.indexOf("\n") != -1;

    // links
    if( ! png && !jpg && !gif && !vimeo && !youtube){
      // find links regx
      var regex = /((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g;
      // replace links with...
      var linkSrc = newText.replace(regex, '$1');
      // get body..

      
      newText = linkSrc;
      mediaComponent = <a target="_blank" href={linkSrc}>linkSrc</a>;
    }
    
    // hotlink images
    if( png || jpg || gif ){
      var regex = /^(http|https)\:\/\/.+\.(jpg|jpeg|bmp|gif|png)(\?\S+)?/gi;
      var html = newText.replace(regex, "<br /><img src='$&' alt='' /><br>");
      newText = html;
    }

    // video embeds
    if( vimeo || youtube){
      var html = newText
      .replace(/(?:https:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([^<]+)/g, '[https://www.youtube.com/embed/$1?modestbranding=1&rel=0&wmode=transparent&theme=light&color=white]')
      // youtube
      //<iframe width="640" height="360" src="https://www.youtube.com/embed/$1?modestbranding=1&rel=0&wmode=transparent&theme=light&color=white" frameborder="0" allowfullscreen>
      // vimeo
      //<iframe src="https://player.vimeo.com/video/$1" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen>
      .replace(/(?:https:\/\/)?(?:www\.)?(?:vimeo\.com)\/(.+)/g, '[https://player.vimeo.com/video/$1]');
      // .replace(/(?:https:\/\/)?(?:dailymotion\.com|dai\.ly)\/(.+)/g, '<center><iframe frameborder="0" width="560" height="315" src="http://www.dailymotion.com/embed/video/$1?logo=0&foreground=ffffff&highlight=1bb4c6&background=000000" allowfullscreen></iframe></center>');
      newText = html;
    }
    // some text mods

    newText = newText.replace(/\n{2,}/g, '');
    newText = newText.replace(/\n/g, '<br />');


    return newText;
  },

};