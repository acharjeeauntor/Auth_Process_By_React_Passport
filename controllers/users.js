const JWT = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../configuration");

signToken = (user) => {
  return JWT.sign(
    {
      iss: "AuthByPassportReact",
      sub: user.id
    },
    JWT_SECRET,
    { expiresIn: 3600 }
  );
};

module.exports = {
  signUp: async (req, res, next) => {
    const { email, password } = req.value.body;

    // Check if there is a user with the same email
    const foundUser = await User.findOne({ "local.email": email });
    if (foundUser) {
      return res
        .status(403)
        .json({ error: "Email is already Register.Please use another email" });
    }

    // Create a new user
    const newUser = new User({
      method: "local",
      local: {
        email,
        password
      }
    });
    await newUser.save();

    // Generate the token
    const token = signToken(newUser);

    // Respond with token
    res.status(200).json({ token });
  },

  signIn: async (req, res, next) => {
    // Generate token
    const token = signToken(req.user);
    res.status(200).json({ token });
  },
  googleOAuth: async (req, res, next) => {
    // Generate token
    const token = signToken(req.user);
    res.status(200).json({ token });
  },
  facebookOAuth: async (req, res, next) => {
    //console.log('ReqUSer',req.user)
    const token = signToken(req.user);
    res.status(200).json({ token });
  },
  secret: async (req, res, next) => {
    res.json({ secret: "resource" });
  }
};
