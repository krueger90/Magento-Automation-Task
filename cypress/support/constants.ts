/**
 * Registration form inputs
 * @constant
 */
export const REG_FIRST_NAME_INPUT = '#firstname';
export const REG_LAST_NAME_INPUT = '#lastname';
export const REG_EMAIL_ADDRESS_INPUT = '#email_address';
export const REG_PASSWORD_INPUT = '#password';
export const REG_CONFIRM_PASSWORD_INPUT = '#password-confirmation';

/**
 * Login form inputs
 * @constant
 */
export const LOGIN_EMAIL_ADDRESS_INPUT = '#email';
export const LOGIN_PASSWORD_INPUT = '#pass';

/**
 * Checkout flow related elements
 * @constant
 */
export const ADD_TO_CART_BTN = '#product-addtocart-button';
export const CART_PROCEED_TO_CHECKOUT_BTN = '[data-role="proceed-to-checkout"]';
export const SHIPPING_FIRST_NAME = '[name="firstname"]';
export const SHIPPING_LAST_NAME = '[name="lastname"]';
export const SHIPPING_ADDRESS_0 = '[name="street[0]"]';
export const SHIPPING_CITY = '[name="city"]';
export const OPTIONAL_STATE = '[name="region"]';
export const MANDATORY_STATE = '[name="region_id"]';
export const ZIP = '[name="postcode"]';
export const COUNTRY = '[name="country_id"]';
export const PHONE_NO = '[name="telephone"]';
export const REGION_FIELD = '[name="shippingAdress.region"]'; 
export const NEXT_BUTTON = '[data-role="opc-continue"]';
export const PLACE_ORDER_BUTTON = '.action.primary.checkout';
export const CART_ITEM_QTY = '[data-role="cart-item-qty"]';
export const SHIPPING_STEP_ADDRESS_FORM = '#shipping-new-address-form';
export const MINICART_ITEMS = '.minicart-items .product-item';
export const  SUBTOTAL_SECTION = 'div.subtotal > span > span > span';
export const ORDER_SUMMARY_TABLE = '#opc-sidebar > div.opc-block-summary > table';
export const ORDER_SUMMARY_PRICE = '.sub > .amount > .price';
export const ORDER_SUMMARY_SHIPPING_TAX = '.shipping > .amount > .price';
export const ORDER_SUMMARY_TOTAL = '.grand > .amount';
export const CHECKOUT_SUCCESS_TEXT = '.page-title > .base';
export const EXISTING_ADDRESS_SELECTED = '.shipping-address-item.selected-item';
export const NEW_ADDRESS_POPUP = '.new-address-popup > .action';
export const SAVE_ADDRESS_CHECKBOX = '#shipping-save-in-address-book'
export const SAVE_ADDRESS_BTN = '.action.primary.action-save-address';
export const SHOPPING_CART_TABLE_ITEM_INFO = '#shopping-cart-table > tbody > tr.item-info';
export const ORDER_NUMBER = '.order-number > strong';
export const UPDATE_CART_BTN = 'button.action.update';

/**
 * Product details elements
 * @constant
 */
export const PRODUCT_NAME = '[class="page-title"]' ;
export const PRODUCT_PRICE = '.price-box.price-final_price';
export const PRODUCT_QUANTITY = '#qty';
export const CHECKOUT_PRODUCT_NAME = '.product-item-name';
export const CHECKOUT_PRODUCT_PRICE = '.cart-price .price';
export const CHECKOUT_PRODUCT_QUANTITY = '.details-qty .value';
export const SHOPPING_CART_ITEM_QTY = 'td.col.qty > div > div > label > input.input-text.qty';
export const SHOPPING_CART_ITEM_NAME = '.product-item-name';
export const SHOPPING_CART_ITEM_PRICE = '.price';
export const SHOPPING_CART_ITEM_SUBTOTAL = 'td.col.subtotal > span > span > span';
export const PRODUCT_LIST = 'ol.products.list.items.product-items';