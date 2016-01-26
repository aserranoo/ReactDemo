import React from 'react';
import Winner from './Winner';
import Vote from './Vote';

export default React.createClass({
  render: function(){
    return <div>
    {this.props.Winner ? 
      <Winner ref="winner" winner={this.props.winner} /> :
      <Vote ref="vote" vote={this.props.vote/>}
    </div>;
  }
});