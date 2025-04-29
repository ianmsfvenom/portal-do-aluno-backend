class HttpError extends Error {
    status = 500;

    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

module.exports = HttpError;