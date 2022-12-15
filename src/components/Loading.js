import React from 'react';
import ReactLoading from 'react-loading';
 
const Loading = ({ type, color }) => (
    <ReactLoading type={'bars'} color={color} height={'1%'} width={'5%'} />
);
 
export default Loading;