import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {errorHandler} from '../utils/error.js';
export const signup = async(req, res, next) => {
    const {username, email, password} = req.body;
    
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        image: "https://www.dreamstime.com/default-avatar-profile-icon-social-media-user-image-gray-blank-silhouette-vector-illustration-image305504015"
    });
    try{
        await newUser.save()
        res.status(201).json({message: "User created successfully"})
    }
    catch(err){
        next(err);
    }
}

export const signin = async(req, res, next) => {
    const {email, password} = req.body;
    try{
        const validUser = await User.findOne({email});
        if(!validUser) return next(errorHandler(404, "User not found!"));
        const isPasswordCorrect = bcrypt.compareSync(password, validUser.password);
        if(!isPasswordCorrect) return next(errorHandler(401, "wrong credentials!"));
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
        const {password : hashedPassword, ...others} = validUser._doc;
        const expiryDate = new Date(Date.now() + 60 * 60 * 1000); 
        res
            .cookie("access_token", token, {httpOnly: true, expires: expiryDate})
            .status(200)
            .json(others);
    }catch(err){
        next(err);
    }
}

export const google = async(req, res, next) => {
    const {username, email, image} = req.body;
    try{
        const user = await User.findOne({email});
        if(user){
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
            const {password : hashedPassword, ...others} = user._doc;
            const expiryDate = new Date(Date.now() + 60 * 60 * 1000); 
            res
                .cookie("access_token", token, {httpOnly: true, expires: expiryDate})
                .status(200)
                .json(others);
        }
        else{
            const generatedPassword = bcrypt.hashSync(email, 10);
            const newUser = new User({
                username: username.split(" ")[0],
                email,
                password: generatedPassword,
                image
            });
            await newUser.save();
            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
            const {password : hashedPassword, ...others} = newUser._doc;
            const expiryDate = new Date(Date.now() + 60 * 60 * 1000);
            res
                .cookie("access_token", token, {httpOnly: true, expires: expiryDate})
                .status(200)
                .json(others);
        }
    }
    catch(err){
        next(err);
    }
}

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json("Token is not valid!");
        req.user = user;
        next();
    });
};

export const getCurrentUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};