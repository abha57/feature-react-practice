const User = require('../../models/User');

module.exports = (app) => {
    app.post('api/account/signup', (req, res, next) => {
        const { email, password } = req.body;
        if(!email){
            return res.send({
                success: false,
                message: 'Please provide an email'
            });
        }
        if(!password){
            return res.send({
                success: false,
                message: 'Please provide a password'
            });
        }
        User.find({
            email
        }, (err, previousUsers) => {
            if(err){
                return res.send({
                    success: false,
                    message: 'There is some error'
                });
            }
            if(previousUsers.length > 0){
                return res.send({
                    success: false,
                    message: 'Email is already registered'
                });
            }
        });
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.generateHash(password);
        newUser.save((err, user) => {
            if(err){
                return res.send({
                    success: false,
                    message: 'There is some error in registration.'
                })
            }
            return res.send({
                success: true,
                message: 'Sign Up successful.'
            })
        });
    });
    app.post('api/account/signin', (req, res, next) => {
        
    });
}