const authService = require('../services/Authentication-services');

exports.register = async (req, res) => {
    try {
        const { name, email, password, roles } = req.body;        
        await authService.registerUser({ name, email, password, roles });       
        res.redirect('/authen/login');
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;       
        const { token } = await authService.loginUser({ email, password });
        res.cookie('token', token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
        res.redirect('/authen/home');
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};
