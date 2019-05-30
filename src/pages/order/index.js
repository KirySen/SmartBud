import React, { Component } from 'react';
import {Carousel,Row,Col} from 'antd';

export default class order extends Component {
  render() {
    return (
      <div>
        <Row gutter={24}>
          <Col span={6}>
            <Carousel autoplay>
            <div>
              <h3>1</h3>
            </div>
            <div>
              <h3>2</h3>
            </div>
            <div>
              <h3>3</h3>
            </div>
            <div>
              <h3>4</h3>
            </div>
          </Carousel>
          </Col>
        </Row>

      </div>
    );
  }
}
