"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
exports.getMembers = functions.https.onRequest((request, response) => {
    const db = admin.database();
    const MembersRef = db.ref("/Members");
    MembersRef.once('value')
        .then(function (snap) {
        console.log(snap.val());
        response.status(200).json({ members: snap.val() });
    })
        .catch(function (error) {
        console.log(error.code);
    });
});
//# sourceMappingURL=index.js.map