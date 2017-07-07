import React from 'react';
import { Icon , Button , message} from 'antd';
import CreateUserForm from './CreateUserForm.js';

let Global = require("./Global.js");

class AppLogin extends React.Component {
  state = {
    visible: false,
  };
  showModal = () => {
    this.setState({ visible: true });
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  handleCreate = () => {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      fetch(Global.ApiUrl + "user_list/",{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          email:values.email,
          password:values.password,
          nickname:values.nickname,
          prefix:values.prefix,
          phone:values.phone,
        })
      }).then((responce) => {
        return responce.json();
      }).then((data) => {
        if (data.id) {
          localStorage.setItem("user_id",data.id);
          localStorage.setItem("nickname",data.nickname);
          message.success("注册成功！");
          
          window.location.reload();
          form.resetFields();
          this.setState({ visible: false });
        }else{
          message.error('注册失败！请稍后再次尝试！');
        }
        
      });

    });
  }
  saveFormRef = (form) => {
    this.form = form;
  }
  render() {
    return (
      <div>
        <Button onClick={this.showModal}><Icon type="login" />注册用户</Button>
        <CreateUserForm
          ref={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}


export default AppLogin;