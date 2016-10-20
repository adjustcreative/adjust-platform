
var ImageDragHandler = React.createClass({

  store: {
  },

  acceptedTypes: {
    'image/png': true,
    'image/jpeg': true,
    'image/gif': true
  },

  capabilities: {
    filereader: typeof FileReader != 'undefined',
    dnd: 'draggable' in document.createElement('span'),
    formdata: !!window.FormData,
    progress: "upload" in new XMLHttpRequest
  }, 

  componentWillMount: function() {
    this.dropzone_id = Guid.get();
  },

  componentDidMount: function() { this.setInteraction(); },
  componentDidUpdate: function(){ this.setInteraction(); },
  componentWillUnmount: function() { },

  emitChange: function( imageSrc ){
    if( this.props.onChange ){
      this.props.onChange({
        target: {
          value: imageSrc
        }
      });
    }
  },

  readFiles: function(files){
    var self=this;
    var file = files[0];
    // only parse the first image.
    if(this.capabilities.filereader === true && this.acceptedTypes[file.type] === true){
      var reader = new FileReader();
      reader.onload = function(e){
        self.emitChange( e.target.result );
      };
      reader.readAsDataURL(file);
    }else{
      //
    }
  },

  setInteraction: function(){

    var self = this;
    // console.log( $("#"+this.dropzone_id) )
    $("#"+this.dropzone_id).off();
    $("#"+this.dropzone_id).on('dragstart', function(e){
      // console.log("dstart", e);
      e.stopPropagation();
      e.preventDefault();
      return false;
    });
    $("#"+this.dropzone_id).on('dragover', function(e){
      e.stopPropagation();
      e.preventDefault();
      $(this).addClass("hover");
      return false;
    });
    $("#"+this.dropzone_id).on('dragleave', function(e){
      e.stopPropagation();
      e.preventDefault();
      $(this).removeClass("hover");
      return false;
    });
    $("#"+this.dropzone_id).on('dragend', function(e){
      e.stopPropagation();
      e.preventDefault();
      $(this).removeClass("hover");
      return false;
    });
    $("#"+this.dropzone_id).on('drop', function(e){
      // console.log("ddrop", e.originalEvent);
      e.stopPropagation();
      e.preventDefault();
      var event = e.originalEvent;
      var files = event.target.files || event.dataTransfer.files;
      self.readFiles( files );
    });
  },

  render: function(){

    return(
      <div id={ this.dropzone_id } className="dropzone">Drop Image Here</div>
    )
  }
});