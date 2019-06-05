import { memo } from "react";

import * as R from "ramda";

import { compose, withProps, branch, renderNothing } from "recompose";

import { getMe, getSession } from "./ApiContext/store";
import { withContext } from "./ApiContext/context";

export const sessionIs = (type, or = false) =>
  compose(
    withContext(getSession, "session"),
    withProps(({ session }) => ({ session, type })),
    branch(
      R.compose(
        R.isNil,
        R.prop("type")
      ),
      renderNothing
    ),
    branch(
      ({ session, type }) =>
        or
          ? !verifySessionIsOr(type, session)
          : !verifySessionIs(type, session),
      renderNothing
    ),
    memo
  );

export const hasRules = (
  rules,
  ComponentUnauthorized = renderNothing,
  or = false
) =>
  compose(
    withContext(getMe, "me"),
    withProps(({ me: { authorities } }) => ({ authorities, rules })),
    branch(
      R.compose(
        R.isNil,
        R.prop("rules")
      ),
      ComponentUnauthorized
    ),
    branch(
      ({ authorities, rules }) =>
        or
          ? !verifyOrRules(rules, authorities)
          : !verifyHasRules(rules, authorities),
      ComponentUnauthorized
    ),
    memo
  );

export const verifyOrRules = R.curry((rules, authorities = []) => {
  const userRules = R.map(
    rule => (rule.authority ? rule.authority : rule),
    authorities
  );
  const arrRules = Array.isArray(rules) ? rules : [rules];

  return !!R.intersection(userRules, arrRules).length;
});

export const verifySessionIsOr = R.curry((types, session = {}) => {
  const arrTypes = Array.isArray(types) ? types : [types];
  return arrTypes.filter(type => session[type]).length;
});

export const verifySessionIs = R.curry((type, session = {}) => session[type]);

export const verifyHasRules = R.curry((rules, authorities = []) => {
  const userRules = R.map(
    rule => (rule.authority ? rule.authority : rule),
    authorities
  );
  const arrRules = Array.isArray(rules) ? rules : [rules];

  return R.intersection(userRules, arrRules).length === arrRules.length;
});
