import React, { Component } from 'react';
import { Icon , message} from 'antd';

let Global = require("./Global.js");

var praiseConent = {
	marginLeft: 10,
	fontWeight: 'bolder'
}

class Praise extends Component {

  state = {
    status: 0,
  };

  // 获取数据
  getData() {
    fetch(Global.ApiUrl + "resource_list/").then((responce) => {
      return responce.json();
    }).then((data) => {
      this.setState({
        show_list:data,
      });
    }).catch((error) => {
      console.log('request faild:', error);
    })
  }

  handleClick = () => {
    var uid = localStorage.getItem('user_id') ? localStorage.getItem('user_id') : sessionStorage.getItem('user_id');

    if (uid) {
      fetch(Global.ApiUrl + "praise/",{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          user_id : uid,
          resources_id : this.props.resource_id
        })
      }).then((responce) => {
        message.success('评论成功！');
        window.location.reload();
      });
    }else{
      message.error("请先登录！");
    }
  }

  // 获取当前用户点赞信息数据
  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <div className="praise-info">
        <a onClick={this.handleClick}><span><Icon type="heart-o" /></span></a>
        <span className='praise-content' style={praiseConent}>{this.props.num} 喜欢</span>
      </div>
    );
  }
}

export default Praise;
