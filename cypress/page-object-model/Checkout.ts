import { ADD_TO_CART_BTN } from "../support/constants";

export class Checkout {

    addToCart(): void{
        cy.get(ADD_TO_CART_BTN).click();
    }
}