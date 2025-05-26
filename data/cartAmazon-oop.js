function Cart(localStorageKey){
    const cart = {
    cartItems: undefined,

    loadFromStorage: function() {
    this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));

      if (!this.cartItems) {
        this.cartItems = [{
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: '1'
        },{
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: '2'
        }];
      }
  },

    saveToStorage: function() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
  },

    addToCart: function(productID){
      // To not put duplicate product, but to increase the quantity if same product came
      let matchingItem;
          
      this.cartItems.forEach((cartItem) => {
        if(productID === cartItem.productId){
          matchingItem = cartItem;
        }
      });

      if (matchingItem) {
        matchingItem.quantity += 1;
      } else{ 
        this.cartItems.push({
          productId: productID,
          quantity: 1, 
          deliveryOptionId: '2'
        });
      }

      this.saveToStorage();
  },

    removeFromCart: function(productID) {
      const newCart = [];

      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productID) {
          newCart.push(cartItem);
        }
      });

      this.cartItems = newCart;

      this.saveToStorage();
  },

    updateDeliveryOption: function(productID, deliveryOptionId){
      let matchingItem;
          
      this.cartItems.forEach((cartItem) => {
        if(productID === cartItem.productId){
          matchingItem = cartItem;
        }
      });

      matchingItem.deliveryOptionId = deliveryOptionId;

      this.saveToStorage();
    }
  };

  return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');


cart.loadFromStorage();

businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);
