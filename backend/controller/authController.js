const User = require('../model/userSchema.js'); // Correctly import the User model
const emailValidator = require("email-validator");
const bcrypt = require('bcrypt')

const signup = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "All fields are required!"
        });
    }

    // Using email validator 
    const isValidEmail = emailValidator.validate(email);
    if (!isValidEmail) {
        return res.status(400).json({
            success: false,
            message: "Invalid email!"
        });
    }
    
    // Password check
    if (password !== confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "Password and confirm password don't match!"
        });
    }

    try {
        const user = await User.create({
            name,
            email,
            password
        });

        res.status(201).json({
            success: true,
            message: "User created successfully.",
            user
        });
    } catch (error) {
        console.log("Unable to sign up: ", error);
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "User already exists!"
            });
        }
        return res.status(400).json({
            success: false,
            message: "Unable to sign up!"
        });
    }
}

const signin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required!"
        });
    }
    try {
        const user = await User.findOne({ email }).select("+password");
        if (!user || ! (await bcrypt.compare(password,user.password))) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials!"
            });
        }

        const token = user.jwtToken();
        user.password = undefined;   // ensure password is not leaked

        const cookieOptions = {
            maxAge: 24 * 60 * 60 * 1000, // expiry time of cookie in milliseconds
            httpOnly: true               // ensure cookie can't be accessed from client-side JS
        }

        res.cookie("token", token, cookieOptions);
        return res.status(200).json({
            success: true,
            token: token,
            data: user
        });
    } catch (error) {
        console.error("Unable to sign in: ", error);
        return res.status(500).json({
            success: false,
            message: "Unable to find user"
        });
    }
}

const getUser = async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await User.findById(userId);
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const logout = (req,res) =>{
    try {
        const cookieOption = {
            expires : new Date(),
            httpOnly : true
        }
        res.cookie("token",null,cookieOption);
        res.status(200).json({
            success : true,
            message : "Successfully logged out "
        })
    } catch (error) {
        return res.status(400).json({
            success : false,
            message : error.message
        })
    }
}
module.exports = {
    signup, 
    signin,
    getUser,
    logout
};
