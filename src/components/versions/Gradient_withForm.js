import React, {Component} from 'react';

import {StyleSheet, Animated, Easing, ScrollView} from 'react-native';
import Svg, { Circle, Path, Line, LinearGradient, Defs, Rect, Stop, ClipPath, G} from 'react-native-svg';
import Form from "./components/Form";
import Arc from './components/AnimatedArc';

// Path is from react-native-svg not react-native, so we need to declare it.
const AnimatedArc = Animated.createAnimatedComponent(Arc);

class Gradient extends Component {
  constructor() {
    super();

    this.state = {
      radius: 125,
      degrees: 0,
      pointData: {
        sx: 125,
        sy: 0,
        ex: 125,
        ey: 0
      },
      arcData: null,
      animValue: new Animated.Value(0.1)
    };
  }

  // We need this to make sure the gradient re-renders on state change...
  gradientKey = 0;
  arcKey = 0;

  // TODO: Get animation to work...
  // resetAnimation = () => {
  //   this.state.animValue.setValue(0.1);
  // };
  //
  // animate = () =>{
  //   Animated.timing(
  //     this.state.animValue,
  //     {
  //       toValue: 2,
  //       duration: 2000,
  //       easing: Easing.inOut(Easing.quad)
  //     }
  //   ).start(()=>{
  //     setTimeout(this.resetAnimation, 2000);
  //   });
  // };

  positivifyDegrees = (degrees) => {
    var results = 0;
    if (degrees < 0) {
      results = degrees + 360;
    } else {
      results = degrees;
    }

    return results
  };

  calculateArcPoint = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
    const x = Math.floor(centerX + (radius * Math.cos(angleInRadians)));
    const y = Math.floor(centerY + (radius * Math.sin(angleInRadians)));

    return({ x, y })
  };

  calcDegrees = () => {
    const { pointData } = this.state;
    // Floor to get a whole number for the "css"
    // TODO: Need this to be 360 instead of 180 to get correct degrees when using AXIS inputs... verify with Leigh on math...
    const degrees = Math.floor(Math.atan2(pointData.ey - pointData.sy, pointData.ex - pointData.sx) * 360 / Math.PI);

    this.setState({
      degrees: this.positivifyDegrees(degrees)
    }, this.getArcData(125, 125, this.state.radius, 0, this.state.degrees, false))
  };


  // Gets the path of the circle
  getArcData = (x, y, radius, startAngle, endAngle, calculatePoints) => {
    const start = this.calculateArcPoint(x, y, radius, endAngle);
    const end = this.calculateArcPoint(x, y, radius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    const sx = (calculatePoints) ? start.x : this.state.pointData.sx;
    const sy = (calculatePoints) ? start.y : this.state.pointData.sy;
    const ex = (calculatePoints) ? end.x : this.state.pointData.ex;
    const ey = (calculatePoints) ? end.y : this.state.pointData.ey;

    let data = [
      "M", sx, sy,
      "A", radius, radius, 0, largeArcFlag, 0, ex, ey,
      "L", 125,125
    ].join(" ");

    this.setState((prevState) => ({
      pointData: {
        ...prevState.pointData,
        sx: sx,
        sy: sy,
      },
      arcData: data
    }), this.animate);
  };

  handleUpdatePointState = (data) => {
    this.setState((prevState) => ({
      pointData: {
        ...prevState.pointData,
        ...data
      }
    }), this.calcDegrees);
  };

  handleUpdateDegreeState = (data) => {
    this.setState({
      degrees: data
    }, this.getArcData(125, 125, this.state.radius, 0, data, true))
  };

  render() {
    const { pointData, degrees, arcData } = this.state;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Animated.View style={[styles.gradientContainer]}>
          <Svg
            height="250"
            width="250">
            <Defs>
              <LinearGradient
                id="grad"
                x1={`${pointData.sx}`}
                y1={`${pointData.sy}`}
                x2={`${pointData.ex}`}
                y2={`${pointData.ey}`}
                key={this.gradientKey++}>
                <Stop offset="0" stopColor="#777" stopOpacity="1" />
                <Stop offset="1" stopColor="#f74902" stopOpacity="1" />
              </LinearGradient>
            </Defs>

            {/*Gradient*/}
            <Rect x="0" y="0" width="250" height="250" fill="url(#grad)" />

            {/*Arc*/}
            {arcData &&
              <G>
                <AnimatedArc data={arcData} key={this.arcKey++}/>
              </G>
            }

            {/*Angle Indicator*/}
            <Circle
              cx={pointData.sx}
              cy={pointData.sy}
              r="5"
              fill="white"
            />

            {/*YAxis*/}
            <Line
              x1="0"
              y1="0"
              x2="250"
              y2="0"
              y="125"
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="5" />

            {/*X-Axis*/}
            <Line
              x1="0"
              y1="0"
              x2="0"
              y2="250"
              x="125"
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="5" />
          </Svg>
        </Animated.View>

        <Form
          sx={pointData.sx}
          sy={pointData.sy}
          degrees={degrees}
          updatePointState={this.handleUpdatePointState}
          updateDegreeState={this.handleUpdateDegreeState}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30,
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
