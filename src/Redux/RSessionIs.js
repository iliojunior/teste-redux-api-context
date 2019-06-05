import React, { memo } from "react";

import * as R from "ramda";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  branch,
  compose,
  withProps,
  setPropTypes,
  defaultProps,
  renderNothing
} from "recompose";

const mapStateToProps = state => ({
  session: state.session
});

const verifySessionIs = R.curry((type, session = {}) => session[type]);

const sessionIs = (type, or = false) =>
  compose(
    connect(mapStateToProps),
    withProps(({ session }) => ({ session, type })),
    branch(
      R.compose(
        R.isNil,
        R.prop("type")
      ),
      renderNothing
    ),
    branch(
      ({ session, type }) => !verifySessionIs(type, session),
      renderNothing
    ),
    memo
  );

const RSessionIs = ({ children, or, type }) => {
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

export default enhance(RSessionIs);
