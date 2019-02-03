const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.onItemCreate = functions.firestore.document('Items/{itemId}').onCreate((snap, context) => {
  const ref = db.collection('Counters').doc('Items');
  return incrementCounter(ref, 10)
    .then(() =>
      getCount(ref).then(count =>
        ref
          .update({
            count
          })
          .catch(err => {
            console.log('err', err);
          })
      )
    )
    .catch(err => {
      console.log('Error: ', err);
    });
});

function createCounter(ref, numShards) {
  const batch = db.batch();
  // Initialize the counter document
  batch.set(ref, {
    numShards
  });
  // Initialize each shard with count=0
  for (let i = 0; i < numShards; i += 1) {
    const shardRef = ref.collection('shards').doc(i.toString());
    batch.set(shardRef, {
      count: 0
    });
  }
  // Commit the write batch
  return batch.commit();
}

function updateCountTransaction(shardRef) {
  return db.runTransaction(t =>
    t.get(shardRef).then(doc => {
      const newCount = doc.data().count + 1;
      t.update(shardRef, {
        count: newCount
      });
      return newCount;
    })
  );
}

// Will Increment The Random Sharding Count to 1
function incrementCounter(ref, numShards) {
  // Select a shard of the counter at random
  const shardId = Math.floor(Math.random() * numShards).toString();
  const shardRef = ref.collection('shards').doc(shardId);
  return shardRef.get().then(result => {
    if (result.exists) {
      return updateCountTransaction(shardRef);
    }
    return createCounter(ref, numShards).then(() => updateCountTransaction(shardRef));
  });
  // Update count in a transaction
}

// Will Get The Count
function getCount(ref) {
  // Sum the count of each shard in the subcollection
  return ref
    .collection('shards')
    .get()
    .then(snapshot => {
      let totalCount = 0;
      snapshot.forEach(doc => {
        totalCount += doc.data().count;
      });
      return totalCount;
    });
}
