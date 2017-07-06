import React, { Component } from 'react';
import { Icon } from 'antd';

var praiseConent = {
	marginLeft: 10,
	fontWeight: 'bolder'
}

class Praise extends Component {
  render() {
    return (
      <div className="praise-info">
        <span><Icon type="heart-o" /></span>
        <span className='praise-content' style={praiseConent}>2,596 喜欢</span>
      </div>
    );
  }
}

export default Praise;
