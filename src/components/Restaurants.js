import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableWithoutFeedback
  // CheckBox
} from 'react-native'
import { CheckBox } from 'react-native-elements'
// import { Icon } from 'react-native-elements'
import restaurantsData from '../api/restaurants.json'
import RestaurantItem from './RestaurantItem'
import CartButton from './common/CartButton'
import { Font } from 'expo'
import Icon from 'react-native-vector-icons/Ionicons'
import { Ionicons } from '@expo/vector-icons'
import MyView from '../../app/components/MyView.js'

export default class Restaurants extends React.Component {
  constructor (props) {
    super(props)
  }
  state = {
    modalVisible: false,
    // btn_color: {
    filterbtn_color: '#fff',
    sortbtn_color: 'transparent',
    filterHidden: false,
    sortHidden: true,
    filterlist: [],
    sortBy: 'rating'
    // }
  }

  setModalVisible (visible) {
    this.setState({ modalVisible: visible })
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Restaurants',
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        backgroundColor: '#fff'
      },
      headerRight: (
        <CartButton
          onPress={() => {
            navigation.navigate('Cart')
          }}
        />
      )
    }
  }
  handleNaviagation = () => {
    this.props.navigation.navigate('Dishes')
  }
  changeColor = btn_type => {
    if (btn_type !== undefined) {
      this.setState({
        filterbtn_color: 'transparent',
        sortbtn_color: 'transparent',
        filterHidden: true,
        sortHidden: true
      })
      btn_name = btn_type + 'btn_color'
      box_name = btn_type + 'Hidden'
      this.setState({
        [box_name]: false,
        [btn_name]: '#fff'
      })
      console.log('State: \n')
      console.log(this.state)
    }

    // console.table(this.state)
  }
  toogleFilter = category => {
    var arr = this.state.filterlist
    if (arr.includes(category)) {
      arr = arr.filter(item => item !== category)
      // console.log('filter removed \n' + arr)
    } else {
      arr.push(category)
      // console.log('filter added \n' + arr)
    }
    this.setState({
      filterlist: arr
    })
  }
  render () {
    if (this.state.filterlist.length > 0) {
      filteredData = restaurantsData.filter(res => {
        if (this.state.filterlist.includes(res.cuisine)) {
          return true
        }
      })
    } else {
      filteredData = restaurantsData
    }
    sortBy = this.state.sortBy
    if (this.state.sortBy == 'rating') {
      filteredData.sort(function (a, b) {
        return b.rating - a.rating
      })
    } else if (this.state.sortBy == 'deliveryTime') {
      filteredData.sort(function (a, b) {
        return a.deliveryTime - b.deliveryTime
      })
    }

    return (
      <View style={styles.container}>
        <View style={{ marginTop: 0 }}>
          <Modal
            animationType='slide'
            transparent
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'column-reverse',
                justifyContent: 'flex-start',
                alignItems: 'center',
                backgroundColor: 'rgba(52, 52, 52, 0.5)'
              }}
            >
              <View
                style={{
                  height: 300,
                  alignSelf: 'stretch',
                  backgroundColor: '#eee'
                }}
                transparent={false}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ filterlist: [] })
                      // this.setModalVisible(!this.state.modalVisible)
                    }}
                    style={[styles.modalTouchable, { flexDirection: 'row' }]}
                  >
                    <Icon
                      name='ios-close-circle'
                      style={styles.modalTouchableText}
                      type='ionicon'
                      color='#333'
                    />
                    <Text style={styles.modalTouchableText}> Clear All</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible)
                    }}
                    style={
                      (styles.modalTouchable,
                      {
                        backgroundColor: '#F99C00',
                        paddingHorizontal: 8,
                        justifyContent: 'center'
                      })
                    }
                  >
                    <Text style={{ fontSize: 18, color: 'white' }}>Apply</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start'
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      alignItems: 'stretch'
                    }}
                  >
                    <TouchableOpacity
                      style={[
                        styles.modalTouchable,
                        { backgroundColor: this.state.filterbtn_color }
                      ]}
                      // style={{backgroundColor: this.state.filterbtn_color}}
                      onPress={() => {
                        this.changeColor('filter')
                      }}
                    >
                      <Text style={styles.modalTouchableText}>Filter</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.modalTouchable,
                        { backgroundColor: this.state.sortbtn_color }
                      ]}
                      // style={{backgroundColor: this.state.filterbtn_color}}
                      onPress={() => {
                        this.changeColor('sort')
                      }}
                    >
                      <Text style={styles.modalTouchableText}>Sort</Text>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      flex: 4,
                      backgroundColor: '#fff',
                      alignSelf: 'stretch',
                      flexWrap: 'wrap'
                    }}
                  >
                    <MyView hide={this.state.filterHidden}>
                      <View
                        style={{
                          alignSelf: 'stretch',
                          flexDirection: 'row',
                          justifyContent: 'space-around'
                        }}
                      >
                        <CheckBox
                          title='Bengali'
                          checkedColor='orange'
                          checked={this.state.filterlist.includes('Bengali')}
                          onPress={() => this.toogleFilter('Bengali')}
                        />

                        <CheckBox
                          title='Punjabi'
                          checkedColor='orange'
                          checked={this.state.filterlist.includes('Punjabi')}
                          onPress={() => this.toogleFilter('Punjabi')}
                        />
                      </View>

                      <View
                        style={{
                          alignSelf: 'stretch',
                          flexDirection: 'row',
                          justifyContent: 'space-around'
                        }}
                      >
                        <CheckBox
                          title='North Indian'
                          checkedColor='orange'
                          checked={this.state.filterlist.includes(
                            'North Indian'
                          )}
                          onPress={() => this.toogleFilter('North Indian')}
                        />

                        <CheckBox
                          title='South Indian'
                          checkedColor='orange'
                          checked={this.state.filterlist.includes(
                            'South Indian'
                          )}
                          onPress={() => this.toogleFilter('South Indian')}
                        />
                      </View>

                      <View
                        style={{
                          alignSelf: 'stretch',
                          flexDirection: 'row',
                          justifyContent: 'space-around'
                        }}
                      >
                        <CheckBox
                          title='Chineese'
                          checkedColor='orange'
                          checked={this.state.filterlist.includes('Chineese')}
                          onPress={() => this.toogleFilter('Chineese')}
                        />

                        <CheckBox
                          title='Italian'
                          checkedColor='orange'
                          checked={this.state.filterlist.includes('Italian')}
                          onPress={() => this.toogleFilter('Italian')}
                        />
                      </View>
                    </MyView>
                    <MyView
                      style={{
                        flexDirection: 'row'
                      }}
                      hide={this.state.sortHidden}
                    >
                      <CheckBox
                        center
                        title='Rating'
                        checkedColor='orange'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={this.state.sortBy == 'rating'}
                        onPress={() => {
                          this.setState({ sortBy: 'rating' })
                          console.log(this.state)
                        }}
                      />

                      <CheckBox
                        center
                        title='Delivery Time'
                        checkedColor='orange'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={this.state.checked}
                        checked={this.state.sortBy == 'deliveryTime'}
                        onPress={() => {
                          this.setState({ sortBy: 'deliveryTime' })
                          console.log(this.state)
                        }}
                      />
                    </MyView>
                  </View>
                </View>
              </View>
            </View>
          </Modal>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignSelf: 'stretch',
              padding: 10,
              backgroundColor: 'rgba(42, 42, 42, 0.1)'
            }}
          >
            <Text>{filteredData.length} Restaurants</Text>

            <TouchableOpacity
              onPress={() => {
                this.setModalVisible(true)
              }}
              transparent={false}
              style={{ flexDirection: 'row' }}
            >
              <Icon name='md-funnel' style={styles.icon}>
                <Text> Sort / Filter </Text>
              </Icon>
              {this.state.filterlist.length > 0 ? (
                <Icon
                  name='md-radio-button-on'
                  style={(styles.icon, { color: 'green' })}
                />
              ) : (
                <View />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView>
          <FlatList
            data={filteredData}
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
        </ScrollView>
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
  },
  icon: {
    fontSize: 16
  },
  sub: {
    backgroundColor: 'rgba(52, 52, 52, 0.1)'
    // margin: 5
  },
  subTouch: {
    fontSize: 12
  },
  modalTouchable: {
    padding: 5,
    // borderWidth: 0.5,
    borderBottomColor: '#d6d7da',
    borderBottomWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalTouchableText: {
    fontSize: 18
  },
  checkBox: {
    margin: 10,
    flexDirection: 'row',
    flex: 1,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
