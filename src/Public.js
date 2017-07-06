import React, { Component } from 'react';
import { Icon , Modal , Button , Form , Input , Upload,} from 'antd';

const FormItem = Form.Item;


const PublicPic = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form , normFile} = props;
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

        <FormItem
          {...formItemLayout}
          label="Upload"
          extra="longgggggggggggggggggggggggggggggggggg"
        >
          {getFieldDecorator('upload', {
            valuePropName: 'fileList',
            getValueFromEvent: {normFile},
          })(
            <Upload name="logo"  listType="picture">
              <Button>
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>
          )}
        </FormItem>

        </Form>
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
          normFile={this.normFile}
        />
      </div>
    );
  }
}

export default AppPublic;