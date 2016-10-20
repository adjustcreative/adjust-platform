
$(document).ready(function(){
  // sluggify form text when take focus away.
  if( $('.slugify-on-input').length > 0 ){
    $('.slugify-on-input').each(function(){
      $(this).on("blur", function(e){
        var text = TextUtil.slugify( $(this).val() );
        $(this).val(text);
      });
    });
  }

  // slugify text on input
  if( $(".slugify-auto-parent").length > 0 ){
    $(".slugify-auto-parent").each(function(){
      // for dropdowns
      if( $(this).is("select") ){
        $(this).on("change", function(e){
          var text = $("option:selected", this).text();
          $(".slugify-auto-child").val( TextUtil.slugify( text ) );
        });
      // for input fields
      }else{
        $(this).on("keyup", function(e){
          e.preventDefault();
          var text = $(this).val();
          $(".slugify-auto-child").val( TextUtil.slugify( text ) );
        });  
      }
    });
  }

});