const { userRest } = require('../logics');
const { userModel } = require('../schema');

describe('user Model', () => {
  beforeAll(async () => {
    const users = [{ email: 'coolkannan0@gmail.com', password: 'Sasassa', name: 'Kannan' }];
  });

  it('Get All Users', async () => {
    jest.spyOn(userModel, 'find').mockResolvedValue([]);
    const users = await userRest.getUsers();
    console.log({ users });
    expect(users).toEqual([]);
  });

  it('Create Users', async () => {
    jest.spyOn(userModel, 'create').mockResolvedValue({});
    const newUser = await userRest.createUser({ password: '12112', email: 'askasjk@jk.com' });
    console.log({ newUser });
    expect(newUser).toEqual({});
  });
});

// const { getUserByName } = require('./user');
// const mongoose = require('mongoose');

// const { Users: UserModel } = require('../schemas/user');

// jest.spyOn(UserModel, 'findOne').mockReturnValue(
//   Promise.resolve({
//     name: 'afzy',
//     age: 24,
//   })
// );

// describe('User Model', () => {
//   beforeAll(async () => {
//     const url = `mongodb://localhost:27017/mydb`;
//     await mongoose.connect(url);
//   });

//   afterAll(() => mongoose.disconnect());
// });
