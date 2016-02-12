function Warehouse() {
    this.x = null;
    this.y = null;
    this.products = [];
}

function Order() {
    this.x = null;
    this.y = null;
    this.productsNum = null;
    this.productsIDs = [];
}

var fs = require('fs'),
    readline = require('readline');

var rd = readline.createInterface({
    input: fs.createReadStream('busy_day.in'),
    output: process.stdout,
    terminal: false
});

var counter = 0;

var rows, cols, drones, turns, payload;

var productsNum, products = [];

var warehousesNum, warehousesCounter = 0, warehouses = [];

var ordersNum, ordersCounter = 0, orders = [];

rd.on('line', function(line) {
    if(counter == 0) {

        // Reading params from first line

        var params = line.split(' ');
        rows = params[0];
        cols = params[1];
        drones = params[2];
        turns = params[3];
        payload = params[4];

    }
    if(counter == 1) {

        // Reading number of products from the second line

        productsNum = parseInt(line);

    }
    if(counter == 2) {

        // Reading the weight of each product

        var productsLine = line.split(' ');
        for(var i = 0; i < productsNum; i++) {
            products[i] = parseInt(productsLine[i]);
        }

    }
    if(counter == 3) {

        // Parse the amount of warehouses from line 4

        warehousesNum = parseInt(line);

    }
    if(counter > 3 && counter <= 3 + warehousesNum * 2) {

        // Parse all warehouses

        var currWH = warehouses[warehousesCounter];

        if(currWH == null) {
            currWH = new Warehouse();
            warehouses[warehousesCounter] = currWH;
        }

        if(currWH.x == null || currWH.y == null) {
            var xy = line.split(' ');
            currWH.x = parseInt(xy[0]);
            currWH.y = parseInt(xy[1]);
        } else if(currWH.products.length == 0) {
            var currProds = line.split(' ');
            for(var i = 0; i < productsNum; i++) {
                currWH.products[i] = parseInt(currProds[i]);
            }
            warehousesCounter++;
        }

    }
    if(counter == 4 + warehousesNum * 2) {

        // Parse the number of orders

        ordersNum = parseInt(line);

    }
    if(counter > 4 + warehousesNum * 2 && counter < 4 + warehousesNum * 2 + ordersNum * 3) {

        // Parse all orders

        var currOrder = orders[ordersCounter];

        if(currOrder == null) {
            currOrder = new Order();
            orders[ordersCounter] = currOrder;
        }

        if(currOrder.x == null || currOrder.y == null) {
            var xy = line.split(' ');
            currOrder.x = parseInt(xy[0]);
            currOrder.y = parseInt(xy[1]);
        } else if(currOrder.productsNum == null) {
            currOrder.productsNum = parseInt(line);
        } else if(currOrder.productsIDs.length == 0) {
            var currOrders = line.split(' ');
            for(var i = 0; i < currOrder.productsNum; i++) {
                currOrder.productsIDs[i] = parseInt(currOrders[i]);
            }
            ordersCounter++;
        }

    }

    counter++;
});

setTimeout(function() {
    exports.rows = rows;
    exports.cols = cols;
    exports.drones = drones;
    exports.turns = turns;
    exports.payload = payload;
    exports.productsNum = productsNum;
    exports.products = products;
    exports.warehousesNum = warehousesNum;
    exports.warehouses = warehouses;
    exports.ordersNum = ordersNum;
    exports.orders = orders;
}, 200);