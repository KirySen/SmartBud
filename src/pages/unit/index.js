import React, { Component } from 'react';
import { Button, Input, Table, Modal, Dropdown, Icon, Menu,message } from 'antd';
import NewUnit from './Components/NewUnit';

export default class unit extends Component {
  state = {
    newUnitModal: false,  //创建Modal
    Keywords: null,        //搜索框关键字
    unitList: null,        //表格数据
    record: {},
    clickTableItem: [],   //表格选中的Id
    selected: {},          //表格选中的数组
  };

  componentDidMount() {
    this.loading()
  }
loading=()=>{
  fetch('/api/unit/all')
    .then(response=>response.json())
    .then(data=>{
      console.log(data);
      this.setState({
        unitList:data
      })
    })
    .catch(()=>{
      message.error('获取数据失败！')
    })
};
  /*
  * 创建单位Modal
  * */
  CreateUnit = () => {
    this.setState({
      newUnitModal: true,
    });
  };
  //保存及上传按钮
  /*
  * 搜索单位
  * */
  SearchKeyword = (e) => {
    this.setState({
      Keywords: e.target.value,
    });
  };
  SearchUnit = () => {

  };
  /*
    * 表格onChange事件
    * */
  onChangeTable = (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    this.setState({
      clickTableItem: selectedRowKeys,
      selected: selectedRows,
    });
  };
  handleDropdown = (record) => {
    return <Menu>
      <Menu.Item onClick={this.Update.bind(this, record)}>更新</Menu.Item>
      <Menu.Item onClick={this.delete.bind(this, record.id)}>删除</Menu.Item>
    </Menu>;
  };
  Update = (record) => {
    this.setState({
      newUnitModal: true,
      record: record,
    });
  };
  delete = (id) => {

  };
  Unit=()=>{

  };
  render() {
    const columns = [
      { title: '单位编号', dataIndex: 'unitNumber' },
      { title: '单位名称', dataIndex: 'name' },
      { title: '联系人', dataIndex: 'linkman' },
      { title: '电话号码', dataIndex: 'tel' },
      { title: '经营范围', dataIndex: 'business' },
      { title: '关键词', dataIndex: 'keywords' },
      { title: '详细地址', dataIndex: 'address' },
      { title: '街道地址', dataIndex: 'street' },
      {
        title: '操作', dataIndex: 'operation',
        render: (text, record) => (
          <Dropdown overlay={this.handleDropdown(record)} trigger={['hover']}>
            <a>
              操作 <Icon type="caret-down"/>
            </a>
          </Dropdown>
        ),
      },
    ];
    return (
      <div className="page-content">
        <div className="page-header">
          <h1>往来单位管理</h1>
          <div className="page-controls">
            <Button type="primary" onClick={this.CreateUnit}>创建单位</Button>
          </div>
        </div>
        <div className="page-filter">
          <ul>
            <li>
              <Input placeholder={'搜索单位'} onChange={this.SearchKeyword}/>
            </li>
            <li>
              <Button onClick={this.SearchUnit}>搜索</Button>
            </li>
          </ul>
        </div>
        <div className="page-list">
          <div className="page-list-actions">
            <Button size={'small'} disabled={this.state.clickTableItem.length === 0} onClick={this.Unit}>批量</Button>
          </div>
          <Table
            columns={columns}
            dataSource={this.state.unitList}
            rowSelection={{ electedRowKeys: this.state.selected, selections: true, onChange: this.onChangeTable }}
            rowKey='uid'
            pagination={{ pageSize: 10 }}
          />
        </div>
        <Modal
          title={'新建往来单位'}
          centered
          footer={null}
          visible={this.state.newUnitModal}
          onCancel={() => {
            this.setState({ newUnitModal: false });
          }}
        >
          <NewUnit record={this.state.record}
                   onSuccess={() => {
                     this.setState({ newUnitModal: false, recode: {} });
                     this.loading();
                   }}/>
        </Modal>
      </div>
    );
  }
}

