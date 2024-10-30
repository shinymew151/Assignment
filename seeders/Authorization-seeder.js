const mongoose = require('mongoose');
const Permission = require('../models/permission');
const Role = require('../models/role');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

mongoose.connect('mongodb://127.0.0.1:27017/assignment', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
  process.exit(1);
});

exports.process = async () => {
  // tạo quyền.
  const permissionAdminGet = new Permission({
    name: 'Admin Access', url: '/admin', method: 'GET'
  });
  const permissionCreateUserPost = new Permission({
    name: 'Create User', url: '/user/create', method: 'POST'
  });
  const permissionDeleteUserDelete = new Permission({
    name: 'Delete User', url: '/user/delete', method: 'DELETE'
  });
  const permissionUpdateUserPut = new Permission({
    name: 'Update User', url: '/user/update', method: 'PUT'
  });
  const permissionGetListUserGet = new Permission({
    name: 'Get List User', url: '/user/list', method: 'GET'
  });
  const permissionAssignRolePost = new Permission({
    name: 'Assign Role to User', url: '/admin/role', method: 'POST'
  });
  const permissionListUserRoleGet = new Permission({
    name: 'List User Roles', url: '/admin/user', method: 'GET'
  });
  await permissionAdminGet.save();
  await permissionCreateUserPost.save();
  await permissionDeleteUserDelete.save();
  await permissionUpdateUserPut.save();
  await permissionGetListUserGet.save();
  await permissionAssignRolePost.save();
  await permissionListUserRoleGet.save();
  // tạo role, add quyền vào role
  const roleAdmin = new Role({
    name: 'Admin', permissions: [permissionAdminGet._id, 
                                permissionCreateUserPost._id, 
                                permissionGetListUserGet._id,
                                permissionUpdateUserPut._id,
                                permissionDeleteUserDelete._id,
                                permissionListUserRoleGet._id,
                                permissionAssignRolePost._id,
                                ]
  });
  const roleUser1 = new Role({
    name: 'User1', permissions: [permissionGetListUserGet._id,permissionListUserRoleGet._id]
  });
  const roleUser2 = new Role({
    name: 'User2', permissions: [permissionCreateUserPost._id]
  });
  const roleUser3 = new Role({
    name: 'User3', permissions: [permissionUpdateUserPut._id]
  });
  const roleUser4 = new Role({
    name: 'User3', permissions: [permissionGetListUserGet._id,
                                permissionUpdateUserPut._id,
                                permissionCreateUserPost._id,
                                permissionDeleteUserDelete._id
                                ]
  });
  await roleAdmin.save();
  await roleUser1.save();
  await roleUser2.save();
  await roleUser3.save();
  await roleUser4.save();
  // tạo tài khoản
  const userAdmin = new User({
    name: 'Admin',
    email: 'admin@gmail.com',
    password: await bcrypt.hash('my password', saltRounds),
    roles: [roleAdmin._id]
  });
  const userDefault = new User({
    name: 'Normal User',
    email: 'user1@gmail.com',
    password: await bcrypt.hash('my password', saltRounds),
    roles: [roleUser1._id]
  });
  const userCreate = new User({
    name: 'Create_Permission User',
    email: 'user2@gmail.com',
    password: await bcrypt.hash(' ', saltRounds),
    roles: [roleUser2._id]
  });
  const userUpdate = new User({
    name: 'Update_Permission User',
    email: 'user3@gmail.com',
    password: await bcrypt.hash('my password', saltRounds),
    roles: [roleUser3._id]
  });
  const userCRUD = new User({
    name: 'CRUD User',
    email: 'user4@gmail.com',
    password: await bcrypt.hash('my password', saltRounds),
    roles: [roleUser4._id]
  });
  await userAdmin.save();
  await userDefault.save();
  await userCreate.save();
  await userUpdate.save();
  await userCRUD.save();
};
