import React, { Component } from 'react';
import { Form, Input, InputNumber, message, Select,Button } from 'antd';
import axios from 'axios'
class Work extends Component{
state={
  UnitList:null
};
getUnit=()=>{
  axios.post('/api/company/list' )
    .then(function (e) {
      let C_Type = e.data.map((item) =>
        <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>,
      );
      this.setState({
        UnitList: C_Type,
      });
    })
    .catch(function (error) {
      message.error(error)
    });
};
  Check  = ()=>{
    this.props.form.validateFields((err,values)=>{
      if (!err){
      return this.props.SetFormData(values)
      }
      }
    )
  };
  getItemsValue = ()=>{                              //自定义方法，用来传递数据（需要在父组件中调用获取数据）
         //获取一组输入控件的值，如不传入参数，则获取全部组件的值
    return this.props.form.getFieldsValue()
  };
  render(){
    const { getFieldDecorator } = this.props.form;
    const ModalLayout = {
      labelCol: {
        xs: { span: 2 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 6 },
        sm: { span: 8 },
      },
    };

    return(
      <Form {...ModalLayout}>
        <Form.Item
          label={'受理人'}
        >
          {getFieldDecorator('accept',{
            rules:[{required:true,message:'请填写受理人'}]
          })(
            <Input/>
          )}
        </Form.Item>
        <Form.Item
          label={'品类'}
        >
          {getFieldDecorator('category',{

          })(
            <Select>
              <Select.Option value={'半成品'}>半成品</Select.Option>
              <Select.Option value={'产品'}>产品</Select.Option>
              <Select.Option value={'原材料'}>原材料</Select.Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item
          label={'原产国'}
        >
          {getFieldDecorator('born',{

          })(
            <Input/>
          )}
        </Form.Item>
        <Form.Item
          label={'数量'}
        >
          {getFieldDecorator('quantity',{

          })(
            <InputNumber style={{width:411}}/>
          )}
        </Form.Item>
        <Form.Item
          label={'单价'}
        >
          {getFieldDecorator('unitPrice',{

          })(
            <InputNumber style={{width:411}}/>
          )}
        </Form.Item>
        <Form.Item
          label={'关联单位'}
        >
          {getFieldDecorator('correlationUnit',{

          })(
            <Select
              showSearch
              optionFilterProp="children"
              onFocus={this.getUnit}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {this.state.UnitList}
            </Select>
          )}
        </Form.Item>
        <Form.Item colon={false}>
          <Button size={'small'} onClick={this.Check}>确认</Button>
        </Form.Item>
      </Form>
    )
  }
}
const WorkOrder = Form.create()(Work);
export default WorkOrder;
