var ArticleNew = React.createClass({

  componentWillMount: function() {
    this.adjst_editor_control_toggle_section_id = Guid.get();
    this.save_btn_id = Guid.get();

    this.slug_id = Guid.get();
    this.color1field_id = Guid.get();
    this.color2field_id = Guid.get();
    // initial values
    this.store = {
      slug:"",
    };
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
  },

  submitChange:function(){
    
    // console.log('submit changes to database', this.store.title);
    var self = this;

    self.store.color1 = $("#"+this.color1field_id).val();
    self.store.color2 = $("#"+this.color2field_id).val();
    self.store.slug = $("#"+this.slug_id).val();

    $("body").css("background-color", self.store.color1);
    $(".article-header-content h1, .medium-element section h2, .medium-editor-element section h2").css("color", self.store.color1);
    
    var data = {
      title: this.store.title,
      slug: this.store.slug,
      subtitle: this.store.subtitle,
      body: this.store.body,
      featured_image: this.store.featured_image,
      color1: this.store.color1,
      color2: this.store.color2,
    }

    var api = "/api/articles";
    var method = "post";

    self.serverRequest = $.ajax({
      url: api,
      method: method,
      data: data,
    }).complete(function (response) {
      // console.log('database response')
      // console.log(response);
      if( response.responseText.indexOf("SUCCESS") != -1){
        window.location = "/articles/" + self.store.slug + "/edit"
      }
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
    // console.log("image change", e.target.value);
    this.sendBlobToAPI(e.target.value);
  },
  // send to api for iamge processing..
  sendBlobToAPI: function( blob ){
    console.log("send image file to api");
    var self = this;
    var data = { image: blob };
    var api = "/api/media/images";
    var method = "post";

    self.serverRequest = $.ajax({
      url: api,
      method: method,
      data: data,
    }).complete(function (response) {
      // add src to store and update..
      self.store.featured_image = response.responseText;
      self.forceUpdate();
    });

  },
              

  render:function(){

    var titleData = { fieldName: "title", html: this.store.title };
    var subtitleData = { fieldName: "subtitle", html: this.store.subtitle };
    var bodyData = { fieldName: "body", html: this.store.body };

    var headerStyle = {}

    if( this.store.featured_image ){
      headerStyle = {
        backgroundImage: 'url(' + this.store.featured_image + ')',
        backgroundSize: "cover"
      }
    }

    
    // console.log(this.store.featured_image)  q

    return(
      <article>

        <header className="article-header" style={headerStyle}>

          <div className="page-colors">
            <input id={this.slug_id} type="text" className="slug" placeholder="url-slug" maxLength="255" defaultValue={this.store.slug} />
            <input id={this.color1field_id} type="text" className="color1" placeholder="#color1" maxLength="7" defaultValue={this.store.color1} />
            <input id={this.color2field_id} type="text" className="color2" placeholder="#color2" maxLength="7" defaultValue={this.store.color2} />
          </div>

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


        <div className="align-center">
          <div className="space"></div>
          <button id={this.save_btn_id}>Save</button>
          <div className="space"></div>
        </div>

      </article>
    )
  }
});



















