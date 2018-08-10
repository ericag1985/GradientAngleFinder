import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {StyleSheet, View, Text } from 'react-native';
import NumericInput, { calcSize } from 'react-native-numeric-input'


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
        <View style={styles.inputContainer}>
          <View>
            <Text style={styles.label}>X Axis</Text>
            <NumericInput
              rounded
              minValue={-359}
              maxValue={359}
              valueType='integer'
              value={this.props.sx}
              leftButtonBackgroundColor={'#777'}
              rightButtonBackgroundColor={'#f74902'}
              borderColor={'transparent'}
              totalWidth={calcSize(200)}
              totalHeight={calcSize(75)}
              containerStyle={styles.input}
              onChange={
                value => this.props.updatePointState({sx: value})
              } />
          </View>

          <View>
            <Text style={styles.label}>Y Axis</Text>
            <NumericInput
              rounded
              minValue={-359}
              maxValue={359}
              valueType='integer'
              value={this.props.sy}
              leftButtonBackgroundColor={'#777'}
              rightButtonBackgroundColor={'#f74902'}
              borderColor={'transparent'}
              totalWidth={calcSize(200)}
              totalHeight={calcSize(75)}
              containerStyle={styles.input}
              onChange={
                value => this.props.updatePointState({sy: value})
              } />
          </View>
        </View>

        <Text>The end point is locked at (180, 0) to give us the center of the arc.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 20,
    marginHorizontal: 15,
    paddingBottom: 50
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10
  },
  input: {
    marginHorizontal: 10
  },
  label: {
    textAlign: 'center',
    marginBottom: 5,
    fontWeight: '700'
  }
});

export default Form;
