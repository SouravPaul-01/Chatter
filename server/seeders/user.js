import { User } from "../models/user.js";
import { faker, simpleFaker } from "@faker-js/faker";

const createUser = async (numUsers) => {
  try {
    const usersPromise = [];
    for (let i = 0; i < numUsers; i++) {
      const tempUser = User.create({
        name: faker.person.fullName(),
        username: faker.internet.userName(),
        bio: faker.lorem.sentence(10),
        password: "password",
        avatar: {
          public_id: faker.system.fileName(),
          url: faker.image.avatar(),
        },
      });
      usersPromise.push(tempUser);
    }
    await Promise.all(usersPromise);
    console.log("Users created", numUsers);
    process.exit(1);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export { createUser };
