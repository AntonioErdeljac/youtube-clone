import cn from 'classnames';
import React from 'react';

const Input = (props) => {
  return (
    <input
      className={'form-control'}
      value={props.value}
      onChange={(ev) => props.changeValue(props.id, ev.target.value)}
      label={props.name}
      placeholder={`Enter ${props.name}`}
    />
  );
};

export default Input;