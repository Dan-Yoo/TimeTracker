import cache from './cache.js';
import admin from 'firebase-admin';
import serviceAccount from '../firestore-credentials.json';
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

const store = {
    set : async (windowData) => {
        if (cache.isExpired()) {
            pushData(cache.getAll());
            cache.reset();
        }

        cache.set(windowData);
    }
}

const pushData = async (data) => {
    for (let key in data.data) {
        const docRef = db.collection(data.year)
            .doc(data.month)
            .collection(data.date)
            .doc(key);
    
        const snapshot = await docRef.get()
        const result = snapshot.data() || {time: 0};
    
        docRef.set({
            time: (result.time + data.data[key])
        });   
    }
}

export default store;

// "start": "nodemon --exec babel-node src/index.js | npm start -prefix web",