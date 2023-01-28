const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required : [true, 'Username is required']
  },
  password: {
    type: String,
    required : [true, 'Password is required']
  }
});

userSchema.pre('save', function(next) {
  const rawPassword = this.password;
    bcrypt.hash(rawPassword, 10)
      .then(hash => {
        this.password = hash;
        next()
      })
      .catch(err => next(err))

    next();
});

const User = model("User", userSchema);

module.exports = User;
