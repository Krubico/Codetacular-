const { db } = require("./Firebase/init");

//ENDPOINT AUTHENTICATE//
exports.authenticate = async (req, res) => {
    try {
        if (req.method === "POST") {
            //Check if required keys are present

            const singpassID = req.body["singpassID"];
            const password = req.body["password"];


            //Either one not present send back 400
            if (singpassID === undefined || password === undefined) {
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
                    "authStatus": "failed"
                });

                return;

            } else {
                let isSupervisor = false;
                //check if user is supervisor
                snapshot.docs.forEach(doc => {
                    isSupervisor = doc.data()["isSupervisor"]
                });

                res.status(200).json({
                    "authStatus": (isSupervisor) ? "supervisor" : "nsmen"
                });

                return;
            }

        } else {
            res.status(403).send('Not a valid method');
            console.log("Invalid method", method);
            return;
        }

    } catch (err) {
        //we do not know what went wrong, send back 500
        res.status(500).send('Internal Server Error');
        console.log(err);
        return;
    }
};


//ENDPOINT GET TOTAL MILES//
exports.totalMiles = async (req, res) => {
    try {
        if (req.method === "GET") {
            //Check if required keys are present
            const driverID = req.query["driverID"];


            //params not present send back 400
            if (driverID === undefined) {
                res.status(400).send("Bad request, one or more parameters are not provided");
                return;
            }

            //Database query
            const users = db.collection('records');
            const snapshot = await users.where('driverID', '==', driverID).get();

            let totalMiles = 0;

            //Total up the miles columns of all records
            snapshot.docs.forEach(doc => {
                totalMiles += doc.data()["miles"]
            });

            res.status(200).json({
                "totalMiles": totalMiles
            });

            return;

        } else {
            res.status(403).send('Not a valid method');
            console.log("Invalid method", method);
            return;
        }

    } catch (err) {
        //we do not know what went wrong, send back 500
        res.status(500).send('Internal Server Error');
        console.log(err);
        return;
    }
};




async function userSnapshot(driverID) {
    console.log(driverID);
    const users = db.collection('users');

    supervisorSnapshot = await users.where('singpassID', '==', driverID).get();

    let fullname = "";

    supervisorSnapshot.docs.forEach(doc => {
        fullname = doc.data()['fullName']
    })

    return fullname;
}

exports.provideRecords = async (req, res) => {
    try {
        if (req.method === `GET`) {
            const singpassID = req.query["singpassID"];
            const authStatus =  req.query["authStatus"];


            const totalNSFRecords = [];
            const records = db.collection('records');

            if (authStatus === `supervisor`) {

                const snapshot = await records.get();

                if (snapshot.empty) {
                    res.status(500).send('Internal Server Error');
                    console.log(err);
                    return;

                } else {
                    console.log(snapshot);
                    snapshot.docs.forEach(async doc => {

                        const today = doc.data()[`date`];

                        totalNSFRecords.push({
                            date: today,
                            fullName: doc.data()['driverID'],
                            miles: doc.data()[`miles`],
                            comments: doc.data()[`comments`]
                        })
                    })
                }
                for (let index = 0; index < totalNSFRecords.length; index++) {
                    const driverid = totalNSFRecords[index]["fullName"];
                    const fullName = await userSnapshot(driverid);
                    totalNSFRecords[index]["fullName"] = fullName;
                }


                res.status(200).json(totalNSFRecords);

            } else if (authStatus === `nsmen`) {
                snapshot = await records.where('driverID', '==', singpassID).get();

                snapshot.docs.forEach(doc => {

                    const today = doc.data()[`date`]

                    totalNSFRecords.push({
                        supervisorName: doc.data()[`supervisorName`],
                        date: today,
                        miles: doc.data()[`miles`]
                    })
                })

                res.status(200).json(totalNSFRecords);

            } else {
                res.status(400).send("Bad request");
                return;
            }

        } else {
            res.status(403).send('Forbidden');
            return;
        }
    } catch (err) {
        res.status(500).send('Internal Server Error');
        console.log(err);
        return;
    }
}

exports.addRecords = async (data, context) => {
    try {
        if (data.method === `POST`) {

            const records = db.collection(`records`);

            db.collection(`records`).add({
                supervisorName: data.body.supervisorName,
                date: data.body.date,
                driverID: data.body.driverID,
                miles: data.body.miles,
                comments: data.body.comments
            })

            context.send(`success`);

            return;

        } else {
            context.status(403).send('Forbidden');
            return;
        }
    } catch (err) {
        context.status(500).send('Internal Server Error');
        console.log(err);
        return;
    }
}

