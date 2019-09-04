const initialState = {
  cart: [],
  cartCount: 0,
  filterbtn_color: '#fff',
  sortbtn_color: 'transparent',
  filterHidden: false,
  sortHidden: true,
  filterlist: [],
  sortBy: null
}
function rootReducer (state = initialState, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      for (var i = 0; i < state.cart.length; i++) {
        if (state.cart[i]['id'] == action.payload) {
          var newCart = [...state.cart]
          newCart[i]['quantity'] = newCart[i]['quantity'] + 1
          return Object.assign({}, state, {
            cartCount: state.cartCount + 1,
            cart: newCart
          })
        }
      }
      return Object.assign({}, state, {
        cartCount: state.cartCount + 1,
        cart: [...state.cart, { id: action.payload, quantity: 1 }]
      })
      break
    case 'REMOVE_ITEM':
      for (var i = 0; i < state.cart.length; i++) {
        if (state.cart[i]['id'] == action.payload) {
          var newCart = [...state.cart]
          if (state.cart[i]['quantity'] > 1) {
            newCart[i]['quantity'] = newCart[i]['quantity'] - 1
          } else {
            newCart.splice(i, 1)
          }
          return Object.assign({}, state, {
            cartCount: state.cartCount - 1,
            cart: newCart
          })
        }
      }
      break
    case 'CHANGE_FILTER':
      var arr = this.state.filterlist
      if (arr.includes(category)) {
        arr = arr.filter(item => item !== category)
        // console.log('filter removed \n' + arr)
      } else {
        arr.push(category)
        // console.log('filter added \n' + arr)
      }
      return Object.assign({}, state, {
        filterlist: arr
      })

      break
    default:
      return state
  }
}
export default rootReducer
