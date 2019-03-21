const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    signUpDate: {
        type: Date,
        default: Date.now()
    }
});

UserSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

UserSchema.methods.validatePassword = (password) => {
    return bcrypt.compareSync(password, this.password);
};

module.exports =  mongoose.model('User', UserSchema);



