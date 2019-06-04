import React, { Component } from 'react';
import { Tabs } from 'antd';
import styles from './index.less';
import LoginForm from './Components/LoginForm';
import logo from '@/assets/logo.png';
class Login extends Component {


  render() {

    return (

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <a href={'/'}>
                <img className={styles.logo} src={logo}/>
                <span className={styles.title}>SmartBud</span>
              </a>

            </div>
            <div className={styles.desc}>公司描述公司描述公司描述</div>
          </div>
          <div className={styles.main}>
            <div className={styles.login}>

              <Tabs defaultActiveKey="account" animated={false}>
                <Tabs.TabPane tab="账号密码登陆" key="account">
                  <LoginForm onSuccess={this.props.onSuccess}/>
                </Tabs.TabPane>
                <Tabs.TabPane tab="手机号登陆" disabled key="mobile">
                </Tabs.TabPane>
              </Tabs>


            </div>
          </div>
        </div>

      </div>

    );
  }
}

export default Login;
