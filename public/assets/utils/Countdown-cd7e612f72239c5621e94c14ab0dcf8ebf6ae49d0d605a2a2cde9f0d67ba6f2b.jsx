var Countdown = React.createClass({
  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
    // $('#countdown').countdown(this.props.future, function(event) {
    //   var totalHours = event.offset.totalDays * 24 + event.offset.hours;
    //   $(this).html(event.strftime(totalHours + ' hr %M min %S sec'));
    // });
  },

  componentWillUnmount: function() {
  },
  render: function() {
    return (
      <div id="countdown" className="countdown"></div>
    );
  }
});