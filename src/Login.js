import React from 'react';
import { Icon , Modal , Button , Form , Input ,Checkbox ,message} from 'antd';

const FormItem = Form.Item;

let Global = require("./Global.js");

const CollectionCreateForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form } = props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="用户登录"
        okText="登录"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入你的账户名!' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="账户……" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入你的密码!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码……" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>不走了，记住我！  </Checkbox>
          )}
          <a className="login-form-forgot" href="">傻了，我忘记了密码！</a><br/>
        </FormItem>
        </Form>
      </Modal>
    );
  }
);

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
      
      fetch(Global.ApiUrl + "login/",{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          email:values.userName,
          password:values.password
        })
      }).then((responce) => {
        return responce.json();
      }).then((data) => {

        if (data.status) {
        	if (values.remember) {
          		localStorage.setItem("user_id",data.data.user_id);
          		localStorage.setItem("nickname",data.data.nickname);
        	}else{
        		sessionStorage.setItem();
        		sessionStorage.setItem();
        	}

          message.success("登录成功！");
          
          window.location.reload();
          form.resetFields();
          this.setState({ visible: false });
        }else{
          message.error(data.message);
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
        <Button onClick={this.showModal}><Icon type="login" />用户登录</Button>
        <CollectionCreateForm
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