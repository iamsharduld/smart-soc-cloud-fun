import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp()

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
 export const getMembers = functions.https.onRequest((request, response) => {
    const db = admin.database();
    const ref = db.ref("/Members");
    console.log("hello");
    ref.orderByKey().on("child_added",function(snapshot){
        console.log(snapshot.key);
    })

 });
  
 





