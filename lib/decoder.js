//Decode BASE64 string.
const decode64 = (data) => Buffer.from(data, 'base64').toString('utf-8');

module.exports = {
	decode64
};