const mysql = require("mysql");
var inquirer = require("inquirer");
let inventory;

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "Bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    bamazonCustomerInit()
});

function bamazonCustomerInit() {
    queryAllBamazonItems();
    inquirer
        .prompt({
            name: "BamazonID",
            type: "input",
            message: "What is the ID Number of the item you would like to buy?",
        })
        .then(function (answer) {
            if (answer.BamazonID >= 1 && answer.BamazonID <= 11) {
                console.log("We have that item for you!")
                console.log("-----------------------------------")
                bamazonCustomerHMU(answer.BamazonID);
            }
            else if (answer.BamazonID > 11 || answer.BamazonID < 1) {
                console.log("ID Number does not exist! Try again");
                console.log("-----------------------------------")
                bamazonCustomerInit()
            } else {
                connection.end();
            }
        })
}
function bamazonCustomerHMU(BamazonID) {
    console.log(inventory[BamazonID - 1])
    //let BamazonID = inventory.item_id
    inquirer
        .prompt({
            name: "BamazonUnits",
            type: "input",
            message: "How many units of this product would you like to buy?",
        })
        .then(function (answer) {
            //console.log(inventory[answer.BamazonID])
            if (answer.BamazonUnits < 1) {
                console.log("Ha ha ha, then why are you here? Try again:");
                bamazonCustomerHMU();
                //console.log(inventory)
            };
            if (answer.BamazonUnits > inventory[BamazonID - 1].stock_quantity) {
                console.log("Okay, Mr. Moneybags, calm down - we don't have THAT many of what you want. Try again:")
                bamazonCustomerHMU();
                //console.log(inventory);
            }
            //console.log(answer.BamazonUnits);
            //console.log(inventory[BamazonID - 1].stock_quantity)
            if ((0 < answer.BamazonUnits) && (answer.BamazonUnits < inventory[BamazonID - 1].stock_quantity)) {
                console.log("Congratulations! You just ordered " + answer.BamazonUnits + " of your selected item! The new total in our inventory is: ")
                console.log("Hold on ...\nNodes are re-jiggering or whatever they do ...");
                var query = connection.query(
                    "UPDATE products SET ? where ?",
                    [
                        {
                            stock_quantity: inventory[BamazonID - 1].stock_quantity - answer.BamazonUnits
                        },
                        {
                            item_id: (BamazonID)
                        }
                    ],
                    function (err, res) {
                        if (err) throw err;
                        console.log(res.affectedRows + " products updated!\n");
                    }
                );
                console.log(query.sql);
                console.log("-----------------------------------")
                inquirer
                    .prompt({
                        name: "PlayAgain",
                        type: "choices",
                        message: "Would you like to make another purchase? (YES or NO)"
                    }).then(function (answer) {
                        if (answer.PlayAgain === "YES") {
                            bamazonCustomerInit();
                        } else if (answer.PlayAgain === "NO") {
                            connection.end()
                        }
                    })
            }
        })
}

// function bamazonCustomerNewInventory() {
//     console.log("Hold on ...\nNodes are re-jiggering or whatever they do ...");
//     var query = connection.query(
//         "UPDATE products SET ? where ?",
//         [
//             {
//                 stock_quantity: 
//             },
//             {
//                 item_id: 
//             }
//         ],
//         function (err, res) {
//             if (err) throw err;
//             console.log(res.affectedRows + " products updated!\n");
//         }
//     );
//     console.log(query.sql);
// }

function queryAllBamazonItems() {
    connection.query("SELECT * FROM bamazon.products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("-----------------------------------");
        inventory = res;
    });
}

