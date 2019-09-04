import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Button,
  TouchableOpacity
} from 'react-native'
import { Icon } from 'react-native-elements'
import CustomText from '../components/common/CustomText'
// import Constants from "../utils/constants";

export default class RestaurantItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isClicked: false
    }
  }
  handleClick = () => {
    this.setState({
      isClicked: !this.state.isClicked
    })
    this.props.handleNaviagation()
  }
  render () {
    
    return (
      <TouchableOpacity onPress={this.handleClick}>
        <View
          style={{
            marginHorizontal: 24,
            marginVertical: 8,
            borderRadius: 6,
            height: '100%',
            flexDirection: 'row',
            flex: 1,
            backgroundColor: 'white'
          }}
        >
          <Image
            style={{
              // position: "absolute",
              width: 100,
              height: 100,
              justifyContent: 'center',
              borderRadius: 0
            }}
            source={{ uri: this.props.image }}
          />

          <View
            style={{
              padding: 16,
              // position: "absolute",
              width: '100%',
              height: '100%',
              bottom: 0,
              // backgroundColor: "white",
              borderRadius: 6
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: '#333'
              }}
            >
              {this.props.name}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#555'
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
                color: '#222'
              }}
            >
              {this.props.location}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                
                //justifyContent: 'space-around'
                // width: "100%"
              }}
            >
              <View
              style={{
                flexDirection: 'row',
                //justifyContent: 'space-between'
                // width: "100%"
              }}>
                <Icon name='ios-star' type='ionicon' color='#aaa' size={15} />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: '#aaa'
                  }}
                >
                  {'  '}{this.props.rating}
                </Text>
                
              </View>
              <View
              style={{
                flexDirection: 'row',
                marginLeft: 18
                //justifyContent: 'space-between'
                // width: "100%"
              }}>
                <Icon name='ios-time' type='ionicon' color='#aaa' size={15} />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: '#aaa'
                  }}
                >
                  {' '}{this.props.deliveryTime}minutes
                </Text>
                
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({})
