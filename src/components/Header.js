import React, {Component} from 'react';

import {StyleSheet, Text, View} from 'react-native';
import { LinearTextGradient } from 'react-native-text-gradient';
import { Icon } from 'react-native-elements';


class Header extends Component {
  render() {
    return (
      <View>
        <LinearTextGradient
            style={styles.heading}
            locations={[0, 0.5]}
            colors={['#777', '#f74902']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}>
            Gradient

            <Text> Angle Finder</Text>
        </LinearTextGradient>

        <View style={styles.iconBar}>
          <Icon
            iconStyle={styles.icon}
            name='angle-acute'
            type='material-community' />

          <Icon
            iconStyle={styles.icon}
            name={'angle-right'}
            type='material-community' />

          <Icon
            iconStyle={styles.icon}
            name={'angle-obtuse'}
            type='material-community' />
        </View>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  heading: {
    color: "#f74902",
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center"
  },
  iconBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15
  },
  icon: {
    color: '#f74902',
    fontWeight: '700',
    fontSize: 30,
    marginHorizontal: 10
  }
});

export default Header;
