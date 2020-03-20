// Skript Jaromíra Soukupa
// Kdo má dnes vtip

let names = ['Dominik', 'Eliška', 'Filip', 'Michal', 'Vláďa', 'Wendigo']
let days = ['neděle', 'pondělí', 'úterý', 'středa', 'čtvrtek', 'pátek', 'sobota']

/* Copied from SO */

Date.prototype.isLeapYear = function() {
    var year = this.getFullYear();
    if((year & 3) != 0) return false;
    return ((year % 100) != 0 || (year % 400) == 0);
};

Date.prototype.getDayOfYear = function() {
    var dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    var mn = this.getMonth();
    var dn = this.getDate();
    var dayOfYear = dayCount[mn] + dn;
    if(mn > 1 && this.isLeapYear()) dayOfYear++;
    return dayOfYear;
};

/* Not copied from SO */

function date() {
    let d = new Date()
    /* For testing purposes */
    //d.setDate(d.getDate() + 4)
    return d
}

function dom() {
    return date().getDate() - 1
}

function dow() {
    return date().getDay()
}

function get_offset() {

    if (dow() == 6) {
        return 2
    } else if (dow() == 0) {
        return 1
    }

    return 0
}

function offset_date(offset) {
    let d = date()
    d.setDate(d.getDate() + offset)
    return d
}

function update_jokebearer(text) {
    document.getElementById('jokebearer').innerHTML = text
}

function update_dow_text(text) {
    document.getElementById('day_of_week').innerHTML = text
}

function is_weekend(day_of_week) {
    return day_of_week == 0 || day_of_week == 6
}

function get_dow_text() {

    let day_of_week = dow()
    let day = days[day_of_week]
    let weekend_text = ', příští stand-up bude v pondělí'
    let text = 'Dnes je ' + day + (is_weekend(day_of_week) ? weekend_text : '')

    return text

}

function update_bg_if_filip_or_dominik(joker) {
    if (joker == 'Filip') {
        document.getElementById('joke').style.color = '#ff196e'
        document.getElementById('joke').style.backgroundImage = "url('filip.jpg')"
    } else if (joker == 'Dominik') {
        document.getElementById('joke').style.color = '#fff'
        document.getElementById('joke').style.backgroundImage = "url('dominik.jpg')"
        document.getElementById('joke').style.backgroundSize = "50% 55%"
        document.getElementById('joke').style.backgroundPosition = "90% 60%"
    }
}

function get_joke_text() {

    let next_standup = offset_date(get_offset())

    let weekend_text = 'Vtip bude mít '
    let weekday_text = 'Vtip má '

    let text = is_weekend(dow()) ? weekend_text : weekday_text

    let joker = names[next_standup.getDayOfYear() % names.length]

    update_bg_if_filip_or_dominik(joker)

    return text + '<b id="name">' + joker + '</b>'
}


function calc() {

    update_dow_text(get_dow_text())
    update_jokebearer(get_joke_text())

}

