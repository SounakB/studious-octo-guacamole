import * as React from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { Constants } from 'expo';
import { Ionicons } from '@expo/vector-icons';


export default class EmptyBasket extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Ionicons name="md-menu" size={32} color="green" />
        <Ionicons name="ios-menu" size={32} color="red" />
        <Ionicons name={Platform.OS === 'ios' ? "ios-menu" : 'md-menu'} size={32} color="blue" />
        <Ionicons name="md-checkmark" size={32} color="green" />
        <Ionicons name="ios-checkmark" size={32} color="red" />
        <Ionicons name={Platform.OS === 'ios' ? "ios-checkmark" : 'md-checkmark'} size={32} color="blue" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});