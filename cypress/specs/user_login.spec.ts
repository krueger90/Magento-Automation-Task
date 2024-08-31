import { Asserts } from "../asserts/Asserts";
import { Login } from "../page-object-model/Login";
import { CY_ROUTES } from "../support/routes";
import 'cypress-network-idle';

const login = new Login();
// const genericAsserts = new GenericAsserts();
const assert = new Asserts(); 

beforeEach(() => {
    cy.visit('/');
    cy.visit(CY_ROUTES.get('Sign In'));
});

describe('Login', () => {

    it('Login user', () => {
        login.fillLoginForm();
        login.signIn();
        assert.assertUrlContains("/customer/account/");
        cy.waitForNetworkIdle('+(POST|GET)', '*', 800, { log: false });
        cy.fixture('loginUserData').then(loginUserData => {
            assert.assertCustomerWelcome(loginUserData.firstName, loginUserData.lastName);
        })
    })

    it('Try to login with incorrect credentials', () => {
        login.fillLoginFormWithIncorrectData();
        login.signIn();
        assert.assertMessage('[data-ui-id=message-error]', 'The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.');
    })
})