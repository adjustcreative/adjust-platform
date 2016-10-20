var Article = React.createClass({

  etInitialState: function() { 
  },

  componentWillMount: function() {
  },

  componentDidMount: function() {
  },

  render:function(){
    
    var bodyClasses = "medium-element body";


    var headerStyle = {}
    if( this.props.featured_image ){
      headerStyle = {
        backgroundImage: 'url(' + this.props.featured_image + ')',
        backgroundSize: "cover"
      }
    }

    return(
      <article>

        <header className="article-header" style={headerStyle}>
        
          <div className="article-header-content">
            <p className="eyebrow">Case Study</p>
            <h1>{this.props.title}</h1>
            <h3>{this.props.subtitle}</h3>
          </div>
        </header>

        <div className={bodyClasses} dangerouslySetInnerHTML={{__html: this.props.body}} />

      </article>
      
    )
  }
});



















