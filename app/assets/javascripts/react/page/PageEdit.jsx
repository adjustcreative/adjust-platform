var PageEdit = React.createClass({

  componentWillMount: function() {
    this.adjst_editor_control_toggle_section_id = Guid.get();
    this.save_btn_id = Guid.get();
    // initial values
    this.store = {};
    for( var p in this.props ) this.store[p] = this.props[p];
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

  handleTitleChange: function(e) {
    // console.log("handle title change", e.target.);
    this.store.title = e.target.value;
    this.forceUpdate();
  },
  handleSubtitleChange: function(e) {
    this.store.subtitle = e.target.value;
    this.forceUpdate();
  },
  handleBodyChange: function(text, medium) {
    this.store.body = text;
    this.forceUpdate();
  },



  handleImageChange: function(e){
    console.log("image change", e.target.value);
    self.sendBlobToAPI(e.target.value);
  },
  // send to api for iamge processing..
  sendBlobToAPI: function( blob ){
    // console.log("send image file to api", blob);
    var self = this;
    var data = { image: blob };
    var api = "/api/media/images";
    var method = "post";

    self.serverRequest = $.ajax({
      url: api,
      method: method,
      data: data,
    }).complete(function (response) {
      // when a response from API, add the image file source in an image file to DOM
      // console.log('database response')
      var src = response.responseText;
      // add it to the DOM
      var addImageElement = self.document.createElement('img');
      addImageElement.src = src;
      MediumEditor.util.insertHTMLCommand(self.document, addImageElement.outerHTML);

    });

  },
              

  render:function(){

    var titleData = { fieldName: "title", html: this.store.title };
    var subtitleData = { fieldName: "subtitle", html: this.store.subtitle };
    var bodyData = { fieldName: "body", html: this.store.body };

    return(
      <article>

        <header className="article-header">

          <ImageDragHandler 
            onChange={ this.handleImageChange } />

          <div className="article-header-content">
            <p className="eyebrow">Case Study</p>
            <h1>
              <SimpleContentEditorReact
                onChange={ this.handleTitleChange }
                html={this.props.title} />
            </h1>
            <h3>
              <SimpleContentEditorReact
                onChange={ this.handleSubtitleChange }
                html={this.props.subtitle} />
            </h3>
          </div>
        </header>

        <MediumEditorReact 
          className="body" 
          tag="p"
          onChange={ this.handleBodyChange }
          text={ bodyData.html }
          data={ bodyData } />

      </article>
    )
  }
});



















