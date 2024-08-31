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
        cy.get('ol.products.list.items.product-items').children().eq(productPosition).click();
    }

    proceedToCheckout(): void {

    }

    viewAndEditCart(): void {

    }

}