import React, { Component } from 'react';
import { Form, Input, Radio } from 'antd';


class employee extends Component{
  state = {
      MapVisible: false,// 新建Model
  };



  render() {
    const ModalLayout = {
      labelCol: {
        xs: { span: 4 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 6 },
        sm: { span: 18 },
      },
    };
    const { getFieldDecorator } = this.props.form;
    return (
        <Form {...ModalLayout}>
            <Form.Item
              label={'员工姓名'}
            >
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请填写员工姓名！' }],
              })(
                <Input />,
              )}

            </Form.Item>

          <Form.Item
            label={'联系方式'}
          >
            {getFieldDecorator('phone', {
              rules: [{required: true, message: '请输入联系方式'}]
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item
            label={'性别'}
          >
            {getFieldDecorator('sex', {
              rules: [{required: true, message: '请选择性别'}]
            })(
              <Radio.Group>
                <Radio value="male">男</Radio>
                <Radio value="female">女</Radio>
              </Radio.Group>
            )}
        </Form.Item>
        <Form.Item
          label={'业务类型'}
        >
          {getFieldDecorator('business_type', {
            rules: [{required: true, message: '请选择业务类型'}]
          })(
            <Input/>
          )}

        </Form.Item>
        </Form>
    );
  };
};

const WrappedRegistrationForm = Form.create()(employee);
export default WrappedRegistrationForm;
