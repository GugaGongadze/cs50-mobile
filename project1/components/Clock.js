import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Clock = props => {
  return (
    <View style={styles.display}>
      <Text style={styles.clock}>{props.display}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  display: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  clock: {
    fontSize: 20,
    color: '#fff'
  }
});

export default Clock;
