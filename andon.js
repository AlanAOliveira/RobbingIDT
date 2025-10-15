const startingDate = new Date(2025, 9, 10, 6, 12, 0);
var startingLane = [2025, 11, 3, 1];
var actualLane = [2025, 11, 3, 1];
var planProdDay = 292
var lanesProdDay = 16
var vehLane = planProdDay / lanesProdDay
var takt = 148
var paradas = [[13,0],[13,0],[13,0]]


function dropDigit() {
    const now = new Date();
    tiempo = Math.floor((now - startingDate) / 1000)
    actualLane[3] = Math.floor(tiempo / takt / vehLane) % 16
    actualLane[2] = startingLane[2] + Math.floor(tiempo / takt / vehLane / 16)
    document.getElementById("ordernumber").innerHTML = `Order
    ${checkTime(actualLane[0])} 
    ${checkTime(actualLane[1])} ${checkTime(actualLane[2])}`
    document.getElementById("lane").innerHTML = `Lane:${checkTime(actualLane[3])}`
    document.getElementById("lanevolume").innerHTML = `LaneVolume:${vehLane}`
    document.getElementById("countdown").innerHTML = `countdown:${
        Math.abs(Math.floor(tiempo / takt)
        % Math.floor(vehLane) - Math.floor(vehLane))}`
    document.getElementById("producao").innerHTML = `Prod:${Math.floor(tiempo / takt) % 584}`
}

function checkTime(i) {
    if (i < 10) { i = "0" + i };
    return i;
}


function startTime() {
    const now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clock').innerHTML = h + ":" + m + ":" + s;
    dropDigit()
    setTimeout(startTime, 1000);
}
