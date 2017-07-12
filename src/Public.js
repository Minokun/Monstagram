import React, { Component } from 'react';
import './public.css';
import { Icon , Modal , Button , Form , Input , Upload, message } from 'antd';

const FormItem = Form.Item;

let Global = require("./Global.js");

function beforeUpload(file) {
  const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/png');
  if (!isJPG) {
    message.error('只能上传 JPG 格式图片!');
  }
  const isLt2M = file.size / 1024 / 1024 < 10;
  if (!isLt2M) {
    message.error('图片大小需小于 10MB!');
  }
  return isJPG && isLt2M;
}

class Avatar extends React.Component {

  state = {};

  onSuccess = (ret) => {
    this.setState({
      "imageUrl" : ret.pic_url,
    });
    this.props.setImageUrl(ret.pic_url);
    console.log('onSuccess',ret);
  }

  onStart = (file) =>{
    console.log('onStart',file,file.name);
  }

  onError = (err) => {
    console.log('onError',err);
  }

  render() {
    const imageUrl = this.state.imageUrl;
    return (
      <Upload
        className="avatar-uploader"
        name="avatar"
        showUploadList={false}
        action={Global.UploadUrl}
        beforeUpload={beforeUpload}
        onSuccess={this.onSuccess}
        onError={this.onError}
        onStart={this.onStart}
      >
        {
          imageUrl ?
            <img src={imageUrl} alt="" className="avatar" /> :
            <Icon type="plus" className="avatar-uploader-trigger" />
        }
      </Upload>
    );
  }
}

const PublicPic = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form , setImageUrl} = props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="作品发布"
        okText="发布"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <FormItem>
          {getFieldDecorator('title', {
            rules: [{ required: true, message: '请输入作品主题……' }],
          })(
            <Input prefix={<Icon type="tags" style={{ fontSize: 13 }} />} placeholder="主题……" />
          )}
          </FormItem>
        </Form>

         <Avatar setImageUrl={setImageUrl} />

      </Modal>
    );
  }
);

class AppPublic extends Component {
  state = {
    visible: false,
    ImageUrl: '',
  };

  showModal = () => {
    this.setState({ visible: true });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  setImageUrl = (url) => {
    this.setState({
      ImageUrl: url
    })
  }

  handleCreate = () => {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      var user_id = localStorage.getItem("user_id") ? localStorage.getItem('user_id') : sessionStorage.getItem("user_id");
      fetch(Global.ApiUrl + "resource_list/",{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          user_id : user_id,
          title : values.title,
          img_url : this.state.ImageUrl,
        })
      }).then((responce) => {

        if (responce.status) {

          message.success('发布成功！');
          window.location.reload();
          form.resetFields();
          this.setState({ visible: false });

        }else{

          message.error('发表失败，请稍后再尝试一下！');

        }
      });

    });
  }

  saveFormRef = (form) => {
    this.form = form;
  }

  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  render() {
    return (
      <div>
        <Button onClick={this.showModal}><Icon type="camera" />作品发布</Button>
        <PublicPic
          ref={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          setImageUrl={this.setImageUrl}
        />
      </div>
    );
  }
}

export default AppPublic;