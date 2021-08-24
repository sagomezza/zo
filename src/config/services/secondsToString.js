const secondsToString = (seconds) => {
    var numdays = "" + Math.floor(seconds / 86400);
    var numhours = "" + Math.floor((seconds % 86400) / 3600);
    var numminutes = "" + Math.floor(((seconds % 86400) % 3600) / 60);
    var numseconds = "" + ((seconds % 86400) % 3600) % 60;

    if (numdays.length < 2) numdays = "0" + numdays;
    if (numhours.length < 2) numhours = "0" + numhours;
    if (numminutes.length < 2) numminutes = "0" + numminutes;
    if (numseconds.length < 2) numseconds = "0" + numseconds;

    return [numdays, numhours, numminutes, Math.round(numseconds)].join(":");
}

export default secondsToString;