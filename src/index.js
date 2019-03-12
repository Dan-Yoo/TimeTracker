import activeWin from 'active-win';
import store from './store.js';
export const intervalTime = 1000;

const main = async () => {
    mainInterval();
}

const mainInterval = async () => {
    const windowData = await activeWin();
    store.set(windowData);
    setTimeout(mainInterval, intervalTime);
}

main();