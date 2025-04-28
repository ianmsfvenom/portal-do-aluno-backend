class HttpError extends Error {
    status = 500;

    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

module.exports = HttpError;