// EXPECTING THIS LINE OF CODE GLOBALLY AS ALL FUNCTION REQUIRE FIRESTORE ACCESS CAPABILITIES
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
const db = admin.firestore();

//ENDPOINT AUTHENTICATE//
exports.authenticate = functions.https.onRequest((req, res) => {
    try {
        if (req.method === "POST") {
            //Check if required keys are present
            const singpassID = req.body["singpassID"];
            const password = req.body["password"];
            

            //Either one not present send back 400
            if(singpassID === undefined || password === undefined){
                res.status(400).send("Bad request, one or more parameters are not provided");
                return;
            }

            //Database query
            const users = db.collection('users');
            const snapshot = await users.where('singpassID', '==', singpassID).where('password', '==', password).get();

            //Check if can find matching entry
            if (snapshot.empty) {

                //No results invalid singpassId or password, auth failed
                res.status(200).json({
                    "authStatus":"failed"
                });

                return;

            }else{
                let isSupervisor = false;
                //check if user is supervisor
                snapshot.docs.forEach(doc=>{
                    isSupervisor = doc.data()["isSupervisor"]
                }); 

                res.status(200).json({
                    "authStatus": (isSupervisor) ? "supervisor" :"nsmen"
                });

                return;
            }

        } else {
            res.status(403).send('Not a valid method');
            console.log("Invalid method",method);
            return;
        }

    } catch (err) {
        //we do not know what went wrong, send back 500
        res.status(500).send('Internal Server Error');
        console.log(err);
        return;
    }
});


//ENDPOINT GET TOTAL MILES//
exports.totalMiles = functions.https.onRequest((req, res) => {
    try {
        if (req.method === "GET") {
            //Check if required keys are present
            const singpassID = req.body["singpassID"];
            

            //params not present send back 400
            if(singpassID){
                res.status(400).send("Bad request, one or more parameters are not provided");
                return;
            }

            //Database query
            const users = db.collection('records');
            const snapshot = await users.where('singpassID', '==', singpassID).get();

                let totalMiles = 0;

                //Total up the miles columns of all records
                snapshot.docs.forEach(doc=>{
                    totalMiles += doc.data()["miles"]
                });

                res.status(200).json({
                    "totalMiles": totalMiles
                });

                return;

        } else {
            res.status(403).send('Not a valid method');
            console.log("Invalid method",method);
            return;
        }

    } catch (err) {
        //we do not know what went wrong, send back 500
        res.status(500).send('Internal Server Error');
        console.log(err);
        return;
    } 
});
