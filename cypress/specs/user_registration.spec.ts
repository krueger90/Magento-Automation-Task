import { Asserts } from "../asserts/Asserts";
import { RegisterUser } from "../page-object-model/Register";
import { CY_ROUTES } from "../support/routes";
import 'cypress-network-idle';
import { USERS } from '../support/generate-user';

const registerUser = new RegisterUser();
const assert = new Asserts();

before(() => {
    cy.writeFile('cypress/fixtures/registerUserData.json', USERS);
})

beforeEach(() => {
    cy.visit('/');
    cy.visit(CY_ROUTES.get('Create an Account'));
});

describe('Register User', () => {

    it('Navigate to the "Create an Account" page and register the user', () => {
        registerUser.fillRegistrationForm();
        registerUser.createAccount();
        assert.assertMessage('[data-ui-id=message-success]', 'Thank you for registering with Main Website Store.');
        assert.assertUrlContains("/customer/account/");
        cy.waitForNetworkIdle('+(POST|GET)', '*', 800, { log: false });
        cy.fixture('registerUserData').then(registerUserData => {
            assert.assertCustomerWelcome(registerUserData[0].firstName, registerUserData[0].lastName);
        })
    });

    it('Try to create account with existing email address', () => {
        registerUser.fillRegistrationFormWithExistingAccount();
        registerUser.createAccount();
        assert.assertMessage('[data-ui-id=message-error]', 'There is already an account with this email address. ');
        assert.assertUrlContains("/customer/account/create/");
    })
});