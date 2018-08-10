import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';

class DegreeDisplay extends Component {
  static propTypes = {
    degrees: PropTypes.number.isRequired,
  };

  render() {
    const { degrees } = this.props;

    return (
      <View>
        <Text style={styles.css}>{degrees}&#176;</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center'
  },
  css: {
    color: '#f74902',
    marginTop: 20,
    fontSize: 16,
    fontWeight: '700'
  }
});

export default DegreeDisplay;
