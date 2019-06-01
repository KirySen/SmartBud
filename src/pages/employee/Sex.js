import React from 'react';
import {Tag} from 'antd';
export default function(props) {
  const sex = props.sex;
  if (sex === 'female') {
    return <Tag>女</Tag>
  } else {
  return (
    <Tag>男</Tag>
  )}
}
