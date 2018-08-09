import React, {Component} from 'react';

import {StyleSheet, Animated, ScrollView} from 'react-native';
import Svg, { Circle, Path, Line, LinearGradient, Defs, Rect, Stop } from 'react-native-svg';
import CSSDisplay from "./components/CSSDisplay";
import Form from "./components/Form";

// Path is from react-native-svg not react-native, so we need to declare it.
// AnimatedPath = Animated.createAnimatedComponent(Path);

class Gradient extends Component {
  constructor() {
    super();

    this.state = {
      degrees: 0,
      pointData: {
        sx: 125,
        sy: 0,
        ex: 125,
        ey: 0
      }
    };
  }

  handleUpdate = (data) => {
    this.setState((prevState) => ({
      pointData: {
        ...prevState.pointData,
        ...data
      }
    }))
  };

  render() {
    const { pointData, degrees } = this.state;
    const radius = 125;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Animated.View style={[styles.gradientContainer]}>
          <Svg
            height="250"
            width="250">
            <Defs>
              <LinearGradient id="grad" x1={`${pointData.sx}`} y1={`${pointData.sy}`} x2={`${pointData.ex}`} y2={`${pointData.ey}`}>
                <Stop offset="0" stopColor="#777" stopOpacity="1" />
                <Stop offset="1" stopColor="#f74902" stopOpacity="1" />
              </LinearGradient>
            </Defs>
            <Rect x="0" y="0" width="250" height="250" fill="url(#grad)" />

            <Circle
              cx={radius}
              cy={radius}
              r={radius}
              stroke="transparent"
              strokeWidth="0"
              fill="transparent"
            />

            {/*Make sure there is data to animate... also may not need this when we get drag/drop in*/}
            {/*{animationData &&*/}
              {/*<AnimatedPath d={animationData} stroke="white" strokeWidth={5} fill="none"/>}*/}

            <Line
              x1="0"
              y1="0"
              x2="250"
              y2="0"
              y="125"
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="5" />
          </Svg>
        </Animated.View>

        <CSSDisplay degrees={degrees} />

        <Form sx={pointData.sx} sy={pointData.sy} ex={pointData.ex} ey={pointData.ey} updatePointState={this.handleUpdate} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
    paddingBottom: 50
  },
  gradientContainer: {
    position: "relative",
    justifyContent: 'center',
    alignItems: "center"
  },
  gradient: {
    height: 250,
    width: 250,
    borderColor: "#000",
    borderWidth: 1,
    borderStyle: 'solid'
  }
});

export default Gradient;
