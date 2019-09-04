import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity
} from 'react-native'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import { addItem } from '../actions/index'
import { removeItem } from '../actions/index'


function mapDispatchToProps (dispatch) {
  return {
    addItem: item => dispatch(addItem(item)),
    removeItem: item => dispatch(removeItem(item))
  }
}

const mapStateToProps = state => {
  // const { cart } = state
  return { cart: state.cart }
}

class ListItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isClicked: false
    }

    this.handleAdd = this.handleAdd.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleAdd = id => {
    this.props.addItem(id)
  }

  handleRemove = id => {
    this.props.removeItem(id)
  }

  handleClick = () => {
    this.setState({
      isClicked: !this.state.isClicked
    })
    this.props.handleNaviagation()
  }
  render () {
    var quantity = false
    for (var j = 0; j < this.props.cart.length; j++) {
      if (this.props.id == this.props.cart[j]['id']) {
        quantity = this.props.cart[j].quantity
      }
      // console.log(quantity)
    }
    return (
      <View
        // elevation={2}
        style={{
          flex: 1,
          flexDirection: 'row',
          backgroundColor: '#ffffff',
          marginHorizontal: 24,
          marginVertical: 8,
          borderRadius: 4,
          shadowOpacity: 0.1,
          shadowRadius: 2,
          shadowOffset: {
            height: 1,
            width: 1
          }
        }}
      >
        <Image
          style={{
            width: 108,
            height: 108,
            borderTopLeftRadius: 4,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 4
          }}
          source={{ uri: this.props.image }}
        />
        <View
          style={{
            padding: 16,
            flex: 1,
            flexDirection: 'row'
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between'
              // width: "100%"
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: '#333'
              }}
            >
              {this.props.name}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#666'
              }}
            >
              {this.props.cuisine},{' '}
              {this.props.isVegetarian ? (
                <Image
                  style={{
                    // position: "absolute",
                    width: 16,
                    height: 16,
                    justifyContent: 'center',
                    borderRadius: 0
                  }}
                  source={require('../../assets/veg.jpg')}
                />
              ) : (
                <Image
                  style={{
                    // position: "absolute",
                    width: 16,
                    height: 16,
                    justifyContent: 'center',
                    borderRadius: 0
                  }}
                  source={require('../../assets/non-veg.jpg')}
                />
              )}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#999'
              }}
            >
              {this.props.label}
            </Text>

            <View
              style={{
                flex: 0.8,
                flexDirection: 'row',
                justifyContent: 'space-between'
                // width: "100%"
              }}
            >
              <Text
                style={{
                  fontSize: 21,
                  fontWeight: 'bold',
                  color: '#ef6136'
                }}
              >
                ₹ {this.props.price}
              </Text>
              {/* <Button
                onPress={e => alert("Hey")}
                title="ADD"
                style={{
                  backgroundColor: "4099ff",
                  color: "#fff",
                  paddingLeft: 16,
                  paddingRight: 16,
                  paddingTop: 8,
                  paddingBottom: 8
                }}
              /> */}
            </View>
          </View>
          {!quantity ? (
            <View>
              <Button
                onPress={() => this.handleAdd(this.props.id)}
                title='ADD '
                color='#76ba1b'
              />
            </View>
          ) : (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => this.handleAdd(this.props.id)}>
                <View>
                  <Icon name='ios-add-circle' type='ionicon' color='#aaa' />
                </View>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 21,
                  // fontWeight: 'bold',
                  color: '#333'
                }}
              >
                {quantity}
              </Text>
              <TouchableOpacity
                onPress={() => this.handleRemove(this.props.id)}
              >
                <View>
                  <Icon name='ios-remove-circle' type='ionicon' color='#aaa' />
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItem)
