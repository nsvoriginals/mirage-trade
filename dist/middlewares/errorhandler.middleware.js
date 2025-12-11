"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(error, res, req, next) {
    const errorStatus = error.statusCode || 500;
    const errorMsg = error.errorMsg || "Something went wrong";
    return res.status(errorStatus).json({
        message: errorMsg,
        status: errorStatus,
        success: false
    });
}
exports.default = errorHandler;
