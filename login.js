const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
const User = require ('../assigment/models/user');
const secretKey = 'secret-key';

const login = async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({message: 'User is not exist'});            
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if (!isPasswordValid){
            return res.status(401).json({message: 'Password incorrect'});
        }
        const token = jwt.sign({userId: user._id, roles:user.roles}, secretKey, {expiresIn: '1h'})
        res.cookie('token', token, {httpOnly: true, maxAge: 60*60*1000});
    }catch (error) {
        res.status(500).json({message: 'Server Error'});
    }
};

module.exports = {login}