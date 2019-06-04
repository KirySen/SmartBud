import React, { Component } from 'react';
import { Button, Input, Form, Icon, message, Row, Col } from 'antd/lib/index';

import Style from '@/pages/login/index.less';

class Login extends Component {
  state={
    loading:false
  };
  handleSubmit = (e)=> {
    e.preventDefault();
    this.props.form.validateFields((error, values)=>{
      if (!error) {
        fetch('/api/user/login',{
          method:'POST',
          body:JSON.stringify(values)
        })
          .then(e=>{})
          .then((data)=>{
            message.success('登录成功');
            this.setState({
              loading:true
            });
            this.props.onSuccess(data)
          })
          .catch((e)=>{
            message.error(e);
            this.setState({
              loading:false
            })
          });
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
              <Button
                htmlType='submit'
                type='primary'
                loading={this.state.loading}
                block
              >登录</Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  };
}

const WrappedRegistrationForm = Form.create()(Login);
export default WrappedRegistrationForm;
