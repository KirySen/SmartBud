import React, { Component } from 'react';
import { Button, Input, Form, Icon, message, Row, Col } from 'antd';

import Style from './index.less';

class Login extends Component {

  handleSubmit = (e)=> {
    e.preventDefault();
    this.props.form.validateFields((error, values)=>{
      if (error === null) {
        this.props.onSubmit();
      }
      console.log(values);
    })
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={Style.login}>
        <Form onSubmit={this.handleSubmit}>
          <Row type='flex' justify='center'>
            <Col>
              <h1>用户登录</h1>
            </Col>
          </Row>
          <Row type='flex' justify='center'>
            <Col>
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [{required: true, message: '请输入用户名'}]
                })(
                  <Input
                    prefix={<Icon type='user'/>}
                    placeholder={'用户名'}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row type='flex' justify='center'>
            <Col>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{required: true, message: '请输入密码'}]
                })(
                  <Input
                    prefix={<Icon type='lock'/>}
                    placeholder={'请输入密码'}
                    type='password'
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row type='flex' justify='center'>
            <Col>
              <Button htmlType='submit' type='primary' block>登录</Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  };
}

const WrappedRegistrationForm = Form.create()(Login);
export default WrappedRegistrationForm;
