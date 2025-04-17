export const cart = [];

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
      quantity: 1
    });
  }
}