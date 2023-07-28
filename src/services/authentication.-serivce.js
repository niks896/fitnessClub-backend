const { authenticationRepository } = require("../database/repository/authentication-repository");
const { APIError } = require("../utils/app-errors");
const jwt = require('jsonwebtoken');


class authenticationService {

    constructor() {
        this.repository = new authenticationRepository();
    }

    async registerUser(payload) {

        try {
            let findBy = { username: payload.username, emailId: payload.emailId }

            let result = await this.repository.register(findBy, payload);

            return result;

        } catch (err) {
            APIError("Data Not found")
        }
    }

    async loginUser(payload) {
        try {

            const { username, password } = payload;
            let findBy = { username: payload.username, emailId: payload.emailId }

            if (!(username && password)) {
                return { errMsg: " username and password is required " }
            }

            let result = await this.repository.login(findBy, password)

            return result;

        } catch (err) {
            APIError("Data Not found")
        }
    }
}

module.exports = { authenticationService }