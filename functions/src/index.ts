import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp()

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
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








  


 












