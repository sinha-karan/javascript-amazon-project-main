export let cart;

loadFromStorage();

export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart'));

  if (!cart) {
    cart = [{
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: '1'
    },{
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: '2'
    }];
  }
}


function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productID){
  // To not put duplicate product, but to increase the quantity if same product came
  let matchingItem;
      
  cart.forEach((cartItem) => {
    if(productID === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else{ 
    cart.push({
      productId: productID,
      quantity: 1, 
      deliveryOptionId: '2'
    });
  }

  saveToStorage();
}

export function removeFromCart(productID) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productID) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

export function updateDeliveryOption(productID, deliveryOptionId){
  let matchingItem;
      
  cart.forEach((cartItem) => {
    if(productID === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log(xhr.response);

    fun();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart ');
  xhr.send();
}
