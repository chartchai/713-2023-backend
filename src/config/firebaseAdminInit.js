// https://chat.openai.com/c/9ccc2a82-4322-463a-9b3a-dfb99f70e03b
const admin = require("firebase-admin");
const serviceAccount = require("../imageupload.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "image-upload-750b0.appspot.com"
});

const bucket = admin.storage().bucket();
module.exports = bucket;