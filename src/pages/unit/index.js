import React, {Component} from 'react'
import {Button, Input, Table, Modal} from "antd";
import NewUnit from './Components/NewUnit'
export default class unit extends Component {
  state = {
    newUnitModal: false,  //创建Modal
    Keywords: null,        //搜索框关键字
    unitList: null,        //表格数据
  };

  componentDidMount() {

  }

  /*
  * 创建单位Modal
  * */
  CreateUnit = () => {
    this.setState({
      newUnitModal: true
    })
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
  render() {
    const columns = [
      {title: '单位编号', dataIndex: 'unitNumber'},
      {title:'单位名称',dataIndex:'name'},
      {title:'联系人',dataIndex:'linkman'},
      {title:'电话号码',dataIndex:'tel'},
      {title:'经营范围',dataIndex:'business'},
      {title:'关键词',dataIndex:'keywords'},
      {title:'详细地址',dataIndex:'address'},
      {title:'街道地址',dataIndex:'street'}
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
          <Table
            columns={columns}
            dataSource={this.state.unitList}
            rowSelection={{ electedRowKeys: this.state.selected, selections: true, onChange: this.onChangeTable }}
            rowKey="id" pagination={{ pageSize: 10 }}
          />
        </div>
        <Modal
          title={'新建往来单位'}
          centered
          visible={this.state.newUnitModal}
          onCancel={() => {
            this.setState({newUnitModal: false})
          }}
        >
          <NewUnit/>
        </Modal>
      </div>
    )
  }
}

