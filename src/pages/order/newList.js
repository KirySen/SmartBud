import React, { Component } from 'react';
import { PageHeader, Typography, Steps, Button, message, Card, Divider, Alert,Descriptions} from 'antd';
import styles from './index.less';
import WorkOrder from './Components/Workorder';

export default class order extends Component {
  state = {
    current: 0,
    formDate:{}
  };

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  submit(){
        fetch('/api/order/add',{
          method:'POST',
          body: JSON.stringify(this.state.formDate)
        })
          .then(e=>{
            message.success('提交成功');
          })
          .catch(e =>message.error(e));
    const current = this.state.current + 1;
    this.setState({current});
  }
  more(){
    const current = 0;
    this.setState({current:current});
  }
  SetFormData= (e)=>{
    this.setState({formDate:e})
  };
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
          <div className={styles.steps_content}>{current === 0 &&
          <div className={styles.component}>
            <Alert message="填写工单填写工单填写工单" type="info" showIcon closable style={{width:500,margin:'10px auto'}}/>
            <WorkOrder SetFormData={this.SetFormData} wrappedComponentRef={(form) => this.form = form}/>
          </div>}
            {current===1&&(
              <Descriptions
              title={'工单详情'}
                >
                <Descriptions.Item label="受理人">{this.state.formDate.accept}</Descriptions.Item>
                <Descriptions.Item label="品类">{this.state.formDate.category}</Descriptions.Item>
                <Descriptions.Item label="原产国">{this.state.formDate.born}</Descriptions.Item>
                <Descriptions.Item label="数量">{this.state.formDate.quantity}</Descriptions.Item>
                <Descriptions.Item label="单价">{this.state.formDate.unitPrice}</Descriptions.Item>
                <Descriptions.Item label="关联单位">{this.state.formDate.correlationUnit}</Descriptions.Item>
              </Descriptions>
            )}
          </div>
          <div className={styles.steps_action}>
            {current < steps.length - 2 && (
              <Button type="primary" onClick={() => this.next()}>
                下一步
              </Button>
            )}
            {current === steps.length - 2 && (
              <Button type="primary" onClick={() => this.submit()}>
                提交
              </Button>
            )}
            {current === 1 &&(
              <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                上一步
              </Button>
            )}
            {current === 2 && (
              <Button onClick={() => this.more()}>再创建工单</Button>
            )}
          </div>
          <Divider>提示</Divider>
          <div className={styles.tip}>
            <p>填写的工单不可删除请再三确认后</p>
            <p>所有工单都会记录下来</p>
          </div>
        </Card>
      </div>
    );
  }
}
