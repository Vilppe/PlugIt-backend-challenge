const uuidv4 = require('uuid/v4');
const fs = require('fs');
const TRANSATION_AMOUNT = 10000;
const CHARGE_POINT_AMOUNT = 30;
const CLIENT_AMOUNT = 150;
const DURATION_MAX = 700;
const DATE_BETWEEN = 300;
const FILE_NAME = './transactions.json';
const httpResponse = ('./httpResponse.js');

let chargePoints = [];
let clients = [];

/**
 * Generate chargepoint ids
 */
function initializeChargePoints() {
    for (let i = 0; i < CHARGE_POINT_AMOUNT; i++) {
        chargePoints.push(uuidv4());
    }

    return;
}

/**
 * Generate client ids
 */
function initializeClients() {
    for (let i = 0; i < CLIENT_AMOUNT; i++) {
        chargePoints.push(uuidv4());
    }

    return;
}

/**
 * Return random client from array
 */
function getClient() {
    return clients[numberbetween(clients.length)];
}

/**
 * Return random charge point from array
 */
function getChargePoint() {
    return chargePoints[numberbetween(chargePoints.length)];
}

/**
 * Main handler creating mock transactions
 */
function main() {
    let transactions = [];

    for (let i = 0; i < TRANSATION_AMOUNT; i++) {
        transactions.push(createTransaction());
    }

    fs.writeFile(FILE_NAME, JSON.stringify(transactions, null, 2), (err) => {
        if (err) console.error(err);

        console.log('Done!');
    });
}

/**
 * Get number between 2 values
 */
function numberbetween(max) {
    return Math.floor(Math.random() * max) + 1
}

/**
 * Get random timestamp values
 */
function getTimestamps() {
    let timestampStart = new Date();
    timestampStart.setDate(-1 * numberbetween(DATE_BETWEEN));

    let timestampStop = new Date(timestampStart.valueOf());
    timestampStop.setMinutes(numberbetween(DURATION_MAX));

    return {
        start: timestampStart.toISOString(),
        stop: timestampStop.toISOString()
    }
}


/**
 * Create transaction
 */
function createTransaction() {
    const timestamps = getTimestamps();

    return {
        _id: uuidv4(),
        timestampStart: timestamps.start,
        timestampStop: timestamps.stop,
        energy: numberbetween(100000),
        chargePointId: getChargePoint(),
        clientId: getChargePoint(),
    }
}


/**
 * Main functions for genera transactions for file
 */
initializeChargePoints();
initializeClients();
main();