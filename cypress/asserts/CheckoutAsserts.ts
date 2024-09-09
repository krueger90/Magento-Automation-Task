import { CHECKOUT_PRODUCT_NAME, CHECKOUT_PRODUCT_PRICE, CHECKOUT_PRODUCT_QUANTITY, CHECKOUT_SUCCESS_TEXT, MINICART_ITEMS, ORDER_SUMMARY_PRICE, ORDER_SUMMARY_SHIPPING_TAX, ORDER_SUMMARY_TABLE, ORDER_SUMMARY_TOTAL, SHIPPING_STEP_ADDRESS_FORM, SUBTOTAL_SECTION } from "../support/constants";

export class CheckoutAsserts {

    assertNameInShippingStep(selectorFirstName: string, selectorLastName: string, firstName: string, lastName: string): void {
        cy.get(SHIPPING_STEP_ADDRESS_FORM).find(selectorFirstName)
            .invoke('val').should('contain', firstName);
        cy.get(SHIPPING_STEP_ADDRESS_FORM).find(selectorLastName)
            .invoke('val').should('contain', lastName);
    }

    assertProductDetails(): void {
        cy.task('getCartItems').then((storedCartData) => {
            cy.get(MINICART_ITEMS).each(($productItem, index) => {
                const productName = $productItem.find(CHECKOUT_PRODUCT_NAME).text().trim();

                const productQuantity = parseInt($productItem.find(CHECKOUT_PRODUCT_QUANTITY).text().trim());

                const productPrice = $productItem.find(CHECKOUT_PRODUCT_PRICE).text().replace('$', '').trim();

                const storedItem = storedCartData[index];

                expect(storedItem.name).to.equal(productName);
                expect(storedItem.quantity).to.equal(productQuantity);
                if (productQuantity > 1) {
                    expect(storedItem.subTotal).to.equal(productPrice);
                } else {
                    expect(storedItem.price).to.equal(productPrice);
                }
            });
        })
    }

    assertOrderSummary(): void {
        // let shippingTax = 0;

        // cy.task('getShippingTax').then(tax => {
        //     cy.task('getCartItems').then(storedCartData => {
        //         let calculatedSubTotal = 0;

        //         storedCartData.forEach((item) => {
        //             calculatedSubTotal += parseFloat(item.subTotal);
        //         });
        //         calculatedSubTotal = parseFloat(calculatedSubTotal.toFixed(2));
        //         cy.get(ORDER_SUMMARY_TABLE).within(() => {
        //             cy.get(ORDER_SUMMARY_PRICE).first().invoke('text').then((text) => {
        //                 const displayedSubTotal = text.replace('$', '').trim();
        //                 expect(displayedSubTotal).to.equal(calculatedSubTotal);
        //             });

        //             cy.get(ORDER_SUMMARY_SHIPPING_TAX).invoke('text').then((text) => {
        //                 shippingTax = parseFloat(text.replace('$', '').trim());
        //                 expect(shippingTax).to.equal(parseFloat(tax.replace('$', '').trim()));
        //             });

        //             cy.get(ORDER_SUMMARY_TOTAL).invoke('text').then((text) => {
        //                 const orderTotal = calculatedSubTotal + shippingTax;
        //                 const displayedGrandTotal = parseFloat(text.replace('$', '').trim());
        //                 expect(displayedGrandTotal).to.equal(orderTotal);
        //             });
        //         });
        //     });
        // });
        let shippingTax = 0;

    cy.task('getShippingTax').then(tax => {
        cy.task('getCartItems').then(storedCartData => {
            let calculatedSubTotal = 0;

            // Parse and sum each subTotal as a float to preserve decimals
            storedCartData.forEach((item) => {
                calculatedSubTotal += parseFloat(item.subTotal); // Ensure subTotal is always treated as a float
            });

            // Use toFixed(2) to preserve two decimal places
            const formattedCalculatedSubTotal = calculatedSubTotal.toFixed(2);

            cy.get(ORDER_SUMMARY_TABLE).within(() => {
                // Assert subtotal
                cy.get(ORDER_SUMMARY_PRICE).first().invoke('text').then((text) => {
                    const displayedSubTotal = parseFloat(text.replace('$', '').trim()).toFixed(2); // Ensure displayed subtotal is a float
                    expect(displayedSubTotal).to.equal(formattedCalculatedSubTotal);
                });

                // Assert shipping tax
                cy.get(ORDER_SUMMARY_SHIPPING_TAX).invoke('text').then((text) => {
                    shippingTax = parseFloat(text.replace('$', '').trim());
                    expect(shippingTax).to.equal(parseFloat(tax.replace('$', '').trim()));
                });

                // Assert grand total
                cy.get(ORDER_SUMMARY_TOTAL).invoke('text').then((text) => {
                    const orderTotal = (calculatedSubTotal + shippingTax).toFixed(2); // Calculate order total and format
                    const displayedGrandTotal = parseFloat(text.replace('$', '').trim()).toFixed(2);
                    expect(displayedGrandTotal).to.equal(orderTotal);
                });
            });
        });
    });
    }

    assertCheckoutSuccess(): void {
        cy.get(CHECKOUT_SUCCESS_TEXT).should('have.text', 'Thank you for your purchase!');
    }
}