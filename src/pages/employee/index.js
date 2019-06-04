import React, { Component } from 'react';
import { Button, Input, Table, message, Modal, Popconfirm } from 'antd';
import NewEmployee from './NewEmployee';
import Sex from './Sex';

export default class Employee extends Component {
  state = {
    Keywords: null,         // 搜索关键字
    employeeList: null,     // 员工数据
    selected: {},
    visible: false,         // 模态框

  };


  SearchKeyword = (e) => {
    this.setState({
      Keywords: e.target.value,
    });
  };

  SearchEmployee = () => {
    console.log('SearchEmployee');
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });
  };


  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  confirm = (e) => {
    this.deleteEmployee(e);
    message.success('成功删除');
  };

  cancel = () => {
    message.error('取消删除');
  };

  deleteEmployee = (index) => {
    console.log(index);
  };

  loading = () => {
    fetch('/api/employee/all')
      .then(response => response.json())
      .then(data => {
        this.setState({
          employeeList: data,
        });
      })
      .catch((e) => {
        message.error('未能得到数据');
      });
  };

  componentDidMount() {
    this.loading();
  }

  render() {
    const columns = [
      {
        title: '员工姓名',
        dataIndex: 'name',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render: (sex) => (
          <Sex sex={sex}/>
        ),
      },
      {
        title: '业务类型',
        dataIndex: 'business_type',
      },
      {
        title: '联系方式',
        dataIndex: 'phone',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, index) => (
          <Popconfirm
            title={`确定删除${index.name}?`}
            onConfirm={this.confirm.bind(this, index.uid)}
            onCancel={this.cancel}
            okText={'确定'}
            cancelText={'取消'}
          >
            <Button>删除</Button>
          </Popconfirm>
        ),
      },
    ];
    return (
      <div className="page-content">
        <div className="page-header">
          <h1>员工管理</h1>
          <div className="page-controls">
            <Button type="primary" onClick={this.showModal}>创建员工</Button>
          </div>
        </div>
        <div className="page-filter">
          <ul>
            <li>
              <Input placeholder={'搜索员工'} onChange={this.SearchKeyword}/>
            </li>
            <li>
              <Button onClick={this.SearchEmployee}>搜索</Button>
            </li>
          </ul>
        </div>
        <div className="page-list">
          <Table
            columns={columns}
            dataSource={this.state.employeeList}
            rowSelection={{ electedRowKeys: this.state.selected, selections: true, onChange: this.onChangeTable }}
            rowKey="uid" pagination={{ pageSize: 10 }}
          />
        </div>
        <Modal
          title="新建员工"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <NewEmployee onSubmit={this.handleOk.bind(this)}/>
        </Modal>
      </div>
    );
  };
};
