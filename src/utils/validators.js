const requiredHeaders = ['content-type', 'user-agent'];

const validateHeaders = (headers) => {
    for (const header of requiredHeaders) {
        if (!headers[header]) {
            return {
                isValid: false,
                error: `Missing required header: ${header}`
            };
        }
    }
    return { isValid: true };
};

module.exports = {
    validateHeaders
};
