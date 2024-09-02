import { defineConfig } from "cypress";
let productDetails: string

export default defineConfig({
    viewportHeight: 1080,
    viewportWidth: 1920,
    retries: {
        runMode: 1,
        openMode: 0
    },
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    reporter: 'mochawesome',
    reporterOptions: {
        reportDir: 'cypress/reports',
        overwrite: false,
        html: false,
        json: true
    },
    e2e: {
        baseUrl: "https://magento.softwaretestingboard.com",
        specPattern: ["cypress/specs/**/*.{cy,js,ts,spec}"],
        supportFile: 'cypress/support/e2e.ts',
        screenshotsFolder: "cypress/screenshots",

        setupNodeEvents(on, config) {

            //getter and setter for data stored in node process 
            on('task', {
                storeDetails: (value: any) => {
                    return (productDetails = value)
                },
                getDetails: () => {
                    return productDetails
                },
            })

            on('before:browser:launch', (browser, launchOptions) => {
                launchOptions.args.push('--disable-dev-shm-usage');
                return launchOptions;
            })
        },

    },
})