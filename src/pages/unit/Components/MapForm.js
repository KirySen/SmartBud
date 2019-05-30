import { Form, Input, Button } from 'antd';
import React, { Component } from 'react';
import AMap from './Amap';

class Callas extends Component {
  state = {
    marker: {},
  };

  setMarker = (item) => {

    this.setState({
      marker: item,
    });
    this.props.form.setFieldsValue({
      address:item.address
    })
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(this.state.marker,123);
        this.props.setAddress(this.state.marker);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const FormItem = Form.Item;
    const { address } = this.state.marker;
    return (
      <Form>
        <FormItem label='关键字'
                  labelCol={{span:5}}
                  wrapperCol={{span:18}}
        >
          <Input id="input"
                 placeholder="输入关键字->选择关联地址->点击地图气泡位置->确定"
                 allowClear
          />
        </FormItem>
        <FormItem label='校区位置'
                  labelCol={{span:5}}
                  wrapperCol={{span:18}}>
          {getFieldDecorator('address',
            {
              initialValue: address,
              rules: [{
                required: true,
                message: '请选择校区位置',
              }]
            },
          )
          (<Input disabled/>)}
        </FormItem>
        <AMap setMarker={this.setMarker}/>
        <FormItem>
          <Button style={{float:'right',marginTop:20}} type="primary" onClick={this.onSubmit}>确定</Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(Callas);
