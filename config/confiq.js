const fs = require('fs');
const key = fs.readFileSync('D:/data/bootcamp/task1/certs/key.pem');

module.exports = {
    secret: key
}