const sequelize = require('../config/connection');
const { User, Request } = require('../models');

const userData = require('./userData.json');
const requestData = require('./requestData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const request of requestData) {
        await Request.create({
            ...request,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    process.exit(0);
};

seedDatabase();

