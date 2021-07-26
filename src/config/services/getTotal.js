import { GET_USER_COUPONS, READ_HQ } from '../api';
import instance from "../axios";
import moment from 'moment-timezone';

const getTotal = async (phone, vehicleType, hqId, parkingType, verificationCode) => {
    console.log(phone, vehicleType, hqId, parkingType, verificationCode)

    try {
        const hqInfo = await instance.post(READ_HQ, {
            id: hqId,
        })
    } catch (err) {
        console.log(err?.response)
    }

    try {
        const coupons = await instance.post(GET_USER_COUPONS, {
            phone: phone,
            promotionType: "discount",
        })
    } catch (err) {
        console.log(err?.response)

    }

    console.log('HQINFO', hqInfo.data.reservations)
    let reservations = hqInfo.data.reservations;
    if (reservations.length === 0) {
        return `The HQ doesn't have any user parked`;
    }

    let coupon;
    if (coupons.data.response === 1) {
        coupon = coupons.coupons.find(
            (coupon) => coupon.hqId === hqId && coupon.isValid
        );
        if (parkingType === 'monthly') {
            if (vehicleType === 'car') {
                total = hqInfo.data.monthlyCarPrice;
                total = total - (total * parseFloat(coupon.value.car.month)) / 100.0;
                return total;
            } else {
                total = hqInfo.data.monthlyBikePrice;
                total = total - (total * parseFloat(coupon.value.bike.month)) / 100.0;
                return total;
            }
        } else {
            coupon = coupons.coupons.find(
                (coupon) => coupon.hqId === hqId && coupon.isValid
            );

            let currentReserve;
            if (phone)
                currentReserve = reservations.find(
                    (reserve) => reserve.phone === phone
                );
            else if (verificationCode)
                currentReserve = reservations.find(
                    (reserve) =>
                        reserve.verificationCode === verificationCode
                );
            if (currentReserve) {
                if (currentReserve.prepayFullDay) {
                    currentReserve.total = 0;
                    currentReserve.hours = 24;
                    currentReserve.dateStart = currentReserve.dateStart.toDate()
                    return;
                }
                let dateFinished = moment().tz("America/Bogota");
                let dateStart = moment(currentReserve.dateStart.toDate()).tz(
                    "America/Bogota"
                );
                currentReserve.totalTime = moment(dateFinished.diff(dateStart));
                let diff = moment.duration(dateFinished.diff(dateStart));
                let hours = diff.asHours();
                let minutes = diff.asMinutes();
                let days = diff.asDays();
                let total = 0;
                if (!currentReserve.mensuality) {
                    if (days >= 1) {
                        if (currentReserve.type === "car")
                            total = hqInfo.data.dailyCarPrice * Math.floor(days);
                        total = total - (total * parseFloat(coupon.value.car.day)) / 100.0;
                        if (currentReserve.type === "bike")
                            total = hqInfo.data.dailyBikePrice * Math.floor(days);
                        total = total - (total * parseFloat(coupon.value.bike.day)) / 100.0;
                        let residualHours = hours - 24 * Math.floor(days);
                        if (
                            (residualHours >= 5 && residualHours <= 24) ||
                            (Math.floor(residualHours) === 4 && diff.minutes() > 31)
                        ) {
                            if (currentReserve.type === "car")
                                total += hqInfo.data.dailyCarPrice;
                            total = total - (total * parseFloat(coupon.value.car.day)) / 100.0;
                            if (currentReserve.type === "bike")
                                total += hqInfo.data.dailyBikePrice;
                            total = total - (total * parseFloat(coupon.value.bike.day)) / 100.0;
                        } else if (residualHours >= 1 && residualHours < 5) {
                            if (currentReserve.type === "car")
                                total +=
                                    Math.floor(residualHours) * hqInfo.data.hourCarPrice;
                            total = total - (total * parseFloat(coupon.value.bike.hours)) / 100.0;
                            if (currentReserve.type === "bike")
                                total +=
                                    Math.floor(residualHours) * hqInfo.data.hourBikePrice;
                            total = total - (total * parseFloat(coupon.value.bike.day)) / 100.0;
                            if (
                                diff.minutes() > 5 &&
                                diff.minutes() <= 30 &&
                                residualHours < 1
                            ) {
                                if (currentReserve.type === "car")
                                    total += hqInfo.data.fractionCarPrice;
                                if (currentReserve.type === "bike")
                                    total += hqInfo.data.fractionBikePrice;
                            } else if (diff.minutes() > 31) {
                                if (currentReserve.type === "car")
                                    total += hqInfo.data.hourCarPrice;
                                total = total - (total * parseFloat(coupon.value.car.hours)) / 100.0;
                                if (currentReserve.type === "bike")
                                    total += hqInfo.data.hourBikePrice;
                                total = total - (total * parseFloat(coupon.value.bike.hours)) / 100.0;
                            }
                        } else {
                            if (minutes <= 5 && minutes >= 0 && hours < 1) {
                                total += 0;
                            } else if (minutes > 5 && minutes <= 30 && hours < 1) {
                                if (currentReserve.type === "car")
                                    total += hqInfo.data.fractionCarPrice;
                                if (currentReserve.type === "bike")
                                    total += hqInfo.data.fractionBikePrice;
                            } else {
                                if (currentReserve.type === "car")
                                    total += hqInfo.data.hourCarPrice;
                                total = total - (total * parseFloat(coupon.value.car.hours)) / 100.0;
                                if (currentReserve.type === "bike")
                                    total += hqInfo.data.hourBikePrice;
                                total = total - (total * parseFloat(coupon.value.bike.hours)) / 100.0;
                            }
                        }
                        return total;
                    } else {
                        if (
                            (hours >= 5 && hours <= 24) ||
                            (Math.floor(hours) === 4 && diff.minutes() > 31)
                        ) {
                            if (currentReserve.type === "car")
                                total = hqInfo.data.dailyCarPrice;
                            total = total - (total * parseFloat(coupon.value.car.day)) / 100.0;
                            if (currentReserve.type === "bike")
                                total = hqInfo.data.dailyBikePrice;
                            total = total - (total * parseFloat(coupon.value.bike.day)) / 100.0;
                        } else if (hours >= 1 && hours < 5) {
                            if (currentReserve.type === "car")
                                total = hqInfo.data.hourCarPrice * Math.floor(hours);
                            total = total - (total * parseFloat(coupon.value.car.hours)) / 100.0;
                            if (currentReserve.type === "bike")
                                total = hqInfo.data.hourBikePrice * Math.floor(hours);
                            total = total - (total * parseFloat(coupon.value.bike.hours)) / 100.0;
                            if (diff.minutes() >= 0 && diff.minutes() <= 30) {
                                if (currentReserve.type === "car")
                                    total += hqInfo.data.fractionCarPrice;
                                if (currentReserve.type === "bike")
                                    total += hqInfo.data.fractionBikePrice;
                            } else if (diff.minutes() > 31) {
                                if (currentReserve.type === "car")
                                    total += hqInfo.data.hourCarPrice;
                                total = total - (total * parseFloat(coupon.value.car.hours)) / 100.0;
                                if (currentReserve.type === "bike")
                                    total += hqInfo.data.hourBikePrice;
                                total = total - (total * parseFloat(coupon.value.bike.hours)) / 100.0;
                            }
                        } else {
                            if (minutes <= 5 && minutes >= 0 && hours < 1) {
                                total = 0;
                            } else if (minutes > 5 && minutes <= 30 && hours < 1) {
                                if (currentReserve.type === "car")
                                    total = hqInfo.data.fractionCarPrice;
                                if (currentReserve.type === "bike")
                                    total = hqInfo.data.fractionBikePrice;
                            } else {
                                if (currentReserve.type === "car")
                                    total = hqInfo.data.hourCarPrice;
                                total = total - (total * parseFloat(coupon.value.car.hours)) / 100.0;
                                if (currentReserve.type === "bike")
                                    total = hqInfo.data.hourBikePrice;
                                total = total - (total * parseFloat(coupon.value.bike.hours)) / 100.0;
                            }
                        }
                        return total;
                    }
                }
                currentReserve.total = total;
                currentReserve.hours = hours;
                currentReserve.dateStart = currentReserve.dateStart.toDate();
            } else {
                return 'Error has been ocurred';
            }
        }

    } else {
        if (parkingType === 'monthly') {
            if (vehicleType === 'car') {
                total = hqInfo.data.monthlyCarPrice;
                return total;
            } else {
                total = hqInfo.data.monthlyBikePrice;
                return total;
            }
        } else {
            let currentReserve;
            if (phone)
                currentReserve = reservations.find(
                    (reserve) => reserve.phone === phone
                );
            else if (verificationCode)
                currentReserve = reservations.find(
                    (reserve) =>
                        reserve.verificationCode === verificationCode
                );
            if (currentReserve) {
                if (currentReserve.prepayFullDay) {
                    currentReserve.total = 0;
                    currentReserve.hours = 24;
                    currentReserve.dateStart = currentReserve.dateStart.toDate();
                    resolve({ response: 1, data: currentReserve });
                    return;
                }
                let dateFinished = moment().tz("America/Bogota");
                let dateStart = moment(currentReserve.dateStart.toDate()).tz(
                    "America/Bogota"
                );
                currentReserve.totalTime = moment(dateFinished.diff(dateStart));
                let diff = moment.duration(dateFinished.diff(dateStart));
                let hours = diff.asHours();
                let minutes = diff.asMinutes();
                let days = diff.asDays();
                let total = 0;
                if (!currentReserve.mensuality) {
                    if (days >= 1) {
                        if (currentReserve.type === "car")
                            total = hqInfo.data.dailyCarPrice * Math.floor(days);
                        if (currentReserve.type === "bike")
                            total = hqInfo.data.dailyBikePrice * Math.floor(days);
                        let residualHours = hours - 24 * Math.floor(days);
                        if (
                            (residualHours >= 5 && residualHours <= 24) ||
                            (Math.floor(residualHours) === 4 && diff.minutes() > 31)
                        ) {
                            if (currentReserve.type === "car")
                                total += hqInfo.data.dailyCarPrice;
                            if (currentReserve.type === "bike")
                                total += hqInfo.data.dailyBikePrice;
                        } else if (residualHours >= 1 && residualHours < 5) {
                            if (currentReserve.type === "car")
                                total +=
                                    Math.floor(residualHours) * hqInfo.data.hourCarPrice;
                            if (currentReserve.type === "bike")
                                total +=
                                    Math.floor(residualHours) * hqInfo.data.hourBikePrice;
                            if (
                                diff.minutes() > 5 &&
                                diff.minutes() <= 30 &&
                                residualHours < 1
                            ) {
                                if (currentReserve.type === "car")
                                    total += hqInfo.data.fractionCarPrice;
                                if (currentReserve.type === "bike")
                                    total += hqInfo.data.fractionBikePrice;
                            } else if (diff.minutes() > 31) {
                                if (currentReserve.type === "car")
                                    total += hqInfo.data.hourCarPrice;
                                if (currentReserve.type === "bike")
                                    total += hqInfo.data.hourBikePrice;
                            }
                        } else {
                            if (minutes <= 5 && minutes >= 0 && hours < 1) {
                                total += 0;
                            } else if (minutes > 5 && minutes <= 30 && hours < 1) {
                                if (currentReserve.type === "car")
                                    total += hqInfo.data.fractionCarPrice;
                                if (currentReserve.type === "bike")
                                    total += hqInfo.data.fractionBikePrice;
                            } else {
                                if (currentReserve.type === "car")
                                    total += hqInfo.data.hourCarPrice;
                                if (currentReserve.type === "bike")
                                    total += hqInfo.data.hourBikePrice;
                            }
                        }
                        return total;
                    } else {
                        if (
                            (hours >= 5 && hours <= 24) ||
                            (Math.floor(hours) === 4 && diff.minutes() > 31)
                        ) {
                            if (currentReserve.type === "car")
                                total = hqInfo.data.dailyCarPrice;
                            if (currentReserve.type === "bike")
                                total = hqInfo.data.dailyBikePrice;
                        } else if (hours >= 1 && hours < 5) {
                            if (currentReserve.type === "car")
                                total = hqInfo.data.hourCarPrice * Math.floor(hours);
                            if (currentReserve.type === "bike")
                                total = hqInfo.data.hourBikePrice * Math.floor(hours);
                            if (diff.minutes() >= 0 && diff.minutes() <= 30) {
                                if (currentReserve.type === "car")
                                    total += hqInfo.data.fractionCarPrice;
                                if (currentReserve.type === "bike")
                                    total += hqInfo.data.fractionBikePrice;
                            } else if (diff.minutes() > 31) {
                                if (currentReserve.type === "car")
                                    total += hqInfo.data.hourCarPrice;
                                if (currentReserve.type === "bike")
                                    total += hqInfo.data.hourBikePrice;
                            }
                        } else {
                            if (minutes <= 5 && minutes >= 0 && hours < 1) {
                                total = 0;
                            } else if (minutes > 5 && minutes <= 30 && hours < 1) {
                                if (currentReserve.type === "car")
                                    total = hqInfo.data.fractionCarPrice;
                                if (currentReserve.type === "bike")
                                    total = hqInfo.data.fractionBikePrice;
                            } else {
                                if (currentReserve.type === "car")
                                    total = hqInfo.data.hourCarPrice;
                                if (currentReserve.type === "bike")
                                    total = hqInfo.data.hourBikePrice;
                            }
                        }
                        return total;
                    }
                }
                currentReserve.total = total;
                currentReserve.hours = hours;
                currentReserve.dateStart = currentReserve.dateStart.toDate();
            } else {
                return 'Error has been ocurred'
            }
        }
    }
};

export default getTotal;