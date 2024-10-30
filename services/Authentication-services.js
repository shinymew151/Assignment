const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Role = require('../models/role');
const secretKey = 'secret-key';
const saltRounds = 10;

exports.registerUser = async ({ name, email, password, roles }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('Email đã được đăng ký');
    }

    const passwordHash = await bcrypt.hash(password, saltRounds);
    const userRole = await Role.findOne({ name: roles });

    const newUser = new User({
        name,
        email,
        password: passwordHash,
        roles: userRole ? [userRole._id] : [] 
    });

    await newUser.save();
    return newUser;
};

exports.loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Người dùng không tồn tại!');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Mật khẩu không đúng!');
    }

    const token = jwt.sign({ userId: user._id, roles: user.roles }, secretKey, { expiresIn: '1h' });
    return { user, token };
};
