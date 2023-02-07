import React from 'react';
import PropTypes from 'prop-types';
import style from './Button.module.scss';

const Button = ({ text }) => {
  return <button className={style.button}>{text}</button>;
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Button;
