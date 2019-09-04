import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  TouchableNativeFeedback,
  Alert,
  Linking
} from 'react-native'
import { connect } from 'react-redux'
import foodData from '../food-data.json'
import CartContent from './common/CartContent'
import EmptyCart from './common/EmptyCart'
import ListItem from './ListItem'

class Cart extends React.Component {
  constructor (props) {
    super(props)
    // var cartData = []
    // cartData = foodData//.filter(item => this.props.cart.includes(item.id))
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Cart',
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0
      }
    }
  }

  handleCheckout = () => {
    Alert.alert(
      'Hello',
      'This is a dummy React Native app created by Sounak Biswas',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
        {
          text: 'View source on GitHub',
          onPress: () => {
            Linking.canOpenURL("https://github.com/SounakB").then(supported => {
              if (supported) {
                Linking.openURL("https://github.com/SounakB")
              } else {
                console.log("Don't know how to open URI: https://github.com/SounakB")
              }
            })
          }
        }
      ],
      { cancelable: false }
    )
  }

  render () {
    cartData = []
    cartAmount = 0
    for (var i = 0; i < this.props.cart.length; i++) {
      for (var j = 0; j < foodData.length; j++) {
        if (this.props.cart[i]['id'] == foodData[j]['id']) {
          cartData.push({
            ...foodData[j],
            quantity: this.props.cart[i]['quantity']
          })
          cartAmount =
            cartAmount + this.props.cart[i]['quantity'] * foodData[j]['price']
        }
      }
    }
    if (this.props.cart.length > 0) {
      return (
        <View style={styles.container}>
          <View style={{ flex: 9 }}>
            <ScrollView>
              <FlatList
                data={cartData}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <CartContent
                    id={item.id}
                    name={item.name}
                    image={item.image}
                    cuisine={item.cuisine}
                    price={item.price}
                    label={item.label}
                    isVegetarian={item.isVegetarian}
                    quantity={item.quantity}
                  />
                )}
              />
            </ScrollView>
          </View>
          <TouchableNativeFeedback onPress={() => this.handleCheckout()}>
            <View
              style={{
                flex: 1,
                backgroundColor: '#53dd22',
                margin: 8,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text style={{ fontSize: 21, color: '#ffffff' }}>
                CHECKOUT ₹{cartAmount}{' '}
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      )
    } else {
      return <EmptyCart />
    }
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 8,
    marginBottom: 8,
    flexDirection: 'column',
    flex: 1
  },

  title: {
    fontSize: 24,
    color: '#4099ff',
    margin: 8
  }
})

const mapStateToProps = state => {
  const { cart } = state
  return { cart }
}

export default connect(mapStateToProps)(Cart)
