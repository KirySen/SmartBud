import React, { Component } from 'react';
import { PageHeader, Typography, Steps, Button, message, Card, Divider, Form } from 'antd';
import styles from './index.less';
import Work from './Components/Workorder'

export default class order extends Component {
  state = {
    current: 0,
  };

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { Paragraph } = Typography;
    const routes = [
      {
        path: 'index',
        breadcrumbName: '首页',
      },
      {
        path: 'first',
        breadcrumbName: '工单管理',
      },
      {
        path: 'second',
        breadcrumbName: '创建工单',
      },
    ];

    const content = (
      <div className={styles.content}>
        <Paragraph>
          公司描述公司描述公司描述公司描述公司描述公司描述公司描述公司描述公司描述公司描述公司描述
        </Paragraph>
        <p className={styles.contentLink}>
          <a>
            <img
              src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg"
              alt="start"
            />
            快速入门
          </a>
          <a>
            <img src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" alt="info"/>
            产品信息
          </a>
          <a>
            <img src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" alt="doc"/>
            产品文件
          </a>
        </p>
      </div>
    );

    const extraContent = (
      <img
        src="https://gw.alipayobjects.com/mdn/mpaas_user/afts/img/A*KsfVQbuLRlYAAAAAAAAAAABjAQAAAQ/original"
        alt="content"
      />
    );
    const { Step } = Steps;

    const steps = [
      {
        title: '填写工单信息',
      },
      {
        title: '确认信息',
      },
      {
        title: '完成',
      },
    ];
    const { current } = this.state;
    return (
      <div>
        <PageHeader title="工单" breadcrumb={{ routes }}>
          <div className={styles.wrap}>
            <div className={styles.content}>{content}</div>
            <div className={styles.extraContent}>{extraContent}</div>
          </div>
        </PageHeader>
        <Card>
          <Steps current={current}>
            {steps.map(item => (
              <Step key={item.title} title={item.title}/>
            ))}
          </Steps>
          <div className={styles.steps_content}>{current < steps.length - 1&&<div className={styles.component}><Work/></div>}</div>
          <div className={styles.steps_action}>
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => this.next()}>
                下一步
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button type="primary" onClick={() => message.success('已提交')}>
                提交
              </Button>
            )}
            {current > 0 && (
              <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                上一步
              </Button>
            )}
          </div>
          <Divider>提示</Divider>
          <div className={styles.tip}>
            <>填写的工单不可删除请再三确认后</>
            <p>所有工单都会记录下来</p>
          </div>
        </Card>
      </div>
    );
  }
}
