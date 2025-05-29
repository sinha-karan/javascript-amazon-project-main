import { renderOrderSummary,updateCartQuantity  } from "../../Scripts/checkout/orderSummary.js";
import {loadFromStorage} from "../../data/cartAmazon.js";
import { loadProducts, loadProductsFetch } from "../../data/allProducts.js";

describe('test suite: renderOrderSummary', () => {
  beforeAll((done) => {
    loadProductsFetch().then(() => {
      done();
    });
    
  });

  it('displays the cart', () => {
    document.querySelector('.js-test-container').innerHTML =
     `<div class="js-test-container">
      <div class = "js-order-summary"></div>
      <a class="js-return-to-home-link"></a>
      </div>`;

    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
    const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d"
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      },{
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    });

    loadFromStorage();

    renderOrderSummary();

    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);

    document.querySelector('.js-test-container').innerHTML ='';
  });
});