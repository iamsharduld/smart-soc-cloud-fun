import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';


admin.initializeApp()

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

// All member APIs
export const getMembers = functions.https.onRequest((request, response) => {
    const db = admin.database();
    const MembersRef = db.ref("/Members");

    MembersRef.once('value')
    .then(function(snap){
        console.log(snap.val())
        response.status(200).json({members: snap.val()});
    })
    .catch(function(error){
        console.log(error.code);
    })

 });


// All society APIs 
 export const getSociety = functions.https.onRequest((request, response) => {
    const db = admin.database();
    const SocietyRef = db.ref("/Society");

    SocietyRef.once('value')
    .then(function(snap){
        console.log(snap.val())
        response.status(200).json({Society: snap.val()});
    })
    .catch(function(error){
        console.log(error.code);
    })


 });



//All society APIs
export const getNotices = functions.https.onRequest((request, response) => {
    const db = admin.database();
    const NoticesRef = db.ref("/Society/services/notices");

    NoticesRef.once('value')
    .then(function(snap){
        console.log(snap.val())
        response.status(200).json({Notices: snap.val()});
    })
    .catch(function(error){
        console.log(error.code);
    })


 });


//All society APIs
export const getFacilities = functions.https.onRequest((request,response) => {
    const db = admin.database();
    const FacilitiesRef = db.ref("/Society/services/facilities");

    FacilitiesRef.once('value')
    .then(function(snap){
        response.status(200).json({All_Facilities: snap.val()});
    })
    .catch(function(error){
        console.log(error.code);
    })

});











  


 












