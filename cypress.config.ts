import { defineConfig } from "cypress";

const config = {
    chromeWebSecurity: false,
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
    }
};

config.e2e = {
    baseUrl: "https://magento.softwaretestingboard.com",
    specPattern: ["cypress/specs/**/*.{cy,js,ts,spec}"],
    supportFile: 'cypress/support/e2e.ts',
    screenshotsFolder: "cypress/screenshots",
    setupNodeEvents(on, config) {

        //getter and setter for data stored in node process 
        on('task', {
            storeDetails: (value) => {
                return (prodDetails = value)
            },
            getDetails: () => {
                return prodDetails
            }
        })

        on('before:browser:launch', (browser = {}, launchOptions) => {
            launchOptions.args.push('--disable-dev-shm-usage', '--auto-open-devtools-for-tabs');
            return launchOptions;
        })
        return config;
    }
}
module.exports = defineConfig(config);