//------------------------ADMIN------------------------

export const READ_ADMIN = "/readAdmin";
/*
PARAMS: email
email.length === 0  : response: -1, message: `Error: Empty object`
!email              : response: -1, message: `Missing data: email`
email not found     : response: -1, message: `Admin not found`
email found         : response: 1, message: `Admin found succesfully`, data: data
err                 : response: 0, err
*/

export const READ_CORPO = "/readCorporation";
/*
PARAMS: name & id

if name :
name.length  === 0  : response: -1, message: `Error: Empty object`
!name && !id        : response: -1, message: `Missing data: name or id`
name not found      : response: -1, message: `Corporation by name not found`
name found          : response: 1, message: `Corporation found succesfully`, data: data
err                 : response: 0, err
sets data id with doc id...

else: (uses id)
!doc.exists         : response: -1, err: "Corporation by id not found!"
doc.exists          : response: 1, message: `Corporation found succesfully`, data: data
err                 : response: 0, err


*/
export const REVOKE_CURRENT_SESSIONS = "/revoke_current_sessions";
/*
PARAMS: uid, deviceId
*/

//------------------------HQ's------------------------

export const READ_HQ = "/readHq";
/*
PARAMS: id of hq, corp name
no params           : response: -1, message: `Error: Empty object`
!id && !name        : response: -1, message: `Missing data: id or name`

if id:
!doc.exists         : response: -1, err: "Hq not found!"
hq found            : response: 1, message: `Hq found succesfully`, data: data
err                 : response: 0, err

else: (uses name)
name not found      : response: -1, message: `HQ not found`
err                 : response: 0, err
*/

//------------------------OFFICIAL------------------------

export const READ_OFFICIAL = "/readOfficial";
/* 
PARAMS: email
email.length === 0   : response: -1, message: `Error: Empty object`
!email               : response: -1, message: `Missing data: email`
email not found      : response: -1, message: `Official not found`
email found          : response: 1, message: `Official found succesfully`, data: data
err                  : response: 0, err
 */

export const MARK_END_OF_SHIFT = "/markEndOfShift";
/*
PARAMS: email, id, date, total, input, base, hqId, macAddress, uid, deviceId
!email              : response: -1, message: `Missing data: email`
!id                 : response: -1, message: `Missing data: id`
!total && Number(total) !== Number(0) : response: -1, message: `Missing data: total`
!input && Number(input) !== Number(0) : response: -1, message: `Missing data: input`
!base && Number(base) !== Number(0) : response: -1, message: `Missing data: base`
!hqId               : response: -1, message: `Missing data: hqId`
!macAddress         : response: -1, message: `Missing data: macAddress`
data.id !== id      : response: -2, message: "The id doesnt' correspond to official's id"
hqId not foun       : response: -2, message: `Bad hqId`
shift finished      : response: 1, message: "Shift finished"
err                 : response: 0, err 
*/

export const START_SHIFT = "/startShift";
/*
PARAMS : email, date
email.length === 0  : response: -1, message: `Error: Empty object`
!email              : response: -1, message: `Missing data: email`
shit start          : response: 1, message: "Shift started"
err                 : 
*/

export const EDIT_OFFICIAL = "/editOfficial";
/*
PARAMS: id, expoToken
no params           : response: -1, message: `Error: Empty object`
!id                 : response: -1, message: `Missing data: id`
update              : response: 1, message: `Official updated succesfully`
err                 : response: 0, err
*/
export const CREATE_NEWS_REPORT = "/createNewsReport";
/*
PARAMS: officialEmail, report, hqId
no params           : response: -1, message: `Missing all parameters`
!officialEmail      : response: -1, message: `Missing parameter: officialEmail`
!report             : response: -1, message: `Missing parameter: report`
!hqId               : response: -1, message: `Missing parameter: hqIds`
report              : response: 1, message: `Report stored`, id: response.id
err                 : response: -2, message: `Something bad happened`
*/

