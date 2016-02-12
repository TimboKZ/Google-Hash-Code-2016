exports.load = function(droneID, warehouseID, productID, amount) {
    console.log(droneID + " L " + warehouseID + " " + productID + " " + amount);
}
exports.deliver = function(droneID, orderID, productID, amount) {
    console.log(droneID + " D " + orderID + " " + productID + " " + amount);
}

exports.wait = function(droneID, numOfTurns) {
    console.log(droneID + " W " + numOfTurns);
};