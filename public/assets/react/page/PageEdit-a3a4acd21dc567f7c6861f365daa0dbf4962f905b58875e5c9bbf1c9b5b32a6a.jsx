var PageEdit = React.createClass({

  componentWillMount: function() {
    // initial values
    this.store = {};
    for( var p in this.props ) this.store[p] = this.props[p];
    this.save_btn_id = Guid.get();
    // listen for updates..
    CSEventManager.addListener("PAGE_EDIT_CHANGE", this, "onPageEditChange" );
  },

  componentDidMount: function() { this.setInteraction(); },
  componentDidUpdate: function() { this.setInteraction(); },

  setInteraction: function(){
    // console.log( $("#"+this.save_btn_id) )
    var self = this;
    $("#"+this.save_btn_id).off();
    $("#"+this.save_btn_id).on("click", function(){
      self.submitChange();
    });
    // save when pressing ctrl+s
    $(window).on("keydown", function(e){
      if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
        e.preventDefault();
        if(!self.keyboardsave){
          self.keyboardsave = true;
          self.submitChange();
        }
      }
    });
    $(window).on("keyup", function(e){
      self.keyboardsave = false;
    });
  },

  submitChange:function(){
    
    // console.log('submit changes to database', this.store.title);

    var self = this;

    var data = {
      title: this.store.title,
      subtitle: this.store.subtitle,
      body: this.store.body
    }

    var api = "/api/pages/"+this.props.page_id;
    var method = "put";

    self.serverRequest = $.ajax({
      url: api,
      method: method,
      data: data,
    }).complete(function (response) {
      // console.log('database response')
      // console.log(response);
    });

  },

  handleChange: function(text, medium) {
    this.store.body = text;
    this.forceUpdate();
  },

  render:function(){

    var titleData = { fieldName: "title", html: this.store.title };
    var subtitleData = { fieldName: "subtitle", html: this.store.subtitle };
    var bodyData = { fieldName: "body", html: this.store.body };

    var options = {
      autoLink: true,
      imageDragging: true
    }
    
    return(
      <div>
        <article>

          <div className="h1" dangerouslySetInnerHTML={{__html: this.props.title}} />

          <MediumEditorReact 
            className="body" 
            options={ options }
            tag="p"
            onChange={this.handleChange}
            text={ bodyData.html }
            data={ bodyData } />

          <button id={this.save_btn_id}>Save</button>

        </article>


        <div className="adjst-editor-controls">
          <div className="adjst-editor-control"> 
            <div className="fa fa-object-group"></div>
          </div>
        </div>
      </div>
    )
  }
});



















