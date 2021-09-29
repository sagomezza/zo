import { firestore } from '../firebase';
import * as Sentry from "@sentry/browser";
import store from '../store/index';
import * as actions from '../../redux/actions';
import moment from 'moment';

const getRecipsOfShift = (officialProps) => {
    const officialHq = officialProps.hq !== undefined ? officialProps.hq[0] : "";
    const email = officialProps.email !== undefined ? officialProps.email : "";

    if (officialProps.start) {
        if (officialProps.schedule.status !== "active") {
            // ??
        }
        // console.log(officialProps.schedule.status)
        let date = new Date((officialProps.start._seconds) * 1000)
        // console.log(date);
        firestore
            .collection('recips')
            .where('hqId', '==', officialHq)
            .where('officialEmail', '==', email)
            .where('dateFinished', '>=', date)
            .orderBy('dateFinished', 'desc')
            .get()
            .then(async (snapshot) => {
                try {
                    let recips = [];
                    if (!snapshot.empty) {
                        snapshot.forEach((doc) => {
                            let recipData = doc.data();
                            if (!recipData.mensuality && !recipData.prepayFullDay) {
                                recipData.id = doc.id;
                                recips.push(recipData);
                            }
                        });
                    }
                    firestore
                        .collection("recips")
                        .where("hqId", "==", officialHq)
                        .where("prepayFullDay", "==", true)
                        .where("officialEmail", "==", email)
                        .where("dateFactured", ">=", date)
                        .orderBy("dateFactured", "desc")
                        .get()
                        .then((snapshot) => {
                            if (!snapshot.empty) {
                                snapshot.forEach((doc) => {
                                    let recipData = doc.data();
                                    recipData.id = doc.id;
                                    recips.push(recipData);
                                });
                            }
                            firestore
                                .collection("recips")
                                .where("hqId", "==", officialHq)
                                .where("mensuality", "==", true)
                                .where("officialEmail", "==", email)
                                .where("dateStart", ">=", date)
                                .orderBy("dateStart", "desc")
                                .get()
                                .then((snapshot) => {
                                    if (!snapshot.empty) {
                                        snapshot.forEach((doc) => {
                                            let recipData = doc.data();
                                            recipData.id = doc.id;
                                            recips.push(recipData);
                                        });
                                    }
                                    firestore
                                        .collection("recips")
                                        .where("hqId", "==", officialHq)
                                        .where("blackList", "==", true)
                                        .where("officialEmail", "==", email)
                                        .where("dateFactured", ">=", date)
                                        .orderBy("dateFactured", "desc")
                                        .get()
                                        .then((snapshot) => {
                                            if (!snapshot.empty) {
                                                snapshot.forEach((doc) => {
                                                    let recipData = doc.data();
                                                    recipData.id = doc.id;
                                                    recips.push(recipData);
                                                });
                                            }
                                            if (recips.length === 0) {
                                                return ("No recips")

                                            } else {
                                                if (email) {
                                                    let filteredRecips = recips.filter((recip) => {
                                                        return (
                                                            recip.officialEmail === email
                                                        );
                                                    });
                                                    recips = [...filteredRecips];
                                                }
                                                recips.map((recip) => {
                                                    if (recip.dateFactured) {
                                                        recip.dateFactured = recip.dateFactured.nanoseconds
                                                            ? recip.dateFactured.toDate()
                                                            : recip.dateFactured;
                                                    } else {
                                                        recip.dateStart = recip.dateStart.nanoseconds
                                                            ? recip.dateStart.toDate()
                                                            : recip.dateStart;
                                                        recip.dateFinished = recip.dateFinished.nanoseconds
                                                            ? recip.dateFinished.toDate()
                                                            : recip.dateFinished;
                                                        if (recip.totalTime)
                                                            recip.totalTime = recip.totalTime.nanoseconds
                                                                ? recip.totalTime.toDate()
                                                                : recip.totalTime;
                                                    }
                                                });
                                                recips.sort((a, b) => {
                                                    if (
                                                        (a.mensuality || a.prepayFullDay) &&
                                                        !b.mensuality
                                                    ) {
                                                        return b.dateFinished - a.dateStart;
                                                    } else if (
                                                        (b.mensuality || b.prepayFullDay) &&
                                                        !a.mensuality
                                                    ) {
                                                        return b.dateStart - a.dateFinished;
                                                    } else if (
                                                        (a.mensuality || a.prepayFullDay) &&
                                                        (b.mensuality || b.prepayFullDay)
                                                    ) {
                                                        return b.dateStart - a.dateStart;
                                                    } else if (
                                                        (a.blacklist || a.prepayFullDay) &&
                                                        (b.blacklist || b.prepayFullDay)
                                                    ){ 
                                                        return b.dateStart - a.dateFactured
                                                    }
                                                    else {
                                                        return b.dateFinished - a.dateFinished;
                                                    }
                                                });

                                                // if (parameter.limit) {
                                                //   resolve({
                                                //     data: {
                                                //       total: recips.slice(0, parameter.limit),
                                                //     },
                                                //   });
                                                // } else {

                                                // }
                                                store.dispatch(actions.setRecips(recips));
                                            }
                                        })
                                        .catch((err) => {
                                            // Sentry.captureException(err);
                                            console.log(err);
                                            return ("Error getting blacklist documents", err)
                                        })

                                })
                                .catch((err) => {
                                    // Sentry.captureException(err);
                                    console.log(err);
                                    return ("Error getting mensuality documents", err)
                                })
                        })
                        .catch((err) => {
                            // Sentry.captureException(err);
                            console.log(err);
                            return ("Error getting mensuality documents", err)
                        })
                } catch (err) {

                }
            })
            .catch((err) => {
                // Sentry.captureException(err);
                console.log(err);
                return ("Error getting documents", err)
            });

    }

}

export default getRecipsOfShift;