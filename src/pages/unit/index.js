import React, { Component } from 'react';
import { Button, Input, Table, Modal, Dropdown, Icon, Menu, message } from 'antd';
import NewUnit from './Components/NewUnit';
import  axios  from 'axios';

export default class unit extends Component {
  state = {
    newUnitModal: false,  //创建Modal
    Keywords: null,        //搜索框关键字
    unitList: null,        //表格数据
    record: {},
    clickTableItem: [],   //表格选中的Id
    selected: {},          //表格选中的数组
    create: 1,
  };

  componentDidMount() {
    this.loading();
  }

  loading = () => {
    axios.get('/api/company/list')
      .then(function (response) {
        console.log(response);
        let _that = this;
        _that.setState({
          unitList:response.data
        })
      })
      .catch(function (error) {
        message.error(error);
      });
  };
  /*
  * 创建单位Modal
  * */
  CreateUnit = () => {
    this.setState({
      newUnitModal: true,
      record:{}
    });
  };
  //子表單控制父表單
  setNewUnitModal = (e) => {
    this.setState({
      newUnitModal: e,
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
    axios.get(`/api/company?name=${encodeURI(this.state.Keywords)}`)
      .then((data) => {
        this.setState({ unitList:data.data });
      })
      .catch(e => new Error(e))
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
  handleDropdown = (text,record) => {
    return <Menu>
      <Menu.Item onClick={this.Update.bind(this, record)}>更新</Menu.Item>
      <Menu.Item onClick={this.delete.bind(this, record)}>删除</Menu.Item>
    </Menu>;
  };
  Update = (record) => {
    this.setState({
      newUnitModal: true,
      record: record,
    });
  };
  delete = (id) => {
    fetch(`/api/company/${id.unitNumber}/remove`, {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then(e=>{if (e.ok) {
        return e.json()
      } else {
        return Promise.reject('出错啦!')
      }})
      .catch(e => message.error(e));
  };
  Unit = () => {

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
          <Dropdown overlay={this.handleDropdown(text,record)} trigger={['hover']}>
            <a href={' '}>
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
          destroyOnClose
          footer={null}
          visible={this.state.newUnitModal}
          onCancel={() => {
            this.setState({ newUnitModal: false });
          }}
        >
          <NewUnit record={this.state.record}
                   setNewUnitModal={this.setNewUnitModal}
          />
        </Modal>
      </div>
    );
  }
}

