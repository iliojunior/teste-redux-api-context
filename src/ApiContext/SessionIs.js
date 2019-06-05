import React from "react";

import PropTypes from "prop-types";
import { compose, setPropTypes, defaultProps } from "recompose";
import { sessionIs } from "../utils";

const SessionIs = ({ type, children, or }) => {
  const render = sessionIs(type, or);

  const Comp = render(() => children);

  return <Comp />;
};

const enhance = compose(
  setPropTypes({
    type: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.array.isRequired
    ]),
    or: PropTypes.bool
  }),
  defaultProps({
    or: false
  })
);

export default enhance(SessionIs);
