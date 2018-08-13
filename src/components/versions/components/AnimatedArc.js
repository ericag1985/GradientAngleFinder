import React, { Component } from 'react';
import { Path } from 'react-native-svg';
import * as shape from 'd3-shape';
const d3 = {shape};

class AnimatedArc extends Component {
  // createArc = (data) => {
  //   const arc = d3.arc(data);
  //
  //   let arcData = arc;
  //
  //   return this.arcGenerator(arcData);
  // };

  render() {
    const {data} = this.props;
    return (
      <Path
        d={data}
        fill={'rgba(255,255,255,0.4)'}
        stroke={'#fff'}
        strokeWidth='3'
      />
    );
  }
}

export default AnimatedArc;
