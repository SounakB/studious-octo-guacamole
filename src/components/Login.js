import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import { Input, Button, Icon } from 'react-native-elements'
import CartButton from './common/CartButton'

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height

const BG_IMAGE = require('../../assets/bg_screen1.jpg')

export default class LoginScreen1 extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      email_valid: true,
      password: '',
      login_failed: false,
      showLoading: false
    }
  }

  handleNaviagation = () => {
    this.props.navigation.navigate('RegisterScreen')
  }

  static navigationOptions = ({ navigation }: NavigationScreenProps) => {
    return {
      headerTitle: 'Log In',
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

  validateEmail (email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return re.test(email)
  }

  submitLoginCredentials () {
    const { showLoading } = this.state

    this.setState({
      showLoading: !showLoading
    })
  }

  render () {
    const { email, password, email_valid, showLoading } = this.state

    return (
      <View style={styles.container}>
        {/* <ImageBackground source={BG_IMAGE} style={styles.bgImage}> */}
        <View style={styles.bgImage}>
          <KeyboardAvoidingView behavior='padding' enabled>
            <View style={styles.loginView}>
              <View style={styles.loginTitle}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.travelText}>Food</Text>
                  {/*<Text style={styles.plusText}>+</Text>*/}
                </View>
                <View style={{ marginTop: -10 }}>
                  <Text style={styles.travelText}>Delivery</Text>
                </View>
              </View>
              <View style={styles.loginInput}>
                <Input
                  leftIcon={
                    <Icon
                      name='user-o'
                      type='font-awesome'
                      color='rgba(171, 189, 219, 1)'
                      size={25}
                    />
                  }
                  containerStyle={{ marginVertical: 10 }}
                  onChangeText={email => this.setState({ email })}
                  value={email}
                  inputStyle={{ marginLeft: 10, color: '#666' }}
                  keyboardAppearance='light'
                  placeholder='Email'
                  autoFocus={false}
                  autoCapitalize='none'
                  autoCorrect={false}
                  keyboardType='email-address'
                  returnKeyType='next'
                  ref={input => (this.emailInput = input)}
                  onSubmitEditing={() => {
                    this.setState({ email_valid: this.validateEmail(email) })
                    this.passwordInput.focus()
                  }}
                  blurOnSubmit={false}
                  placeholderTextColor='#888'
                  errorStyle={{ textAlign: 'center', fontSize: 12 }}
                  errorMessage={
                    email_valid ? null : 'Please enter a valid email address'
                  }
                />
                <Input
                  leftIcon={
                    <Icon
                      name='lock'
                      type='font-awesome'
                      color='rgba(171, 189, 219, 1)'
                      size={25}
                    />
                  }
                  containerStyle={{ marginVertical: 10 }}
                  onChangeText={password => this.setState({ password })}
                  value={password}
                  inputStyle={{ marginLeft: 10, color: '#666' }}
                  secureTextEntry
                  keyboardAppearance='light'
                  placeholder='Password'
                  autoCapitalize='none'
                  autoCorrect={false}
                  keyboardType='default'
                  returnKeyType='done'
                  ref={input => (this.passwordInput = input)}
                  blurOnSubmit
                  placeholderTextColor='#888'
                />
              </View>
              <Button
                title='LOG IN'
                activeOpacity={1}
                underlayColor='transparent'
                onPress={this.submitLoginCredentials.bind(this)}
                loading={showLoading}
                loadingProps={{ size: 'small', color: '#888' }}
                disabled={!email_valid && password.length < 8}
                buttonStyle={{
                  height: 50,
                  width: 250,
                  backgroundColor: '#F98C00',
                  borderWidth: 2,
                  borderColor: '#F98C00',
                  borderRadius: 30
                }}
                containerStyle={{ marginVertical: 10 }}
                titleStyle={{ fontWeight: 'bold', color: 'white' }}
              />
              <View style={styles.footerView}>
                <Text style={{ color: 'grey' }}>New here?</Text>
                <Button
                  title='Create an Account'
                  type='clear'
                  activeOpacity={0.5}
                  titleStyle={{ color: '#555', fontSize: 15 }}
                  containerStyle={{ marginTop: -10 }}
                  onPress={() => this.handleNaviagation()}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
        {/* </ImageBackground> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginView: {
    marginTop: 150,
    backgroundColor: 'transparent',
    width: 250,
    height: 400
  },
  loginTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  travelText: {
    color: '#333',
    fontSize: 30
    // fontFamily: 'bold',
  },
  plusText: {
    color: 'white',
    fontSize: 30
    // fontFamily: 'regular',
  },
  loginInput: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerView: {
    marginTop: 10,
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
