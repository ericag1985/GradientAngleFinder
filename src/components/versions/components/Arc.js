import React, { Component } from 'react';
import { Path } from 'react-native-svg';

class Arc extends Component {
  render() {
    const {data} = this.props;
    return (
      <Path
        d={data}
        fill={'rgba(255,255,255,0.2)'}
        stroke={'#fff'}
        strokeWidth='3'
      />
    );
  }
}

export default Arc;
