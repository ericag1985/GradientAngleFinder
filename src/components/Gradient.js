import React, {Component} from 'react';

import {StyleSheet, Animated, Button, View} from 'react-native';
import Svg, { Circle, Path, Line, LinearGradient, Defs, Rect, Stop } from 'react-native-svg';
import CSSDisplay from "./CSSDisplay";

// Path is from react-native-svg not react-native, so we need to declare it.
AnimatedPath = Animated.createAnimatedComponent(Path);

class Gradient extends Component {
  constructor() {
    super();

    this.state = {
      degrees: 0,
      xDataPoints: [],
      yDataPoints: [],
      pointStart: {
        x: 125,
        y: 0
      },
      pointEnd: {
        x: 125,
        y: 0
      },
      rotation: new Animated.Value(0),
      animationData: null
    };
  }

  componentDidMount(){
    // Setting animate speed
    Animated.timing(this.state.rotation,{
      toValue:1,
      duration:10000,
    }).start()
  }

  // SVGS need angles to be translated to points
  calculateArcPoint = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
    const x = centerX + (radius * Math.cos(angleInRadians));
    const y = centerY + (radius * Math.sin(angleInRadians));

    // this.setState((prevState) => ({
    //   xDataPoints: [...prevState.xDataPoints, x],
    //   yDataPoints: [...prevState.yDataPoints, y]
    // }));

    return { x, y };
  };


  // Gets the path of the circle
  getArcData = (x, y, radius, startAngle, endAngle) => {
    const start = this.calculateArcPoint(x, y, radius, endAngle);
    const end = this.calculateArcPoint(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    let data = [
      "M", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    this.setState((prevState) => ({
      xDataPoints: [...prevState.xDataPoints, start.x],
      yDataPoints: [...prevState.yDataPoints, start.y]
    }));

    return data;
  };

  handleTriggerClick = () => {
    let dataRange = [];
    let stepRange = [];
    let steps = 359; // We need to stop at 359 because 360 would end up being 0 again.

    for (var i = 0; i<steps; i++){
      dataRange.push(this.getArcData(125, 125, 125, 0, i));
      stepRange.push(i/(steps-1));
    }

    // Setting data to state - we interpolate to change the data with the new path progress
    this.setState({
      animationData: this.state.rotation.interpolate({
        inputRange: stepRange,
        outputRange: dataRange
      })
    });
  };

  // calcDegrees = () => {
  //   const degrees = Math.atan2(this.state.yAxis.x - this.state.xAxis.y, this.state.yAxis.x - this.state.xAxis.x) * 180 / Math.PI;
  //
  //   this.setState((prevState) => ({
  //     degrees: degrees
  //   }))
  // };

  render() {
    const { pointStart, pointEnd, animationData, degrees } = this.state;
    const radius = 125;

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.gradientContainer]}>
          <Svg
            height="250"
            width="250">

            <Defs>
              <LinearGradient id="grad" x1={`${pointStart.x}`} y1={`${pointStart.y}`} x2={`${pointEnd.x}`} y2={`${pointEnd.y}`}>
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

            {/*Make sure there is data to animate*/}
            {animationData &&
              <AnimatedPath d={animationData} stroke="white" strokeWidth={5} fill="none"/>}

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

        {/* We need a button right not to trigger the state changes. */}
        <Button onPress={this.handleTriggerClick} title={'Trigger'} />

        <CSSDisplay degrees={this.state.degrees} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50
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
