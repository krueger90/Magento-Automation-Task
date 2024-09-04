import { Asserts } from "../asserts/Asserts";
import { CheckoutAsserts } from "../asserts/CheckoutAsserts";
import { Checkout } from "../page-object-model/Checkout";
import { Login } from "../page-object-model/Login";
import { Navigation } from "../page-object-model/Navigation";
import { CART_WIDGET_PROCEED_TO_CHECKOUT_BTN, COUNTRY, MANDATORY_STATE, PHONE_NO, SHIPPING_ADDRESS_0, SHIPPING_CITY, SHIPPING_FIRST_NAME, SHIPPING_LAST_NAME, ZIP } from "../support/constants";
import { CY_ROUTES } from "../support/routes";
import 'cypress-network-idle';

const login = new Login();
const navigation = new Navigation();
const checkout = new Checkout();
const assertCheckout = new CheckoutAsserts()
const assert = new Asserts();

beforeEach(() => {
    cy.visit('/');
    cy.visit(CY_ROUTES.get('Sign In'));
    login.fillLoginForm();
    login.signIn();
    navigation.clearCart();
});

describe('Place order flows', () => {

    it('Proceed to checkout, place order with 1 item, without a pre-existing shipping address', () => {
        cy.fixture('loginUserData').then((loginUserData)=>{
            // navigation.clearCart();
            cy.waitForNetworkIdle('+(POST|GET)', '*', 3000, { log: false });
            navigation.navigateStoreMenu('#ui-id-6', '#ui-id-27');
            navigation.selectProduct(8);
            checkout.saveProductDetails();
            checkout.addToCart();
            cy.waitForNetworkIdle('+(POST|GET)', '*', 2000, { log: false });
            navigation.openMiniCart();
            navigation.proceedToCheckout(CART_WIDGET_PROCEED_TO_CHECKOUT_BTN);
            cy.waitForNetworkIdle('+(POST|GET)', '*', 800, { log: false });
            assert.assertUrlContains('/checkout/#shipping');
            assertCheckout.assertNameInShippingStep(SHIPPING_FIRST_NAME,SHIPPING_LAST_NAME,loginUserData.firstName, loginUserData.lastName);
            checkout.fillShippingDetails(SHIPPING_ADDRESS_0,SHIPPING_CITY, MANDATORY_STATE, COUNTRY, ZIP, PHONE_NO);
            checkout.checkProductDetails();
        })

        it('View and edit cart, place order with same product, multiple quantity',()=>{

        })

        it('Place order with two different products',()=>{

        })

        
    })
})