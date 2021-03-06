var React = require('react');

var helperGitHub = require('../utils/githubHelpers');
var ConfirmBattle = require('../components/ConfirmBattle');

// Components
var ConfirmBattleContainer = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired,
	},
	getInitialState: function() {
		return {
			isLoading: true,
			playersInfo: [],
		};
	},
	componentWillMount: function() {
		console.log('Component Will Mount');
	},
	componentDidMount: function() {
		console.log('Component Did Mount');
		var query = this.props.location.query;
		// Update the state from somewhere
		helperGitHub.getInfo([
			query.playerOne,
			query.playerTwo,
		]).then(function(players) {
			this.setState({
				isLoading: false,
				playersInfo: [players[0],players[1]],
			});
		}.bind(this));
	},
	componentWillReceiveProps: function() {
		console.log('Component Will Receive Props');
	},
	componentWillUnmount: function() {
		console.log('Component Will Unmount');
	},
	handleConfirmBattle: function() {
		this.context.router.push({
			pathname: '/results',
			state: {
				playersInfo: this.state.playersInfo,
			},
		});
	},
	render: function() {
		return (
			<ConfirmBattle
				isLoading={this.state.isLoading}
				onConfirm={this.handleConfirmBattle}
				playersInfo={this.state.playersInfo}
			/>
		);
	},
});

module.exports = ConfirmBattleContainer;
