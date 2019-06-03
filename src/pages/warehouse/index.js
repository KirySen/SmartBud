import React, { Component } from 'react';
import { Card, message } from 'antd';
import styles from './index.less';

export default class Ware extends Component {

  state = {
    PhotoList: [],
  };

  componentDidMount() {
    this.loading();
  }

  loading = () => {
    fetch('/api/warehouse/all')
      .then(response => response.json())
      .then((data) => {
        this.setState({
          PhotoList: data,
        });
      })
      .catch(error => {
        message.error('网络错误，无法获取数据', error);
      });
  };

  render() {

    const { Meta } = Card;
    return (
      <div>
        <div className={styles.Card_Item}>
          {this.state.PhotoList.map((item, index) => (
            <div key={'u' + index} className={styles.Card}>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src={item.url}/>}
              >
                <Meta title={item.title} description={item.description}/>
              </Card>
            </div>
          ))
          }
        </div>
      </div>
    );
  }


};
