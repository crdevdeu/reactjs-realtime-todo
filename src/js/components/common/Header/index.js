import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Header = ({ title }) => {
  return (
    <div className="header">{title}</div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired
};

export default Header;
