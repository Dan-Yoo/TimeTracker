import {intervalTime} from './index.js';
const tempStorageExpiry = 10000;
let tempStorage = {
    year: -1,
    month: -1,
    date: -1,
    data: {},
    expire: -1
};

const cache = {
    set: (windowData) => {
        const appName = windowData.owner.name;
        tempStorage.data[appName] = tempStorage.data[appName] ? (tempStorage.data[appName] + intervalTime) : intervalTime;
        tempStorage.expire = tempStorage.expire - intervalTime;
    },
    isExpired: () => {
        return tempStorage.expire <= 0 || new Date().getDate() != tempStorage.date;
    },
    reset: () => {
        const d = new Date();
        tempStorage = {
            year: d.getFullYear().toString(),
            month: d.getMonth().toString(),
            date: d.getDate().toString(),
            data: {},
            expire: tempStorageExpiry
        };
    },
    getAll: () => {
        return tempStorage;
    }
}

cache.reset();

export default cache;