import React,{Component} from "react";
import { Layout, Menu, Breadcrumb, Icon,LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import styles from './index.less'
moment.locale('zh-cn');

export default class Index extends Component{
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  render() {
    const { Header, Content, Footer, Sider } = Layout;
    const { SubMenu } = Menu;
    return(
      <LocaleProvider locale={zh_CN}>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <div className={styles.logo} />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1">
                <Icon type="pie-chart" />
                <span>监听页</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="desktop" />
                <span>Option 2</span>
              </Menu.Item>
              <SubMenu
                key="sub1"
                title={
                  <span>
                  <Icon type="user" />
                  <span>用户</span>
                </span>
                }
              >
                <Menu.Item key="3">用户管理</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                  <Icon type="team" />
                  <span>Team</span>
                </span>
                }
              >
                <Menu.Item key="6">Team 1</Menu.Item>
                <Menu.Item key="8">Team 2</Menu.Item>
              </SubMenu>
              <Menu.Item key="9">
                <Icon type="file" />
                <span>File</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
              </Breadcrumb>
              <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>SmartBud ©2019 Created by Kiry</Footer>
          </Layout>
        </Layout>
      </LocaleProvider>
    )
  }
}
