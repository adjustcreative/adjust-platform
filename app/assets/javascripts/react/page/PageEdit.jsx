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
  },

  onPageEditChange: function( data ){

    // update store..
    this.store[data.fieldName] = data.html;

    // this.forceUpdate();
  },

  submitChange:function(){
    
    console.log('submit changes to database', this.store.title);

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
      console.log('database response')
      console.log(response);
    });

  },

  render:function(){

    var titleData = { fieldName: "title", html: this.store.title };
    var subtitleData = { fieldName: "subtitle", html: this.store.subtitle };
    var bodyData = { fieldName: "body", html: this.store.body };
    
    return(
      <article>

        <ContentEditable className="h1" data={ titleData } />
        <ContentEditable className="h2" data={ subtitleData } />
        <ContentEditable className="body" data={ bodyData } />

        <button id={this.save_btn_id}>Save</button>
      </article>
    )
  }
});



















