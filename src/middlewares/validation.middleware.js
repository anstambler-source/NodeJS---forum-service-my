import Joi from 'joi'
import {ADD_COMMENT, CREATE_POST, GET_POSTS_BY_PERIOD, UPDATE_POST} from "../utils/constants.js";

const schemas = {
    [CREATE_POST]: {
        body: Joi.object({
            title: Joi.string().required(),
            content: Joi.string().required(),
            tags: Joi.array().items(Joi.string())
        })
    },
    [ADD_COMMENT]: {
        body: Joi.object({
            message: Joi.string().required()})
    },
    [GET_POSTS_BY_PERIOD]: {
        query: Joi.object({
            dateFrom: Joi.string().pattern(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/),
            dateTo: Joi.string().pattern(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/),
        })
    },
    [UPDATE_POST]: {
        body: Joi.object({
            title: Joi.string(),
            content: Joi.string(),
            tags: Joi.array().items(Joi.string())
        })
    }
}


const sendError = (error, req, res) => {
    return res.status(400).send({
        message: error.message,
        code: 400,
        status: 'Bad Request',
        timestamp: new Date().toISOString(),
        path: req.path
    })
}

const validate = schemaName => (req, res, next) => {
    const schema = schemas[schemaName];
    if (!schema) {
        return next(new Error('Invalid schema name'))
    }

    if (schema.body) {
        const {error} = schema.body.validate(req.body);
        if (error) return sendError(error, req, res);
    }

    if (schema.query) {
        const {error} = schema.query.validate(req.query);
        if (error) return sendError(error, req, res);
    }
    return next();
}

export default validate