const index = require('./index.js');
const http = require('http');
const url = require('url');
const fs = require('fs');

/**
 * function for finding the top 5 charge points which has most transactions
 * @param {array} array, array of chargePointIds to loop through
 * @param {number} howmany, how many top items to get
 */
function getMostCommonCPs(array, howmany) {
    let chargePointOccurences = {};     // collection of unique charge points paired with the amount of occurrences
    let leaderOccurences = 0;           // the amount of occurrences of the leader
    let mostCommon;                     // the leader of occurrences
    let bestChargePoints = [];              // array with the top n charge points by amount of transactions
    let bestChargePointsWithAmounts = [];   // array with the top n charge points and their amount of transactions
    let iters = 0;
    for (let a = 0; a <= howmany; a++) {
        for (let i = 0, len = array.length; i < len; i++) {
            let chargePoint = array[i];
            if (!bestChargePoints.includes(chargePoint)) { // don't include the ones that have been found already
                iters++;
                if (chargePointOccurences[chargePoint] === undefined) {
                    chargePointOccurences[chargePoint] = 1; // if it's a new Id, add it to the list
                } else {
                    chargePointOccurences[chargePoint] = chargePointOccurences[chargePoint] + 1; //if it already exists on the list, add +1 to occurrences
                }
                if (chargePointOccurences[chargePoint] > leaderOccurences) {  // if it is the biggest so far
                    leaderOccurences = chargePointOccurences[chargePoint];   
                    mostCommon = array[i];
                }
            }
        }

        bestChargePoints.unshift(mostCommon);
        bestChargePointsWithAmounts.unshift([mostCommon, leaderOccurences]);
        chargePointOccurences = {};
        leaderOccurences = 0;
    }
    return bestChargePointsWithAmounts;
}


/**
 * function for finding the top 5 clients who has most energy charged
 * @param {array} array, array of clientIds to loop through
 * @param {array} arrayEnergyValue, array of energy values for the clientIds
 * @param {number} howmany, how many top items to get
 */
function getMostTotalEnergy(array, arrayEnergyValue, howmany) {
    let energyTotalForClient = {};      // collection of unique clients and their total energy values
    let currentBestTotalEnergy = 0;     // the leader of top total energy values
    let mostEnergyClientId;             // the clientId of above
    let mostEnergyClientsFound = [];    // array with the top n clients by total energy
    let mostEnergyClientsAndEnergy = [];// array with the top n clients and the value of their total energy

    for (let a = 0; a <= howmany; a++) {
        for (let i = 0, len = array.length; i < len; i++) {
            let client = array[i];

            if (!mostEnergyClientsFound.includes(client)) { // don't include the ones that have been found already
                if (energyTotalForClient[client] === undefined) { 
                    energyTotalForClient[client] = arrayEnergyValue[i]; // if it's a new Id, add it to the list with the energy amount
                } else {
                    energyTotalForClient[client] = energyTotalForClient[client] + arrayEnergyValue[i]; //if it already exists on the list, add the energy amounts together
                }
                if (energyTotalForClient[client] > currentBestTotalEnergy) { // if it is the biggest so far
                    currentBestTotalEnergy = energyTotalForClient[client];
                    mostEnergyClientId = array[i];
                }
            }
        }
        
        mostEnergyClientsFound.unshift(mostEnergyClientId);
        mostEnergyClientsAndEnergy.unshift([mostEnergyClientId, currentBestTotalEnergy]);
        energyTotalForClient = {};
        currentBestTotalEnergy = 0;
    }
    return mostEnergyClientsAndEnergy;
}

http.createServer(function (req, res) {
    if (req.url == "/response") {

        //get the transaction data from json. This JSON file is generated by "index.js".
        let transactionsJSON = fs.readFileSync("transactions.json");
        transactions = JSON.parse(transactionsJSON);
        
        let topClients = [];
        let topChargePoints = [];
        let totalEnergy = 0;
        let totalDuration = 0;
        let response = [];
        //get the top charge points and the top clients
        topChargePoints = getMostCommonCPs(transactions.map(a => a.chargePointId), 5);
        topClients = getMostTotalEnergy(transactions.map(a => a.clientId), transactions.map(a => a.energy), 5);

        //get the total energy charged and the total time
        for (let i = 0; i < transactions.length; i++) {
            totalEnergy += transactions[i].energy;
            totalDuration += (Date.parse(transactions[i].timestampStop) - Date.parse(transactions[i].timestampStart)) / 1000; // stopping timestamp - starting timestamp = milliseconds taken
        }
        
        // prepare the response by arranging the components to a more readable structure
        // this process is done this way because most web-browsers don't display the JSON output correctly.
        response[3] = ["top clients: ", topClients];
        response[2] = ["top charge points: ", topChargePoints];
        response[1] = ["total energy: ", totalEnergy];
        response[0] = ["total duration: ", totalDuration];
        
        res.write(JSON.stringify(response, null, " ")); //respond to client with the data which the browser will display.

        console.log("Http request handled");

    } else {
        res.write('please go "/response!"-page: ');
    }
    res.end();
}).listen(1337);
