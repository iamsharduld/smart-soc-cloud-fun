"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
// All member APIs
// getMembers() - listing all members
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
// getMember() - searching one member by email ID
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
//createSociety()
exports.createSociety = functions.https.onRequest((request, response) => {
    const inpaddress = request.query.address;
    const inpcontact = request.query.contact;
    const inpemail = request.query.email;
    const inpfacilities = request.query.facilities; //boolean yes/no
    const inpnotices = request.query.notices; //boolean yes/no
    const inplogo = '/tmpurl'; //upload image and get url
    const inpname = request.query.name;
    const getuniqueID = '00001'; //get the unique id from realtime database. maintain a value at root node which keeps count of total number of societies.
    const db = admin.database();
    const Ref = db.ref("/");
    const societyObject = {
        name: inpname,
        email: inpemail,
        address: inpaddress,
        contact: inpcontact,
        notices: inpnotices,
        facilities: inpfacilities,
        logo: inplogo,
        uniqueID: getuniqueID
    };
    Ref.child("Society").update(societyObject)
        .then(function () {
        response.status(200).send("success");
    })
        .catch(function (error) {
        console.log(error);
    });
});
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
//All notices APIs
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
//All facilities APIs
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