const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {

        id: {
            type: String,
            required: [true, "Please enter user id."]
        },

        firstName: {
            type: String,
            required: [true, "Please enter user first name."]
        },

        lastName: {
            type: String,
            required: [true, "Please enter user last name."]
        }
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;