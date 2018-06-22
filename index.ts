import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const getMembers = functions.https.onRequest((req,res) => {
    const db = admin.database();
    const Membersref = db.ref("/Members");
    
    Membersref.on('value',(snapshot) => {
        res.status(200).json({member: snapshot.val()});
    });
  });

  export const createMember = functions.https.onRequest((request,response) =>{
    const db = admin.database();
    const Membersref = db.ref("/Members/1/");

    const email = request.query.email;
    const name  = request.query.name;
    const contact = request.query.contact;
    const flatno = request.query.flatno;
    const type = request.query.type;
    const key = Membersref.push().key;
    const MemberObject = {
        email: email,
        name: name,
        contact: contact,
        flatno: flatno,
        type: type,
        notices: true,
        facilities: true,
        applications: true
    };
    Membersref.push(MemberObject);
  });

  export const updateMember = functions.https.onRequest((request,response) =>{
    const db = admin.database();
    const Membersref = db.ref("/Members/1/");

    const email = request.query.email;
    const name  = request.query.name;
    const contact = request.query.contact;
    const flatno = request.query.flatno;
    const type = request.query.type;
    //const key = Membersref.push().key;
    const MemberObject = {
        email: email,
        name: name,
        contact: contact,
        flatno: flatno,
        type: type,
        notices: true,
        facilities: true,
        applications: true
    };
    Membersref.update(MemberObject);
  });

