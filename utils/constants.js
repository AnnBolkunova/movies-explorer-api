const URL_REGEX = /^https?:\/\/(www\.)?[a-zA-Z\0-9]+\.[\w\-._~:/?#[\]@!$&'()*+,;=]{2,}#?$/;
const UNIQUE_ERROR_CODE = 11000;
const STATUS_CREATED = 201;

module.exports = { URL_REGEX, UNIQUE_ERROR_CODE, STATUS_CREATED };
