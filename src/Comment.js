import React, { Component } from 'react';
import { Icon, Input ,Button , Row , Col , message} from 'antd';

let Global = require("./Global.js");

var commentUser = {
  fontWeight: 900
}

var commentPublic = {
  paddingTop: 5 ,
  paddingBottom: 5 
}

var hr = {
  marginTop: 5,
  marginRight: 10
}

class Comment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      flashStatus: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleClick(event) {

    var rid = this.props.ResourceId;
    var uid = localStorage.getItem("user_id") ? localStorage.getItem("user_id") : sessionStorage.getItem("user_id");
    var ct = this.state.value;
    if (ct) {
      fetch(Global.ApiUrl + "comment_list/",{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          user_id : uid,
          resources_id : rid,
          content : ct,
        })
      }).then((responce) => {
        message.success('评论成功！');
        this.setState({value: ''});
        window.location.reload();
      });
    }
  }

  render() {
    var rows = [];
    for (var i = this.props.ComList.length - 1; i >= 0; i--) {
      rows.push(
        <p key={i}>
          <span style={{commentUser}}>{this.props.ComList[i].user.nickname}: </span>
          <span>{this.props.ComList[i].content}</span>
        </p>
      )
    }

    return (
      <div className="comment-info">
        <div className="comment-content">
          {/* 评论区域 */}
          {rows}
        </div>
        <hr style={hr}/>
        <div className="comment-public" style={commentPublic}>
          <Row>
          <Col span={20}><Input prefix={<Icon type="message" />} placeholder="评论……" value={this.state.value} onChange={this.handleChange} /></Col>
          <Col span={4}><Button type="primary" onClick={this.handleClick}>提交</Button></Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Comment;
