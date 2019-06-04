import React, { Component } from 'react';
import { Layout, Menu, Icon, LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import styles from './index.less';
import Link from 'umi/link';
import Login from '@/pages/login';

moment.locale('zh-cn');

export default class Index extends Component {
  state = {
    isLogin: false,
  };

  componentDidMount() {
  }

  useLogin = (data) => {
    this.setState({
      userInfo: data,
      isLogin: true,
    });
  };

  render() {
    const { Header, Content, Footer, Sider } = Layout;
    const SubMenu = Menu.SubMenu;
    const { location: { pathname } } = this.props;
    let children = this.props.children;
    return (
      <LocaleProvider locale={zh_CN}>
        {this.state.isLogin ?
          <Layout style={{ minHeight: '100vh' }}>
            <Sider
              style={{ backgroundColor: '#465362' }}
            >
              <div className={styles.logo}/>
              <Menu style={{ backgroundColor: '#465362' }} theme='dark' defaultSelectedKeys={[pathname]} mode="inline">
                <Menu.Item key="/unit">
                  <Link to='/unit'>
                    <span><Icon type="sliders"/>往来单位</span>
                  </Link>
                </Menu.Item>
                <SubMenu
                  key="order"
                  title={
                    <span><Icon type="form"/>工单管理</span>
                  }
                >
                  <Menu.Item key="List">
                    <Link to='/order'>
                      <span><Icon type="snippets"/>工单列表</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="/order">
                    <Link to='/order/newList'>
                      <span><Icon type="snippets"/>创建工单</span>
                    </Link>
                  </Menu.Item>
                </SubMenu>
                <Menu.Item key="/warehouse">
                  <Link to='/warehouse'>
                    <span><Icon type='shopping-cart'/>货品详情</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="/employee">
                  <Link to={'/employee'}><span><Icon type={'team'}/>员工管理</span></Link>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout>
              <Header style={{ background: '#fff', padding: 0 }}/>
              <Content style={{ margin: '0 16px' }}>

                {children && React.cloneElement(children,
                  {
                    children: children.props.children.map(child => React.cloneElement(child)),
                  })}
              </Content>
              <Footer style={{ textAlign: 'center' }}>SmartBud ©2019</Footer>
            </Layout>
          </Layout> : <Login onSuccess={this.useLogin}/>}
      </LocaleProvider>
    );
  }
}
