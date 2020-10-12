// Skript Jaromíra Soukupa
// Kdo má dnes vtip

let NAMES = ['Michal', 'Vláďa', 'Wendigo', 'Dominik', 'Eliška', 'Filip', 'Honza', 'Martin', ]
let DAYS = ['pondělí', 'úterý', 'středa', 'čtvrtek', 'pátek', 'sobota', 'neděle']
const EPOCH_START = new Date('2020-10-12T00:00:00');
const NOW = new Date();
// const NOW = new Date('2020-05-27T09:00:00'); // for DBG

function getDaysSinceEpochStart(date) {
    var today = date ? date : NOW;
    return Math.floor((today - EPOCH_START)/(1000 * 60 * 60 * 24));
}

function getWorkDays(days) {
    // subtract weekends and trailing saturday
    return days - Math.floor(days/7) * 2 - (days%7 == 6 ? 1 : 0);
}

function update_jokebearer(text) {
    document.getElementById('jokebearer').innerHTML = text
}

function update_jokebearer_next(text) {
    document.getElementById('jokebearer_next').innerHTML = text
}

function update_dow_text(text) {
    document.getElementById('day_of_week').innerHTML = text
}

function is_weekend(day) {
    return day % 7 > 4;
}

function get_dow_text() {

    let day_of_week = getDaysSinceEpochStart() % 7;
    let day = DAYS[day_of_week];
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
    } else if (joker == 'Eliška') {
        document.getElementById('joke').style.backgroundImage = "url('eliska.jpg')"
        document.getElementById('joke').style.backgroundPosition = 'center'
    }
}

function get_joke_text() {
    let days_since_start = getDaysSinceEpochStart();
    let work_days = getWorkDays(days_since_start);

    let weekend_text = 'Vtip bude mít '
    let weekday_text = 'Vtip má '

    let text = is_weekend(days_since_start) ? weekend_text : weekday_text

    let joker = NAMES[work_days % NAMES.length]

    update_bg_if_filip_or_dominik(joker)

    return text + '<b id="name">' + joker + '</b>'
}

function get_next_text() {
    let days_since_start = getDaysSinceEpochStart();
    let work_days = getWorkDays(days_since_start) + 1;
    return 'Na příštím standupu má vtip ' + NAMES[work_days % NAMES.length];
}

function calc() {
    update_dow_text(get_dow_text())
    update_jokebearer(get_joke_text())
    update_jokebearer_next(get_next_text())
}

