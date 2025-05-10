export const errorHandler = (stautesCode, message) => {
    const error = new Error();
    error.status = stautesCode;
    error.message = message;
    return error;
}