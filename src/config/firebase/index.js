import { firebase } from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
import "@firebase/firestore";
import "@firebase/storage";
import service_account from "./service_account_dev.json";

// const database = firebase.database();

if (!firebase.apps.length) {
    firebase.initializeApp(service_account);
 }else {
    firebase.app(); // if already initialized, use that one
 }

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export { auth, firestore, storage };
export default firebase;
