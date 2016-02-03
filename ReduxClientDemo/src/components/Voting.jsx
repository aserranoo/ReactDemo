import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import Winner from './Winner.jsx';
import Vote from './Vote.jsx';
import * as actionCreators from '../action_creators.js';

export const Voting = React.createClass({	
	mixins : [PureRenderMixin],
  render: function(){
    return <div>    
    {this.props.winner ? 
      <Winner ref="winner" winner={this.props.winner} /> :
      <Vote {...this.props} />} 
    </div>;    
  }  
});

function mapStateToProps(state) {
	return {
		pair: state.getIn(['vote', 'pair']),
    hasVoted: state.get('hasVoted'),
		winner: state.get('winner')
	};
}

connect(mapStateToProps)(Voting);

export const VotingContainer = connect(
  mapStateToProps,
  actionCreators
)(Voting);