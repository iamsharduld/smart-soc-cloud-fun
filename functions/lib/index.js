"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
// All member APIs
// getMembers()
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
// getMember()
exports.getMember = functions.https.onRequest((request, response) => {
    const emailID = request.query.email;
    const db = admin.database();
    const MembersRef = db.ref("/").child('Members').orderByChild('Email').equalTo(emailID);
    MembersRef.on("value", function (snap) {
        //console.log(snap.val());
        response.status(200).json({ member: snap.val() });
    });
});
// All society APIs 
exports.getSociety = functions.https.onRequest((request, response) => {
    const db = admin.database();
    const SocietyRef = db.ref("/Society");
    SocietyRef.once('value')
        .then(function (snap) {
        console.log(snap.val());
        response.status(200).json({ Society: snap.val() });
    })
        .catch(function (error) {
        console.log(error.code);
    });
});
//All society APIs
exports.getNotices = functions.https.onRequest((request, response) => {
    const db = admin.database();
    const NoticesRef = db.ref("/Society/services/notices");
    NoticesRef.once('value')
        .then(function (snap) {
        console.log(snap.val());
        response.status(200).json({ Notices: snap.val() });
    })
        .catch(function (error) {
        console.log(error.code);
    });
});
//All society APIs
exports.getFacilities = functions.https.onRequest((request, response) => {
    const db = admin.database();
    const FacilitiesRef = db.ref("/Society/services/facilities");
    FacilitiesRef.once('value')
        .then(function (snap) {
        response.status(200).json({ All_Facilities: snap.val() });
    })
        .catch(function (error) {
        console.log(error.code);
    });
});
//# sourceMappingURL=index.js.map