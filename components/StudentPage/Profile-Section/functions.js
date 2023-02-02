function convertDateToIso(date) {
    if (date == "") {
        return "";
    }
    if (date == null) {
        return "";
    } else if (date.split("-")[0].length === 4) {
        return date;
    } else if (date.split("/")[0].length === 4) {
        return date;
    } else {
        let newDate = new Date(date);
        let dateArray = newDate.toLocaleDateString().split("/");
        let year = dateArray[2];
        let day = dateArray[1].length === 2 ? dateArray[1] : `0${dateArray[1]}`;
        let month = dateArray[0].length === 2 ? dateArray[0] : `0${dateArray[0]}`;
        return `${year}-${month}-${day}`;
    }
}

export default convertDateToIso