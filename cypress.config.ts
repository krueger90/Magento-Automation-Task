import { defineConfig } from "cypress";
let productDetails: string
let tax: string
let orderNumber: string
let cartItems = [];

export default defineConfig({
    viewportHeight: 1080,
    viewportWidth: 1920,
    retries: {
        runMode: 1,
        openMode: 0
    },
    defaultCommandTimeout: 60000,
    pageLoadTimeout: 70000,
    reporter: 'mochawesome',
    reporterOptions: {
        reportDir: 'cypress/reports',
        overwrite: false,
        html: false,
        json: true
    },
    experimentalMemoryManagement: true,
    e2e: {
        baseUrl: "https://magento.softwaretestingboard.com",
        specPattern: ["cypress/specs/**/*.{cy,js,ts,spec}"],
        supportFile: 'cypress/support/e2e.ts',
        screenshotsFolder: "cypress/screenshots",

        setupNodeEvents(on, config) {

            //getter and setter for data stored in node process 
            on('task', {

                setCartItems: (items) => {
                    return cartItems = items;
                },
                getCartItems: () => {
                    return cartItems;
                },

                storeShippingTax: (value: any) => {
                    return (tax = value)
                },
                getShippingTax: () => {
                    return tax
                },
                storeOrderNumber: (value: any) => {
                    return (orderNumber = value)
                },
                getOrderNumber: () => {
                    return orderNumber
                }
            })

            on('before:browser:launch', (browser, launchOptions) => {
                if (browser.family === 'chromium') {
                    launchOptions.args.push('--no-sandbox', '--disable-dev-shm-usage', '--js-flags=--max-old-space-size=3500', '--disable-gpu');
                    return launchOptions;
                }
            })
        },

    },
})