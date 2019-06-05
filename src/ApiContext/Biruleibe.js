import React from "react";
import App from "./App";
import Ketinho from "./Ketinho";

import SessionIs from "./SessionIs";

class Biruleibe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      a: 1
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ a: 5 });
    }, 3000);
  }

  render() {
    const { a } = this.state;
    return (
      <div>
        <SessionIs type="admin">
          <App a={a} />
        </SessionIs>
        <Ketinho a={a} />
      </div>
    );
  }
}

export default Biruleibe;
