import React, { Component } from 'react';
import { Layout, Menu, Icon, LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import styles from './index.less';
import Link from 'umi/link';

moment.locale('zh-cn');

export default class Index extends Component {
  state = {};

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    const { Header, Content, Footer, Sider } = Layout;
    const SubMenu = Menu.SubMenu;
    const { location: { pathname } } = this.props;
    let children = this.props.children;
    return (
      <LocaleProvider locale={zh_CN}>
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
              <Menu.Item key="/order">
                <Link to='/order'>
                  <span><Icon type="snippets"/>工单</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="/warehouse">
                <Link to='/warehouse'>
                  <span><Icon type='shopping-cart'/>货品详情</span>
                </Link>
              </Menu.Item>
              <SubMenu
                key="sub2"
                title={
                  <span>
                  <Icon type="team"/>
                  <span>Team</span>
                </span>
                }
              >
                <Menu.Item key="6">Team 1</Menu.Item>
                <Menu.Item key="8">Team 2</Menu.Item>
              </SubMenu>
              <Menu.Item key="9">
                <Icon type="file"/>
                <span>File</span>
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
        </Layout>
      </LocaleProvider>
    );
  }
}
