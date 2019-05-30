import React, { Component } from 'react';
import router from 'umi/router'

export default class index extends Component{
  componentDidMount(){
    router.replace('/unit')
  }
  render(){
    return null
  }

}


