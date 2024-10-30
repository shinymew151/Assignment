const User = require ('../models/user');

exports.findUserByEmail = async (email) => {
    return await User.findOne({ email }).exec();
};

exports.save = (insertData) => {
    const data = new Account(insertData);
    return data.save();
};