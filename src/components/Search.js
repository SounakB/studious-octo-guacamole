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
import { NavigationActions } from 'react-navigation'
import CartButton from './common/CartButton'
import { Input, Icon } from 'react-native-elements'
import RestaurantItem from './RestaurantItem'
import restaurantsData from '../api/restaurants.json'

export default class Search extends React.Component {
  constructor (props) {
    super(props)
  }
  state = {
    search: ''
  }
  searchText = text => {
    this.setState({
      search: text
    })
  }

  handleNaviagation = () => {
    this.props.navigation.navigate(
      NavigationActions.navigate({
        routeName: 'HomeStack',
        action: NavigationActions.navigate({
          routeName: 'Dishes'
        })
      })
    )
  }

  static navigationOptions = ({ navigation }: NavigationScreenProps) => {
    return {
      headerTitle: 'Search',
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        backgroundColor: '#fff'
      },
      headerRight: (
        <CartButton
          onPress={() => {
            navigation.navigate(
              NavigationActions.navigate({
                routeName: 'HomeStack',
                action: NavigationActions.navigate({
                  routeName: 'Cart'
                })
              })
            )
          }}
        />
      )
    }
  }
  render () {
    var searchedData = []
    if (this.state.search.length > 0) {
      searchedData = restaurantsData.filter(res => {
        if (res.name.search(this.state.search) != -1 || res.cuisine == this.state.search) {
          return true
        }
      })
    }
    return (
      <View style={styles.container}>
        <Input
          placeholder='Search by restuarants or cuisines type'
          leftIcon={{ type: 'ionicons', name: 'search' }}
          autoFocus
          onChangeText={text => this.searchText(text)}
        />
        <FlatList
          data={searchedData}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <RestaurantItem
              name={item.name}
              image={item.image}
              cuisine={item.cuisine}
              location={item.location}
              isVegetarian={item.isVegetarian}
              rating={item.rating}
              deliveryTime={item.deliveryTime}
              handleNaviagation={this.handleNaviagation}
            />
          )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 4,
    marginBottom: 8,
    flex: 1
  }
})
