const sequelize = require('../config/connection');
const { User, Give, Request } = require('../models');

const userData = require('./userData.json');
const requesttData = require('./requestData.json');
// const giveData = require('./giveData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const request of requesttData) {
        await Request.create({
            ...request,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    // for (const give of giveData) {
    //     await Give.create({
    //         ...give,
    //         user_id: users[Math.floor(Math.random() * users.length)].id,
    //     });
    // }

    process.exit(0);
};

seedDatabase();

