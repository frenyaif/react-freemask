import React from 'react';
import PropTypes from 'prop-types';

function Text({ children }) {
  return <div className="freemask__text">{children}</div>;
}
Text.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Text;
