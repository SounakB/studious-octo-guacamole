import React, { Component } from 'react'
// import Orientation, { orientation } from "react-native-orientation";
import AppContainer from './app/navigator/Navigator'
import { createAppContainer } from 'react-navigation'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './src/reducers/index'

const store = createStore(rootReducer);

export default class App extends Component {
  addToCart = dish => {
    var arr = this.state.cart
    arr.push(dish)
    this.setState({
      cart: arr
    })
  }
  /*
  componentDidMount = () => {
    //Orientation.lockToPortrait();
  };
*/

  render () {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
    // createAppContainer()
  }
}
