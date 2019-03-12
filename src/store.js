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
        try {
            const docRef = db.collection(data.year)
                .doc(data.month)
                .collection(data.date)
                .doc(key);
        
            const snapshot = await docRef.get()
            const result = snapshot.data() || {time: 0};
        
            docRef.set({
                time: (result.time + data.data[key])
            });   
        } catch(e) {
            console.error("There was an error with trying to push data : ", data);
        }
    }
}

export default store;