import React, {Component} from 'react';

import {StyleSheet, Animated, Easing, Button, View} from 'react-native';
import Svg, { Circle, Path, Line, LinearGradient, Defs, Rect, Stop } from 'react-native-svg';
import CSSDisplay from "./CSSDisplay";

AnimatedPath = Animated.createAnimatedComponent(Path);

class Gradient extends Component {
  constructor() {
    super();

    this.state = {
      degrees: 0,
      pointStart: {
        x: 0,
        y: 0
      },
      pointEnd: {
        x: 0,
        y: 125
      },
      rotation: new Animated.Value(0)
    };
  }

  componentDidMount(){
    Animated.timing(this.state.rotation,{
      toValue:1,
      duration:10000,
    }).start()
  }

  // calcDegrees = () => {
  //   const degrees = Math.atan2(this.state.yAxis.x - this.state.xAxis.y, this.state.yAxis.x - this.state.xAxis.x) * 180 / Math.PI;
  //
  //   this.setState((prevState) => ({
  //     degrees: degrees
  //   }))
  // };

  render() {
    const { pointStart, pointEnd, degrees } = this.state;

    function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
      var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

      return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
      };
    }

    function describeArc(x, y, radius, startAngle, endAngle){

      var start = polarToCartesian(x, y, radius, endAngle);
      var end = polarToCartesian(x, y, radius, startAngle);

      var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

      var d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
      ].join(" ");

      return d;
    }

    let R = 125;
    let dRange = [];
    let iRange = [];
    let steps = 359;
    for (var i = 0; i<steps; i++){
      dRange.push(describeArc(125, 125, 125, 0, i));
      iRange.push(i/(steps-1));
    }

    var _d = this.state.rotation.interpolate({
      inputRange: iRange,
      outputRange: dRange
    })

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.gradientContainer]}>
          <Svg
            height="250"
            width="250">
            <Defs>
              <LinearGradient id="grad" x1={pointStart.x} y1={pointStart.y} x2={pointEnd.x} y2={pointEnd.y}>
                <Stop offset="0" stopColor="#777" stopOpacity="1" />
                <Stop offset="1" stopColor="#f74902" stopOpacity="1" />
              </LinearGradient>
            </Defs>
            <Rect x="0" y="0" width="250" height="250" fill="url(#grad)" />

            <Circle
              cx={R}
              cy={R}
              r={R}
              stroke="transparent"
              strokeWidth="0"
              fill="transparent"
            />

            <AnimatedPath d={_d} stroke="white" strokeWidth={5} fill="none"/>

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
        {/*<Button onPress={this.rotateAxis} title={'ACK'} />*/}
        {/*<CSSDisplay degrees={this.state.degrees} />*/}
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
  },
  axis: {
    position: 'absolute',
    height: 125,
    width: 5,
    backgroundColor: '#fff'
  }
});

export default Gradient;
