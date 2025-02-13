import { faker } from '@faker-js/faker';

function createRandomUser() {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    };
}
// can specify how many users to be created (count param)
export const USERS = faker.helpers.multiple(createRandomUser, { count: 1 });
