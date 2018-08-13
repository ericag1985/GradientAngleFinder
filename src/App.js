/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Header from './components/Header';
import Gradient_AnimatedArc from './components/versions/Gradient_withConstantAnimation';
import Gradient from './components/versions/Gradient';

type Props = {};

export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Header />

        <Gradient />
        {/*<Gradient_Animated />*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50
  },
});
