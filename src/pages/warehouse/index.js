import React,{Component} from 'react'
import { Button,Row,Col,Card,message} from 'antd';

export default class Ware extends Component{
  constructor(){
    super();
    this.state={
      PhotoList:[]
    }
  }
  componentDidMount(){
    this.loading()
  }
  loading=()=>{
    fetch('/api/warehouse/all')
      .then(response => response.json())
      .then(data => {this.setState({PhoneList:data})})
      .catch(error => {message.error('网络错误，无法获取数据',error)});
  };
  render(){
    const { Meta } = Card;
    return(
      <div>
        <Button onClick={()=>{console.log(this.state.PhotoList)}}>sssssss</Button>
        {this.state.PhotoList.map((item)=>(
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={item.url}/>}
          >
            <Meta title={item.title} description={item.description} />
          </Card>
        ))
        }
      </div>
    )
  }


};
