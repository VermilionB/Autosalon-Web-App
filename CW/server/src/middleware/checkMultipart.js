export const checkMultipart = (req, res, next) => {
    if (req.headers['content-type'] && req.headers['content-type'].includes('multipart/form-data')) {
        next();
    } else {
        res.status(400).send('Request must be multipart/form-data');
    }
};