//------------------------RECIPS------------------------

export const GET_RECIPS = "/getRecips";
/*
PARAMS: officialEmail, hqId
no params           : response: -1, message: `Error: Empty object`
!hqId && !officialEmail : response: -1, message: `Missing data: hqId or officialEmail`
email not active    : response: -3, message: `The official {email} isn't in active shift.`
recips.length === 0 : response: -1, message: `Recips not found`
recips              : response: 1, message: `Recips found`, data: recips
err                 : response: 0, err 
*/

export const GET_RECIPS_BY_PLATE = "/getRecipsByPlate";
/*
PARAMS: plate, limit
no params           : response: -1, message: `Error: Empty object`
!plate              : response: -1, message: `Missing data: plate`
plate not found     : response: -1, message: `Recips not found`
limit recips        : response: 1, message: `Recips found succesfully`, data: recips.slice(0, parameter.limit),
recips              : response: 1, message: `Recips found succesfully`, data: recips
err                 : response: 0, err
*/

export const GET_SHIFT_RECIPS = "/getShiftRecips";
/*
PARAMS: email, hqId, date
no params           :  response: -1, message: `Error: Empty object`
!email              : response: -1, message: `Missing data: email`
!hqId               : response: -1, message: `Missing data: hqId`
officialData.schedule.status !== "active" : response: -3, message: `The official {email} isn't in active shift.`
recips.length === 0 : response: -1, message: `Recips not found`
recips              : response: 1, message: `Recips found succesfully`, data: { total, recips },
err                 : response: 0, err
official no sche    : response: -2, message: `The official {email} doesn't have any schedule programmed`
*/

export const PAY_DEBTS = '/payDebts';
/*
PARAMS: hqId, plate, value
no params           : response: -1, message: `Error: Empty object`
!param              : response: -1, message: `Missing data: param`
success             : response: 1, message: `BL payed`, data
err                 : --
*/
export const LIST_HQ_DEBTS = '/listHQDebts';
/*
PARAMS: hqId
no aprams           : response: -1, message: `Error: Empty object`
!hqId               : response: -1, message: `Missing data: hqId`
bl not found        : response: -1, message: `Bl not found`
bl found            : response: 1, message: `BL found`, data: bl
err                 : --
*/

//------------------------PARKING PROCESS------------------------

export const START_PARKING = "/startParking";
/*
PARAMS: plate, hqId, dateStart, phone, prepayFullDay, officialEmail, type, cash, change
no params           : response: -1, message: `Error: Empty object`
!param              : response: -1, message: `Missing data: param` 
type === "car" && resultHq.data.availableCars === 0 : response: -3, message: `No more available car parks`
type === "bike" && resultHq.data.availableCars === 0 : response: -4, message: `No more available bike parks`
plate park successs : response: 2, message: `The plate {parameter.plate} started parking`
plate already parked: response: -2, message: `The plate {plate} is already parked`
Qr already parked   : response: -2, message: `This QR is already assigned`
prepayDay startPark : response: 2, message: `The plate {plate} started parking again (prepaid day)`
paranoic startPark  : response: 1, message: `The user {plate} started succesfully the parking time`
err                 : response: 0 
*/

export const CHECK_PARKING = "/checkParking";
/*
PARAMS: plate, hqId, phone, officialEmail, dateFinished, prepaidDay, verificationCode
no params           : response: -1, message: `Error: Empty object`
!param              : response: -1, message: `Missing data: param`
hq doc not found    : response: -1, err: "Hq not found!"
reservations.length === 0 : response: -2, message: `The HQ doesn't have any user parked`
reserv found with verificationCode : response: 1, data: currentReserve
recip generated     : response: 1, message: `Recip generated`, data
verificationCode incorrect: response: -3,  message: `ALERT: The verification code you sent doesn't match with the one generated for the parking!`,
not found           : response: -2, message: "Reservation not found" 
err                 : response: 0, err
*/

