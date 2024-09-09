# Magento-Automation-Task

## Intro

This project will focus on automating various regression scenarios, with focus on the checkout process, on a predefined dummy SUT.

Scenarios tackled:

    1. User registration
    2. User login
    3. Checkout with different quantities
    4. Cart editing and checkout

## Pre-requirements

* I used versions v20.10.0 and 10.2.3 of Node.js and npm respectively. The Cypress minimum  
requirement for Node.js is 18.x. You can use the same or later versions. This is required if you want to run the tests locally, otherwise Docker would suffice.
* Docker Desktop for Windows, Mac, or Docker and Docker Compose for Linux


## Installation

If you want to run the tests locally, you can just run `npm install`
In order to run the Cypress tests in Docker, the following commands must be executed:
* `docker-compose build` 
* `docker-compose up`

## Tests

Local test run: 

* Headless mode, with test report generated: `npm run cypress:run-local`
* UI mode: `npx cypress open`

Docker:

Run `docker-compose up` if the container is already created, if not, run `docker-compose build` first.