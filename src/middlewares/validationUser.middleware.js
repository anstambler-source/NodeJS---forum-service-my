import Joi from 'joi'

const schemas = {
    userRegister: Joi.object({
        login: Joi.string().required(),
        password: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required()
    }),
    updateUser: Joi.object({
        firstName: Joi.string(),
        lastName: Joi.string()
    }),
    changePassword: Joi.object({
        password: Joi.string().required()
    })
}

const validate = (schemaName, target = 'body') => (req, res, next) => {
    const schema = schemas[schemaName];
    if (!schema) {
        return next(new Error(`Unknown schema ${schemaName}`));
    }
    const {error} = schema.validate(req[target])
    if (error) {
        return res.status(400).send({
            message: error.message,
            code: 400,
            status: 'Bad Request',
            timestamp: new Date().toISOString(),
            path: req.path
        })
    }
    return next()
}

export default validate