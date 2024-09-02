import { ADD_TO_CART_BTN, CHECKOUT_PRODUCT_NAME, CHECKOUT_PRODUCT_PRICE, CHECKOUT_PRODUCT_QUANTITY, COUNTRY, MANDATORY_STATE, OPTIONAL_STATE, PHONE_NO, PRODUCT_NAME, PRODUCT_PRICE, PRODUCT_QUANTITY, REGION_FIELD, SHIPPING_ADDRESS_0, SHIPPING_CITY, ZIP } from "../support/constants";
import { faker, fakerRO } from "@faker-js/faker";

export class Checkout {

    addToCart(): void {
        cy.get(ADD_TO_CART_BTN).click();
    }

    // TODO: Find a way to make state selection dynamic, depending on the selected country
    fillShippingDetails(streetSelector: string, citySelector: string, stateSelector: string, zipSelector: string, countrySelector: string, phoneSelector: string, addressType?: string): void {
        if (addressType === "existing") {

        } else {
            cy.get(SHIPPING_ADDRESS_0).type(fakerRO.location.streetAddress());
            cy.get(COUNTRY).select('Romania');
            cy.get(SHIPPING_CITY).type('Arad');
            cy.get(MANDATORY_STATE).select('Arad');
            cy.get(ZIP).type(fakerRO.location.zipCode());
            cy.get(PHONE_NO).type(faker.phone.number());
        }
    }

    /**
     *Creates an object containing the product details 
     *and stores it in the Node process to be retrieved later  
     */
    saveProductDetails(): void {
        const productDetails = {
            productName: "",
            productPrice: "",
            productQuantity: ""
        }

        cy.get(PRODUCT_NAME).invoke('text').then(value => {
            productDetails.productName = value.trim();
        });
        cy.get(PRODUCT_PRICE).invoke('text').then(value => {
            productDetails.productPrice = value.trim();
        });
        cy.get(PRODUCT_QUANTITY).invoke('val').then(value => {
            productDetails.productQuantity = value.toString();
        });
        cy.task('storeDetails', productDetails);
    }

    compareProductDetails(): void {
        cy.task('getDetails').then(productDetails => {
            cy.get(CHECKOUT_PRODUCT_NAME).should('have.text', productDetails.productName);
            cy.get(CHECKOUT_PRODUCT_PRICE).should('have.text', productDetails.productPrice);
            cy.get(CHECKOUT_PRODUCT_QUANTITY).should('have.text', productDetails.productQuantity);
        })
    }
}
