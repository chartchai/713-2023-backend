# Install Sequelize
npm install -g sequelize-cli 
sequelize init
npm install sequelize
# Seeder techniques
Seeders

This is the recommended approach for managing initial or test data, especially for larger datasets and more control over execution order.
Steps:
Create seed files: Use the Sequelize CLI to generate seed files (e.g., `npx sequelize-cli seed:generate --name initial-users`).

Write seed data: Inside the seed file, use Sequelize model methods like create, bulkCreate, etc. to define the data you want to add:

```javascript
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      { username: 'demo_user', email: 'demo@example.com', createdAt: new Date(), updatedAt: new Date() },
      // ...more user data
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    // Logic for undoing the seeding (e.g., deleting)
  }
};
```
Use code with caution. Learn more
Run seeders: Use `npx sequelize-cli db:seed:all` to execute your seeders. 
You can revert seeded data with `npx sequelize-cli db:seed:undo`.

## Lab
### migration the database
1. create `npx sequelize-cli migration:generate --name create-events-table` 
2. create files
3. update `npx sequelize-cli db:migrate`
4. to undo the data `npx sequelize-cli db:migrate:undo:all`
5. create `npx sequelize-cli migration:generate --name create-organization-table`
6. create `npx sequelize-cli migration:generate --name create-participant-table`
### seed data
1. use command `npx sequelize-cli seed:generate --name initial-events`
2. copy event objects
3. run `npx sequelize-cli db:seed:all`
4. `npx sequelize-cli seed:generate --name initial-organizers`
5. `npx sequelize-cli seed:generate --name initial-participants`