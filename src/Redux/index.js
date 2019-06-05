import React from "react";

import Rah from "./Rah";
import RSessionIs from "./RSessionIs";

const ReduxApp = () => (
  <RSessionIs type="admin">
    <Rah />
  </RSessionIs>
);

export default ReduxApp;
