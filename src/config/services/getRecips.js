import { firestore } from '../firebase';
import * as actions from "../../redux/actions";
import store from '../../config/store';
import * as Sentry from "@sentry/browser";


const getRecipsOfShift = (officialProps) => {
    const officialHq = officialProps.hq !== undefined ? officialProps.hq[0] : "";

    if (officialProps.start) {
        if (officialProps.schedule.status !== "active") {
            // ??
        }
        let date = moment(new Date(officialProps.start._seconds) * 1000)
            .tz("America/Bogota")
            .toDate();
        firestore
            .collection("recips")
            .where("hqId", "==", officialHq)
            .where("officialEmail", "==", officialProps.email)
            .where("dateFinished", ">=", date)
            .orderBy("dateFinished", "desc")
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
                        .where("officialEmail", "==", officialProps.email)
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
                                .where("officialEmail", "==", officialProps.email)
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
                                    if (recips.length === 0) {
                                        setLoadingRecips(false);

                                    } else {
                                        if (officialProps.email) {
                                            let filteredRecips = recips.filter((recip) => {
                                                return (
                                                    recip.officialEmail === officialProps.email
                                                );
                                            });
                                            recips = [...filteredRecips];
                                        }
                                        recips.map((recip) => {
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
                                            } else {
                                                return b.dateFinished - a.dateFinished;
                                            }
                                        });
                                        // store.dispatch(actions.setRecips(recips));

                                        // if (parameter.limit) {
                                        //   resolve({
                                        //     data: {
                                        //       total: recips.slice(0, parameter.limit),
                                        //     },
                                        //   });
                                        // } else {

                                        // }
                                        return recips;
                                    }
                                });
                        });
                } catch (err) {
                    Sentry.captureException(err);
                    // console.log(err);
                }
            })
            .catch((err) => {
                Sentry.captureException(err);
            });

    }

}

export default getRecipsOfShift;