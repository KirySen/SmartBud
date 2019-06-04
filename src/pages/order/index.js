import React,{Component} from 'react'
import { Button, Input, Popconfirm, Table,message } from 'antd';
import router from 'umi/router'
export default class Index extends Component{
  state={
    orderList:null,
    clickTableItem:[],
    selected:{},
  };
  componentDidMount(){
    this.loading()
  }
  loading = ()=>{
    fetch('/api/order/list')
      .then(e=>e.json())
      .then(data=>this.setState({orderList:data}))
      .catch(e=>message.error(e))
  };
  onChangeTable = (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    this.setState({
      clickTableItem: selectedRowKeys,
      selected: selectedRows,
    });
  };
  Create=()=>{
    router.replace('./order/newList')
  };
  confirm=(id)=>{
    fetch(`/api/order/${id}/remove`)
      .then(e=>{})
      .catch(e=>message.error(e))
  };
  render(){
    const columns= [
      {title:'订单编号',dataIndex:'orderNumber'},
      {title:'受理人',dataIndex:'accept'},
      {title:'品类',dataIndex:'category'},
      {title:'数量',dataIndex:'quantity'},
      {title:'单价',dataIndex:'unitPrice'},
      {title:'关联单位',dataIndex:'correlationUnit'},
      {
        title: '操作', dataIndex: "Cao",
        render: (text, record) => (
          <Popconfirm
            title={`确定删除?`}
            onConfirm={this.confirm.bind(this,record.id)}
            onCancel={this.cancel}
            okText={'确定'}
            cancelText={'取消'}
          >
            <Button>删除</Button>
          </Popconfirm>
        )
      }
    ];
    return (
      <div className="page-content">
        <div className="page-header">
          <h1>工单管理</h1>
          <div className="page-controls">
            <Button type="primary" onClick={this.Create}>创建工单</Button>
          </div>
        </div>
        <div className="page-filter">
          <ul>
            <li>
              <Input placeholder={'订单编号'} />
            </li>
            <li>
              <Button>搜索</Button>
            </li>
          </ul>
        </div>
        <div className="page-list">
          <Table
            columns={columns}
            dataSource={this.state.orderList}
            rowSelection={{ electedRowKeys: this.state.selected, selections: true, onChange: this.onChangeTable }}
            rowKey="uid" pagination={{ pageSize: 10 }}
          />
        </div>
      </div>
    )
  }
}
