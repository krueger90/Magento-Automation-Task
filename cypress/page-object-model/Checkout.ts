import { ADD_TO_CART_BTN, CHECKOUT_PRODUCT_PRICE, EXISTING_ADDRESS_SELECTED, NEW_ADDRESS_POPUP, ORDER_NUMBER, SAVE_ADDRESS_BTN, SAVE_ADDRESS_CHECKBOX, SHOPPING_CART_ITEM_NAME, SHOPPING_CART_ITEM_QTY, SHOPPING_CART_ITEM_SUBTOTAL, SHOPPING_CART_TABLE_ITEM_INFO, UPDATE_CART_BTN } from "../support/constants";
import { fakerRO } from "@faker-js/faker";

export class Checkout {

    addToCart(): void {
        cy.get(ADD_TO_CART_BTN).click();
    }

    // TODO: Find a way to make state selection dynamic, depending on the selected country
    fillShippingDetails(addressType: string, countrySelector?: string, citySelector?: string, stateSelector?: string, streetSelector?: string, zipSelector?: string, phoneSelector?: string): void {
        if (addressType === "existing") {
            cy.get(EXISTING_ADDRESS_SELECTED).should('be.visible');
            return;
        } else {
            cy.get(NEW_ADDRESS_POPUP).click();
            cy.get(countrySelector).select('Romania');

            cy.get(stateSelector).select('Arad');
            cy.get(citySelector).type('Arad');
            cy.get(streetSelector).type(fakerRO.location.streetAddress());
            cy.get(zipSelector).type(fakerRO.location.zipCode());
            cy.get(phoneSelector).type('+407250006008');
            cy.get(SAVE_ADDRESS_CHECKBOX).uncheck();
            cy.get(SAVE_ADDRESS_BTN).click();
        }
    }

    /**
     *Creates an object containing the product details 
     *and stores it in the Node process to be retrieved later  
     */
    saveCartDetails(): void {
        let cartData: any[] = [];

        cy.get(SHOPPING_CART_TABLE_ITEM_INFO).each(($row) => {
            cy.wrap($row).within(() => {
                cy.get(SHOPPING_CART_ITEM_QTY).invoke('val').then((val) => {
                    const productQuantity = parseInt(val.toString());

                    cy.get(SHOPPING_CART_ITEM_NAME).invoke('text').then((nameText) => {
                        const productName = nameText.trim();

                        cy.get(CHECKOUT_PRODUCT_PRICE).first().invoke('text').then((priceText) => {
                            const productPrice = priceText.replace('$', '').trim();

                            cy.get(SHOPPING_CART_ITEM_SUBTOTAL).invoke('text').then((subTotalText) => {
                                const productSubTotal = subTotalText.replace('$', '').trim();

                                const productDetails = {
                                    name: productName,
                                    price: productPrice,
                                    quantity: productQuantity,
                                    subTotal: productSubTotal
                                };

                                cartData.push(productDetails);
                            });
                        });
                    });
                });
            });
        }).then(() => {
            cy.task('setCartItems', cartData);
        });
    }

    saveShippingTax(): void {
        const tax = {
            shippingTax: ""
        }
        cy.waitForNetworkIdle('+(POST|GET)', '*', 2000, { log: false });
        cy.get('tbody tr').each((row) => {
            cy.wrap(row).find('td').then((cells) => {
                if (cells.length > 0) {
                    cy.task('storeShippingTax', tax.shippingTax = cells.eq(1).text().trim());
                }
            })
        })
    }

    saveOrderNumber(): void {
        const orderNo = {
            orderNumber: ""
        }
        cy.get(ORDER_NUMBER).invoke('text').then((text) => {
            cy.task('storeOrderNumber', orderNo.orderNumber = text);
        })
    }

    modifyQuantity(selector: string, quantity: string): void {
        cy.get(selector).click().clear().type(quantity);
    }

    clickUpdateCart(): void {
        cy.get(UPDATE_CART_BTN).click();
    }
}