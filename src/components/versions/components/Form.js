import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {StyleSheet, View } from 'react-native';
import NumericInput from 'react-native-numeric-input'


class Form extends Component {
  static propTypes = {
    updatePointState: PropTypes.func.isRequired,
    sx: PropTypes.number.isRequired,
    sy: PropTypes.number.isRequired,
    ex: PropTypes.number.isRequired,
    ey: PropTypes.number.isRequired
  };

  render() {
    return (
      <View style={styles.container}>
        <NumericInput
          rounded
          minValue={-359}
          maxValue={359}
          valueType='real'
          value={this.props.sx}
          onChange={
            value => this.props.updatePointState({sx: value})
          } />


        <NumericInput
          rounded
          minValue={-359}
          maxValue={359}
          valueType='real'
          value={this.props.sy}
          onChange={
            value => this.props.updatePointState({sy: value})
          } />

        <NumericInput
          rounded
          minValue={-359}
          maxValue={359}
          valueType='real'
          value={this.props.ex}
          onChange={
            value => this.props.updatePointState({ex: value})
          } />

        <NumericInput
          rounded
          minValue={-359}
          maxValue={359}
          valueType='real'
          value={this.props.ey}
          onChange={
            value => this.props.updatePointState({ey: value})
          } />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingBottom: 50
  }
});

export default Form;