export const FINISHPARKING = "/finishParking";
/*
PARAMS: plate, hqId, phone, paymentType, total, cash, change, status, isParanoic, officialEmail, dateFinished, dateStart
no params           : response: -1, message: `Error: Empty object`
!param              : response: -1, message: `Missing data: param`
if status !== 'payed', 'partial-pending', 'pending':  response: -1, message: `Bad data: status`
!num && Number(num) !== Number(0) : response: -1, message: `Missing data: num` 
*/

//------------------------BOX------------------------

export const CREATE_BOX_REPORT = "/createBoxReport";
/*
PARAMS: hqId, officialEmail, base, totalReported
no param            : response: -1, message: `Error: Empty object`
!param              : response: -1, message: `Missing data: param`
recips.length       : response: -2, message: "No recips found" 
box closed          : response: 1, message: `Box registered`, data: parameter
err                 : --
*/
export const SAVE_SIGN_REPORT = "/saveSignReport";
/*
PARAMS: id, sign
no param            : response: -1, message: `Error: Empty object`
!id                 : response: -1, message: `Missing data: id`
!sign               : response: -1, message: `Missing data: sign` 
*/
export const READ_BOX_REPORT = "/readBoxReport";
/*
PARAMS : id
no params           : response: -1, message: `Error: Empty object` 
!id                 : response: -1, message: `Missing data: id`
!doc.exists         : response: -1, err: "Hq not found!" 
box found           : 
*/

export const LIST_BOX_CLOSE = "/listBoxClose";
/*
PARAMS : hqId
no parms : response: -1, message: `Error: Empty object`
!hdId : response: -1, message: `Missing data: hqId`
snapshot.empty : response: -1, err: "Hq not found or the hq doesn't have a blox closes!"
snapshot : response: 1, message: `Box found succesfully`, data: boxes 
err : --
*/

export const GET_SHIFTS_OF_BOX = "/getShiftsOfBox";
/*
PARAMS :
*/

export const GET_BOX_TOTAL = "/getBoxTotal";
/*
PARAMS :
*/


//------------------------USER------------------------
export const CREATE_USER = "/createUser";
/*
PARAMS : type, vehicleType, email, phone, name, lastName, expoToken, monthlyUser, plate, hqId, mensualityType, capacity, cash, change, officialEmail, nid, pending, generateRecip
no params : response: -1, message: `Error: Empty object`
!params : response: -1, message: `Missing data: param`
createUser and mensuality : response: 1, message: `User created succesfully`, id: response.id 
err createUser and mensuality : --
user already exists and no new info : response: -1, message: "User already exists and there was no new info to update"
user already exists and new info : response: 2, message: `User already exists but added the new plate to the profile`
err : --
err : --

*/
 
export const READ_USER = "/readUser";
/*
PARAMS :
*/

export const EDIT_USER = "/editUser";
/*
PARAMS :
*/

export const FIND_USER_BY_PLATE = "/findUserByPlate";
/*
PARAMS :
*/

export const CREATE_MENSUALITY = "/createMensuality";
/*
PARAMS :
*/

export const FIND_MENSUALITY_PLATE = "/findMensualityPlate";
/*
PARAMS :
*/

export const EDIT_MENSUALITY = "/editMensuality";
/*
PARAMS :
*/

export const RENEW_MENSUALITY = "/renewMensuality";
/*
PARAMS :
*/

export const CREATE_PARANOIC_USER = "/createParanoicUser";
/*
PARAMS :
*/

export const GET_PARANOICS_FROM_HQ = "/getParanoicsFromHq";
/*
PARAMS :
*/

export const READ_PARANOIC_USER = "/readParanoicUser";
/*
PARAMS :
*/

export const GET_USER_COUPONS = "/getUserCoupons"


//------------------------STORAGE------------------------
export const STORAGE_KEY = '@save_lastLoginAt';
