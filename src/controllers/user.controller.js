const { registerValidation, loginValidation } = require('../validation');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.get_all = async function(req, res) {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.json({ message: err });
    }
};

exports.get_one = async function(req, res) {
    try {
        const user = await User.findById(req.params.userId);
        res.json(user);
    } catch (err) {
        res.json({ user });
    }
};

exports.register = async function(req, res) {
    // Validate data
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    // Check if email exists yet
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Endereço de email já cadastrado!')

    // HashCrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    // Create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        rg: req.body.rg,
        cpf: req.body.cpf,
        bornDate: req.body.bornDate,
        firstTelephone: req.body.firstTelephone,
        secondTelephone: req.body.secondTelephone,
        authLevel: req.body.authLevel,
        avatarURL: req.body.avatarURL,
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.login = async function(req, res) {
    // Validate data
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email e/ou senha incorretos!')

    // Check password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Email e/ou senha incorretos!');
    
    // Creating Token and assigning it
    const token = await jwt.sign({ _id: user._id }, process.env.APP_SECRET);
    const data = {
        user: user,
        token: token,
    };
    res.header('Authorization', token).send(data);
};

exports.delete = async function(req, res) {
    try {
        const removedUser = await User.remove({_id: req.params.userId });
        res.json(removedUser);
    } catch (err) {
        res.json({ message: err });
    }
};

exports.update = async function(req, res) {
    try {
        const updatedUser = await User.updateOne(
            { _id: req.params.userId },
            { $set: {name: req.body.name} }
        );
        res.json(updatedUser);
    } catch (err) {
        res.json({ message: err });
    }
};
    