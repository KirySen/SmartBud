import React from 'react';
import {Tag} from 'antd';
export default function(props) {
  const sex = props.sex;
  if (sex === 'female') {
    return <Tag>女</Tag>
  } else if (sex === 'male') {
    return (
      <Tag>男</Tag>
    )
  }else {
    return '';
  }

}
