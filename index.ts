import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

//

/*Fetch list of all the members in a particular society. The societyId is passed via the url*/
export const getMembers = functions.https.onRequest((req,res) => {
    const db = admin.database();
    const Membersref = db.ref("/Members/1");
    
    Membersref.on('value',(snapshot) => {
        res.status(200).json({member: snapshot.val()});
    });
  });

  /*The createMember routine will enable the admin to create a new member in a particular society
  MainDB
    |-Members
        |-societyID
            |-New member added here
            
    all the data parameters are passed via the url. System generated key used*/ 
  export const createMember = functions.https.onRequest((request,response) =>{
    const db = admin.database();
//>societyID should be queried.currently hardcoded
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
    Membersref.push(MemberObject).then(function(){
        response.status(200).send("success");
    })
  });

/*updateMember will update the member data. All the data passed via the url. Also, system generated key
 currently required to update data.
*/   
  export const updateMember = functions.https.onRequest((request,response) =>{
    const db = admin.database();
//societyID should be queried.currently hardcoded
    const key = request.query.key;
    const Membersref = db.ref("/Members/1/" + key + "/");
    const email = request.query.email;
    const name  = request.query.name;
    const contact = request.query.contact;
    const flatno = request.query.flatno;
    const type = request.query.type;
   // const key = Membersref.push().key;
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
    Membersref.update(MemberObject).then(function(){
        response.status(200).send("success");
    })
    .catch(() => {
        response.status(200).send("failure");
    })
  });
/*
createFacility enables to create a new Facility under a particular society
MainDB
    |-facilities
        |-societyID
            |-New facility added here
*/
  export const createFacility = functions.https.onRequest((request,response) => {
    const db = admin.database();
    const facilities = db.ref("/facilities/1");

    const facilityName = request.query.name;
    const bookAfterUse = request.query.bafu;
    const breakTimePerSlot = request.query.btps;
    const closingHours = request.query.ch;
    const currentStatus = request.query.cs;
    const isBookable = request.query.bookable;
    const openingHours = request.query.oh;
    const sessionTime = request.query.st;
    const advanceBookingFrom = request.query.abf;

    const facilityObject = {
        book_after_use: bookAfterUse,
        break_time_per_slot: breakTimePerSlot,
        closing_hours: closingHours,
        current_status: currentStatus,
        isbookable: isBookable,
        opening_hours: openingHours,
        session_time: sessionTime,
        to_open_before: advanceBookingFrom
    };
    facilities.child(facilityName).set(facilityObject)

    .then(function(){
        response.status(200).send("success");
    })

    .catch(() => {
        response.status(200).send("failure");
    })
  });
/*
checks if facility to be updated already exists and returns true and false
 accordingly updates if facility exists
*/
  export const updateFacility = functions.https.onRequest((request,response) => {
    const db = admin.database();
    const facilities = db.ref("/facilities/1");

    const facilityName = request.query.name;
    const bookAfterUse = request.query.bafu;
    const breakTimePerSlot = request.query.btps;
    const closingHours = request.query.ch;
    const currentStatus = request.query.cs;
    const isBookable = request.query.bookable;
    const openingHours = request.query.oh;
    const sessionTime = request.query.st;
    const advanceBookingFrom = request.query.abf;
    let flag: boolean = false;

    facilities.on('value',(snapshot) => {
        flag = snapshot.forEach((childsnapshot) => {
            if(childsnapshot.key === facilityName){
                flag = true;
                const facilityObject = {
                    book_after_use: bookAfterUse,
                    break_time_per_slot: breakTimePerSlot,
                    closing_hours: closingHours,
                    current_status: currentStatus,
                    isbookable: isBookable,
                    opening_hours: openingHours,
                    session_time: sessionTime,
                    to_open_before: advanceBookingFrom
                };
                facilities.child(facilityName).set(facilityObject)
            
                .then(function(){
                    //response.status(200).send(flag);
                })
            
                .catch(() => {
                    //response.status(200).send("failure");
                })
                return true;
            }
            else
                return false;
        })

        response.status(200).send(flag);
    });
  });


export const getFacilities = functions.https.onRequest((request,response) => {
    const db = admin.database();
    const facilities = db.ref("/facilities/");

    const societyId = request.query.societyid;
    let flag = false;

    facilities.on('value',(snapshot) => {
        flag = snapshot.forEach((childsnapshot) => {
            if(childsnapshot.key === societyId){
                response.status(200).send(childsnapshot.val());
                return true;
            }
            else{
                return false;
            }
        });
    });
    if(!flag){
        response.status(200).send("society Id not found");
    }
});


//delete facility and delete member baki aahe...zamla tar tu kar...me ui start karto