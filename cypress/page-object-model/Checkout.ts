import { ADD_TO_CART_BUTTON } from "../support/constants";

export class Checkout {

    addToCart(): void{
        cy.get(ADD_TO_CART_BUTTON).click();
    }
}