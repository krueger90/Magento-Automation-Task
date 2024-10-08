import 'cypress-network-idle';
import { NEXT_BUTTON, PLACE_ORDER_BUTTON, PRODUCT_LIST } from '../support/constants';

export class Navigation {

    navigateStoreMenu(category: string, categorySection: string, categorySectionItem?: string): void {
        cy.get('#ui-id-2').children().find(category).trigger('mouseover')
        if (categorySectionItem == null) {
            cy.get(categorySection).click();
        } else {
            cy.get(categorySection).trigger('mouseover')
            cy.get(categorySectionItem).click();
        }
    }

    selectProduct(productPosition: number): void {
        cy.get(PRODUCT_LIST).children().eq(productPosition).click();
    }

    proceedToCheckout(button: string): void {
        cy.get(button).click();
    }

    viewAndEditCart(): void {
        cy.get('.viewcart').click({force: true});
    }

    openMiniCart(): void {
        cy.get('.showcart').click();
    }

    clearCart(): void {
        cy.waitForNetworkIdle('+(POST|GET)', '*', 3000, { log: false });

        cy.getAllLocalStorage().then((result) => {
            let cacheStorage = JSON.parse(result["https://magento.softwaretestingboard.com"]["mage-cache-storage"].valueOf().toString());
            let itemCount = cacheStorage["cart"]["summary_count"];

            if (itemCount > 0) {
                this.openMiniCart();
                this.viewAndEditCart();
                cy.get('tbody tr.item-actions').its('length').then(rows => {
                    Cypress._.times(rows, () => {
                        cy.get('tbody tr.item-actions').find('.action-delete').first().click();
                    })
                })
            }
        })
    }

    clickNextButton(): void {
        cy.get(NEXT_BUTTON).click();
    }

    clickPlaceOrderButton(): void {
        cy.get(PLACE_ORDER_BUTTON).click();
    }
}
