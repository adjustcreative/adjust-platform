var ArticleHeaderEditor = React.createClass({

  etInitialState: function() { 
  },

  componentWillMount: function() {

    this.title_id = Guid.get();
    this.subtitle_id = Guid.get();

    $(window).on("keydown", function(e){
      
    });
  },

  componentDidMount: function() { this.setInteraction(); },
  componentDidUpdate: function(){ this.setInteraction(); },

  setInteraction: function(){
    var self = this;
    $("#"+this.title_id).on("keyup", function(){
      var text = $(this).innerHtml();
      if(self.props.onChangeTitle) self.props.onChangeTitle(text);
    });
    $("#"+this.subtitle_id).on("keyup", function(){
      var text = $(this).innerHtml();
      if(self.props.onChangeSubtitle) self.props.onChangeSubtitle(text);
    });
  },



  render:function(){

    return(
      <header className="article-header">

        <ImageDragHandler 
          onChange={ this.handleImageChange } />


        <div className="article-header-content">
          <p className="eyebrow">Case Study</p>
          <h1 id={this.title_id}>
            <SimpleContentEditorReact
              onChange={ this.handleTitleChange }
              html={this.props.title} />
          </h1>

          <h3 >{this.props.subtitle}</h3>
        </div>
      </header>
    )
  }
});
























        