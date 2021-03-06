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
        message.success('点赞成功！');
        window.location.reload();
      });
    }else{
      message.error("请先登录！");
    }
  }

  handlePraiseCancel = () => {
    var uid = localStorage.getItem('user_id') ? localStorage.getItem('user_id') : sessionStorage.getItem('user_id');

    if (uid) {
      fetch(Global.ApiUrl + "praise_cancel/",{
        method:'DELETE',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          user_id : uid,
          resources_id : this.props.resource_id
        })
      }).then((responce) => {
        message.success('取消点赞！');
        window.location.reload();
      });
    }else{
      message.error("请先登录！");
    }
  }

  render() {
    let praise_icon;
    if (!this.props.praise_check) {
      praise_icon = (<a onClick={this.handleClick}><span><Icon type="heart-o" /></span></a>)
    }else{
      praise_icon = (<a onClick={this.handlePraiseCancel}><span><Icon type="heart" style={{ color: 'red' }}/></span></a>)
    }
    return (
      <div className="praise-info">
        {praise_icon}
        <span className='praise-content' style={praiseConent}>{this.props.num} 喜欢</span>
      </div>
    );
  }
}

export default Praise;
