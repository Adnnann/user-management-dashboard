/* eslint-disable no-underscore-dangle */
import mongoose from "mongoose";
import _ from "lodash";
import Users from "./src/models/user.model.js";
import config from "./src/config/config.js";

const users = [
  {
    firstName: "Mak",
    lastName: "Ovcina",
    email: "mak.ovcina@test.com",
    password: "12345678",
    role: "mentor",
  },
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@test.com",
    password: "12345678",
    role: "student",
  },
  {
    firstName: "John",
    lastName: "Smith",
    email: "hugo_tutto_cammara@test.com",
    password: "12345678",
    role: "mentor",
  },
  {
    firstName: "Larry",
    lastName: "Bird",
    email: "harry.lattam@test.com",
    password: "12345678",
    role: "student",
  },
  {
    firstName: "paragon",
    lastName: "paragon",
    email: "paragon@paragon.ba",
    password: "Paragon202!",
    role: "admin",
  },

  {
    firstName: "Luka",
    lastName: "Ovcina",
    email: "luka.ovcina@test.com",
    password: "12345678",
    role: "mentor",
  },
  {
    firstName: "Marina",
    lastName: "Ovcina",
    email: "marina.ovcina@test.com",
    password: "12345678",
    role: "mentor",
  },
  {
    firstName: "Adnan",
    lastName: "Ovcina",
    email: "adnan.ovcina@test.com",
    password: "12345678",
    role: "mentor",
  },
];

const role = ["student", "mentor", "admin"];

for (let i = 0; i < 50; i++) {
  users.push({
    firstName: `user${i}`,
    lastName: `lastName${i}`,
    email: `user${i}@test.com`,
    password: "12345678",
    role: role[Math.floor(Math.random() * role.length)],
  });
}

mongoose
  .connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected..."))
  .catch((e) => console.log(e));

const createUsers = async () => {
  await Users.insertMany(users);
};

createUsers()
  .then(() => {
    mongoose.connection.close();
  })
  .catch((err) => console.log(err));
