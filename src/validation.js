// Validation
const Joi = require('@hapi/joi');

const registerValidation = data => {
    const schema = Joi.object({
        password: Joi.string().min(6).required(),
        email: Joi.string().min(8).required().email(),
        name: Joi.string(),
        rg: Joi.string().required(),
        cpf: Joi.string().required(),
        bornDate: Joi.string(),
        firstTelephone: Joi.string(),
        secondTelephone: Joi.string(),
        authLevel: Joi.number().required(),
        avatarURL: Joi.string(),
    });

    return schema.validate(data);
}

const loginValidation = data => {
    const schema = Joi.object({
        password: Joi.string().min(6).required(),
        email: Joi.string().min(8).required().email(),
    });

    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;