import { firestore } from '../firebase';
import * as Sentry from "@sentry/browser";
import store from '../store/index';
import * as actions from '../../redux/actions';

const readHqInfo = (hqId) => {
    firestore
        .collection('headquarters')
        .doc(hqId)
        .get()
        .then(doc => {
            let data = doc.data()
            data.id = doc.id
            data.occupiedCars = data.totalCars - data.availableCars
            data.occupiedBikes = data.totalBikes - data.availableBikes
            if (data.monthlyAffects) {
                data.availableCars -= data.monthlyCarUsers
                data.availableBikes -= data.monthlyBikeUsers
            }
            if (data.reservations && data.reservations.length && data.reservations.length > 0) {
                data.reservations.map(reserve => {
                    reserve.dateStart = reserve.dateStart.toDate()
                })
                data.reservations.sort((a, b) => {
                    return b.dateStart - a.dateStart
                })
            }
            store.dispatch(actions.setHq(data));
            store.dispatch(actions.setReservations(data.reservations));
        })
        .catch(err => {
            Sentry.captureException(err);
            console.log(err)
            // return ("Error getting document", err)

        })


};

export default readHqInfo;