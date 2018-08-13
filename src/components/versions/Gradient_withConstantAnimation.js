import React, {Component} from 'react';

import {StyleSheet, Animated, Button, View} from 'react-native';
import Svg, { Circle, Path, Line, LinearGradient, Defs, Rect, Stop } from 'react-native-svg';
import DegreeDisplay from "./components/DegreeDisplay";

// Path is from react-native-svg not react-native, so we need to declare it.
const AnimatedPath = Animated.createAnimatedComponent(Path);

class Gradient_withConstantAnimation extends Component {
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
      duration: 10000,
      rotation: new Animated.Value(0),
      animationData: null
    };
  }

  componentDidMount(){
    // Setting animate speed
    Animated.timing(this.state.rotation, {
      toValue: 1,
      duration: this.state.duration,
    }).start();
  }

  // SVGS need angles to be translated to points
  calculateArcPoint = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
    const x = centerX + (radius * Math.cos(angleInRadians));
    const y = centerY + (radius * Math.sin(angleInRadians));

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

  // TODO: Figure out how to control the animation with a drag/drop trigger...
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
    }, this.calcDegrees);
  };

  /*
    TODO: This works... but because of Async, we only get the last point... figure out how to smoothly display ALL values...
    sync it with the animation, or nix the animation and just base things on where a point is dropped in the area...
  */
  calcDegrees = () => {
    this.state.xDataPoints.map((xPoint, index) => {
      const yPoint = this.state.yDataPoints[index];

      this.setState({
        degrees: Math.ceil(Math.atan2(this.state.pointEnd.y - yPoint, this.state.pointEnd.x - xPoint) * 180 / Math.PI),
        pointStart: {
          x: xPoint,
          y: yPoint
        }
      });
    });
  };

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

            {/*Make sure there is data to animate... also may not need this when we get drag/drop in*/}
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

        <DegreeDisplay degrees={degrees} />
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

export default Gradient_withConstantAnimation;