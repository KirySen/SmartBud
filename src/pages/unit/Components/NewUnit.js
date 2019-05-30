import React, { Component } from 'react';
import { Form, Input, Select, Icon, Modal } from 'antd';
import GaoDeMap from './MapForm';

class unit extends Component {
  state = {
    MapVisible: false,
    Address: null,
  };
  //打开定位
  locationFocus = () => {
    this.setState({
      MapVisible: true,
    });
  };
  //
  setAddress = (e) => {
    this.setState({
      Address: e,
      MapVisible: false,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const TextArea = Input.TextArea;
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
    return (<div>
        <Form  {...ModalLayout}>
          <Form.Item
            label={'单位名称'}
          >
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请填写单位名称！' }],
            })(
              <Input/>,
            )}
          </Form.Item>
          <Form.Item
            label={'联系人'}
          >
            {getFieldDecorator('linkman', {
              rules: [{ required: true, message: '请填写联系人' }],
            })(
              <Input/>,
            )}
          </Form.Item>
          <Form.Item
            label={'电话号码'}
          >
            {getFieldDecorator('tel', {
              rules: [{ required: true, message: '请填写电话号码' }],
            })(
              <Input/>,
            )}
          </Form.Item>
          <Form.Item
            label={'经营范围'}
          >
            {getFieldDecorator('business', {
              rules: [{ required: true, message: '请选择经营范围' }],
            })(
              <Select>
                <Select.Option value={'trade'}>贸易</Select.Option>
                <Select.Option value={'wholesale'}>批发</Select.Option>
                <Select.Option value={'retail'}>零售</Select.Option>
                <Select.Option value={'service'}>服务</Select.Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item
            label={'关键字'}
          >
            {getFieldDecorator('keywords', {})(
              <TextArea/>,
            )}
          </Form.Item>
          <Form.Item
            label={'地址'}
          >
            {getFieldDecorator('address',{

            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item
            label={'街道地址'}
          >
            {getFieldDecorator('street', {})(
              <Input placeholder="点击打开定位"
                     onFocus={this.locationFocus}
                     suffix={<Icon type="environment"
                                   theme="twoTone"
                                   twoToneColor="red"
                                   onClick={() => this.setState({ visible: true })}/>
                     }
              />,
            )}
          </Form.Item>
        </Form>
        <Modal
          visible={this.state.MapVisible}
          maskClosable={false}
          width={800}
          title="定位"
          onCancel={() => {
            this.setState({ MapVisible: false });
          }}
          mask={false}
          footer={null}
          destroyOnClose={true}
        >
          <GaoDeMap setAddress={this.setAddress}/>
        </Modal>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create()(unit);
export default WrappedRegistrationForm;
