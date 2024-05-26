module.exports = (err, req, res, next) => {

    let statusCode = 500;
    let message = `Internal Server Error`;

    if(err.message === `Unauthorized access!`){
        statusCode = 401;
        message = `Unauthorized`
    }

    res.status(statusCode).json({ message })
}