import { Asserts } from "../asserts/Asserts";
import { CheckoutAsserts } from "../asserts/CheckoutAsserts";
import { Checkout } from "../page-object-model/Checkout";
import { Login } from "../page-object-model/Login";
import { Navigation } from "../page-object-model/Navigation";
import { CART_ITEM_QTY, CART_PROCEED_TO_CHECKOUT_BTN, COUNTRY, MANDATORY_STATE, PHONE_NO, SHIPPING_ADDRESS_0, SHIPPING_CITY, SHIPPING_FIRST_NAME, SHIPPING_LAST_NAME, ZIP } from "../support/constants";
import { CY_ROUTES } from "../support/routes";
import 'cypress-network-idle';

const login = new Login();
const navigation = new Navigation();
const checkout = new Checkout();
const assertCheckout = new CheckoutAsserts()
const assert = new Asserts();
const addressType = ["new", "existing"];

beforeEach(() => {
    cy.visit('/');
    cy.visit(CY_ROUTES.get('Sign In'));
    login.fillLoginForm();
    login.signIn();
    navigation.clearCart();
});

describe('Place order with both new and existing address', () => {

    addressType.forEach((addrType) => {

        it('Place order with 1 item, a pre-existing and new shipping address', () => {
            cy.fixture('loginUserData').then((loginUserData) => {
                cy.waitForNetworkIdle('+(POST|GET)', '*', 3000, { log: false });
                navigation.navigateStoreMenu('#ui-id-6', '#ui-id-27');
                navigation.selectProduct(8);
                checkout.addToCart();
                cy.waitForNetworkIdle('+(POST|GET)', '*', 2000, { log: false });
                navigation.openMiniCart();
                navigation.viewAndEditCart();
                cy.waitForNetworkIdle('+(POST|GET)', '*', 3000, { log: false });
                checkout.saveCartDetails();
                navigation.proceedToCheckout(CART_PROCEED_TO_CHECKOUT_BTN);
                cy.waitForNetworkIdle('+(POST|GET)', '*', 800, { log: false });
                assert.assertUrlContains('/checkout/#shipping');
                assertCheckout.assertNameInShippingStep(SHIPPING_FIRST_NAME, SHIPPING_LAST_NAME, loginUserData.firstName, loginUserData.lastName);
                checkout.fillShippingDetails(addrType, COUNTRY, SHIPPING_CITY, MANDATORY_STATE, SHIPPING_ADDRESS_0, ZIP, PHONE_NO);
                checkout.saveShippingTax();
                navigation.clickNextButton();
                assertCheckout.assertProductDetails();
                assertCheckout.assertOrderSummary();
                navigation.clickPlaceOrderButton();
                assert.assertUrlContains('/checkout/onepage/success/');
                assertCheckout.assertCheckoutSuccess();
                checkout.saveOrderNumber();
            })
        })
    })
})