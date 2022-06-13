
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors');

async function userSnapshot(driverID) {
  try {
    supervisorSnapshot = await users.where('driverID', '==', driverID).get();
    return supervisorSnapshot.data()['fullName'];

  } catch (err) {
    res.status(500).send('Internal Server Error');
    console.log(err);
    return;
  }
  }

exports.provideRecords = functions.https.onRequest((req, res) => {
  try {
    if (req.method === `GET`) {
      const singpassID = req.body.singpassID;
      const totalNSFRecord = []
      const records = db.collection('records');
      const users = db.collection('users');

      if (req.data.authStatus === `supervisor`) {

        const snapshot = async() => {
          await records.get();
        }

        if (snapshot.empty) {
          res.status(500).send('Internal Server Error');
          console.log(err);
          return;

        } else {

          snapshot.docs.forEach(doc => {
            totalNSFRecords.append({
              date: doc.data()[`date`],
              fullName: userSnapshot(doc.data()['driverID']),
              miles: doc.data()[`miles`],
              comments: doc.data()[`comments`]
            })})
        }

          res.status(200).json(totalNSFRecords);

      } else if (req.body.authStatus === `nsmen`) {
          const singpassID = req.body.singpassID;
          //Possible Bug here with const
          const snapshot = async() => {
                  await records.where('singpassID', '==', singpassID);
              }

          snapshot.docs.forEach(doc => {
            totalNSFRecords.append({
              date: doc.data()[`date`],
              miles: doc.data()[`miles`]
          })})

          res.status(200).json(totalNSFRecords);

      } else {
        res.status(403).send('Forbidden');
        return;
      }

    } else {
      res.status(403).send('Forbidden');
      return;
    }
  } catch(err) {
    res.status(500).send('Internal Server Error');
    console.log(err);
    return;
  }
})

exports.provideRecords = functions.https.onCall((data, context) => {
  try {
    if (data.method === `POST`) {

      const records = db.collection(`records`);

      db.collection(`records`).add({
        date: data.body.date,
        driverID: data.body.driverID,
        miles: data.body.miles,
        comments: data.body.context
      })

      context.send(`success`);

      return;

    } else {
      res.status(403).send('Forbidden');
      return;
    }
  } catch(err) {
    res.status(500).send('Internal Server Error');
    console.log(err);
    return;
  }
})
