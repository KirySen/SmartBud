import React,{Component} from 'react'
import {Form,Input,Select,InputNumber,message} from 'antd'

export default class Work extends Component{
state={
  UnitList:null
};
getUnit=()=>{

fetch('/api/unit/search')
  .then(e=>e.json())
  .then(e=>{
    let C_Type = e.data.map((item) =>
      <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>,
    );
    this.setState({
      UnitList: C_Type,
    });
  })
  .catch(
    message.error('单位列表获取失败')
  )
};
  render(){
    const { getFieldDecorator } = this.props.form;
    return(
      <Form>
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
              <Select.Option value={'semi_finished'}>半成品</Select.Option>
              <Select.Option value={'product'}>产品</Select.Option>
              <Select.Option value={'material'}>原材料</Select.Option>
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
            <InputNumber/>
          )}
        </Form.Item>
        <Form.Item
          label={'单价'}
        >
          {getFieldDecorator('unitPrice',{

          })(
            <InputNumber/>
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
      </Form>
    )
  }
}
