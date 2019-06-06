import React, { Component } from 'react';
import { Form, Input, Select, Icon, Modal ,Button,message} from 'antd';
import GaoDeMap from './MapForm';
import axios from 'axios'
class unit extends Component {
  state = {
    MapVisible: false,    //新建Modal
    Address: {},          //定位数据
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
  submit=()=>{
    this.props.form.validateFields((err,values)=>{
      console.log('values: ',values);
      if (!err){
        if (!this.props.record.uid) {
       axios.post('/api/company/add',(values)
        )
         .then(e=>console.log(e))
         .catch(e=>message.error(e))
        }
        else{
          axios.post(`/api/company/${this.props.record.unitNumber}/update`,(values))
            .then(e=>console.log(e))
            .catch(e=>message.error(e))
        }
      }
    });
    this.props.setNewUnitModal(false)
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { name,linkman,tel,business,keywords,address,street } = this.props.record;
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
              initialValue:name?name:undefined,
              rules: [{ required: true, message: '请填写单位名称！' }],
            })(
              <Input/>,
            )}
          </Form.Item>
          <Form.Item
            label={'联系人'}
          >
            {getFieldDecorator('linkman', {
              initialValue:linkman?linkman:undefined,
              rules: [{ required: true, message: '请填写联系人' }],
            })(
              <Input/>,
            )}
          </Form.Item>
          <Form.Item
            label={'电话号码'}
          >
            {getFieldDecorator('tel', {
              initialValue:tel?tel:undefined,
              rules: [{ required: true, message: '请填写电话号码' }],
            })(
              <Input/>,
            )}
          </Form.Item>
          <Form.Item
            label={'经营范围'}
          >
            {getFieldDecorator('business', {
              initialValue:business?business:undefined,
              rules: [{ required: true, message: '请选择经营范围' }],
            })(
              <Select>
                <Select.Option value={'贸易'}>贸易</Select.Option>
                <Select.Option value={'批发'}>批发</Select.Option>
                <Select.Option value={'零售'}>零售</Select.Option>
                <Select.Option value={'服务'}>服务</Select.Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item
            label={'关键字'}
          >
            {getFieldDecorator('keywords', {
              initialValue:keywords?keywords:undefined,
            })(
              <TextArea/>,
            )}
          </Form.Item>
          <Form.Item
            label={'地址'}
          >
            {getFieldDecorator('address',{
              initialValue: address?address:undefined,
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item
            label={'街道地址'}
          >
            {getFieldDecorator('street', {
              initialValue:this.state.Address.address ? this.state.Address.address:street,
            })(
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
          <Form.Item>
            <Button
              type={'primary'}
              style={{marginLeft:'200px'}}
              onClick={this.submit}
            >提交</Button>
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
          destroyOnClose
        >
          <GaoDeMap setAddress={this.setAddress}/>
        </Modal>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create()(unit);
export default WrappedRegistrationForm;
