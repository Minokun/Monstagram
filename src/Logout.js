import React, { Component } from 'react';
import { Icon , Modal , Button} from 'antd';

const confirm = Modal.confirm;

function showConfirm() {
  // body...
  confirm({
      title: '真的要退出登录吗?',
      content: '退出后无法发表作品和点赞评论哦……',
      onOk() {
        sessionStorage.clear();
        localStorage.clear();
        window.location.reload();
      },
      onCancel() {
        
      },
    });
}

class AppLogout extends Component {
  render (){
    return (
      <Button onClick={showConfirm}>
        <Icon type="logout" />退出登录
      </Button>
    );
  }
};

export default AppLogout;