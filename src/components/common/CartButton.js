import React from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {cartCount : state.cartCount}  ;
};

class CartButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleNavigate = this.handleNavigate.bind(this);
  }

  handleNavigate = () => {
    this.props.onPress();
  };

  render() {
    return (
      <TouchableOpacity onPress={this.handleNavigate}>
        <Image
          style={{ width: 32, height: 32, marginRight: 16 }}
          source={require("../../../assets/shopping-bag.png")}
        />
        <View
          style={{
            height: 20,
            width: 20,
            borderRadius: 10,
            backgroundColor: "#F98C00",
            position: "absolute",
            right: 8,
            top: 2
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 13,
              textAlign: "center",
              lineHeight: 20
            }}
          >
            {this.props.cartCount}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default connect(mapStateToProps)(CartButton);;
