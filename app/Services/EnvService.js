require('dotenv').config()

class EnvService {
  static get(key, fallbackVal) {
    return key in process.env ? process.env[key]: fallbackVal
 }
}

module.exports = EnvService
