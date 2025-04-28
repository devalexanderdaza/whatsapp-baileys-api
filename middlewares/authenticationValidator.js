import response from './../response.js'

const validate = (req, res, next) => {
    const apiKey = req.get('apikey') ?? req.query.apikey

    if (!process.env.AUTHENTICATION_GLOBAL_AUTH_TOKEN) {
        return next()
    }

    if (apiKey !== process.env.AUTHENTICATION_GLOBAL_AUTH_TOKEN) {
        return response(res, 401, false, 'Authentication failed.')
    }

    next()
}

export default validate
