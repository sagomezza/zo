import { firebase } from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
import "@firebase/firestore"
import service_account from "./service_account_dev.json";

firebase.initializeApp(service_account);

const auth = firebase.auth();
// const database = firebase.database();
const firestore = firebase.firestore();

export { auth, firestore };
export default firebase;
