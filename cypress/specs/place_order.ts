import { Checkout } from "../page-object-model/Checkout";
import { Login } from "../page-object-model/Login";
import { Navigation } from "../page-object-model/Navigation";
import { CY_ROUTES } from "../support/routes";

const login = new Login();
const navigation = new Navigation();
const checkout = new Checkout();

beforeEach(() => {
    cy.visit('/');
    cy.visit(CY_ROUTES.get('Sign In'));
});

describe('Place order flows', () => {

    it('Place order with 1 item', () => {
        login.fillLoginForm();
        login.signIn();
        navigation.navigateStoreMenu('#ui-id-6', '#ui-id-27');
        navigation.selectProduct(8);
        checkout.addToCart();
    })
})