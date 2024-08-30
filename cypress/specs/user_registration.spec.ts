import { assertUrlContains } from "../asserts/generic-asserts";
import { assertRegistrationSuccessMessage } from "../asserts/registration-asserts";
import { RegisterUser } from "../page-object-model/RegisterUser";

const registerUser = new RegisterUser();


beforeEach(() => {
    cy.visit('/');
});

describe('Register User', () => {

    it('Navigate to the "Create an Account" page and register the user', () => {
        cy.visit('/customer/account/create/');
        registerUser.fillRegistrationForm();
        registerUser.createAccount();
        assertRegistrationSuccessMessage();
        assertUrlContains("/customer/account");
    });
});