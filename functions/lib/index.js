"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
exports.getSociety = functions.https.onRequest((request, response) => {
    const db = admin.database();
    const ref = db.ref("/Members");
    console.log("hello");
    ref.orderByKey().on("child_added", function (snapshot) {
        console.log(snapshot.key);
    });
});
//# sourceMappingURL=index.js.map