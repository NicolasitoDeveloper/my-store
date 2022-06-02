const faker = require("faker");
const boom = require("@hapi/boom");

class UsersService {

  constructor() {
    this.users = [];
    this.generate();
  }

  async generate() {
    const limit = 20;
    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: faker.image.imageUrl(),
        city: faker.address.cityName(),
        email: faker.internet.email(),
        isBlocked: faker.datatype.boolean(),
      })
    }
  }

  async create(data) {
    const newUser = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.users.push(newUser);
    return newUser;
  }

  find() {
    return new Promise((resolve, reject) => {
      setTimeout(() =>{
        resolve(this.users);
      }, 2000);
    })
  }

  findOne(id) {
    const user = this.users.find(user => user.id === id);
    if (!user) {
      throw boom.notFound("User not found");
    }
    if (user.isBlocked) {
      throw boom.conflict("User is blocked");
    }
    return user;
  }

  async update(id, changes) {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) {
      throw new Error("User not found");
    }
    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...changes
    };
    return this.users[index];
  }

  async delete(id) {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) {
      throw boom.notFound("User not found");
    }
    this.users.splice(index, 1);
    return { id, message: "Deleted" };
  }

}

module.exports = UsersService;
