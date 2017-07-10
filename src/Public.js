import React, { Component } from 'react';
import './public.css';
import { Icon , Modal , Button , Form , Input , Upload, message } from 'antd';

const FormItem = Form.Item;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
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

  handleChange = (info) => {
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
    }
  }

  onSuccess = (ret) => {
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
        action="//jsonplaceholder.typicode.com/posts/"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
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
    const { visible, onCancel, onCreate, form } = props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
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

        <Avatar />

      </Modal>
    );
  }
);

class AppPublic extends Component {
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

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
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
        />
      </div>
    );
  }
}

export default AppPublic;