// Set up global variables
var balance = 30;

// Update the balance to reflect it as defined above
updateBalance();

// Add products
addProduct(1, "Cups", [10, 25, 50], [2, 4, 6]);
addProduct(2, "Coffee", [20, 40, 60], [10, 14, 18]);
addProduct(3, "Milk", [10, 25, 40], [1, 2, 3]);
addProduct(4, "Sugar", [10, 20, 50], [3, 5, 8]);

// Player requests to purchase a product
function buy(productId, quantity, price) {
	// Check the player has enough money
	if(price <= balance) {
		// Charge the player
		balance -= price;
		updateBalance();

		// Update the current quantity field
		document.getElementById(productId).children[1].innerHTML = parseInt(document.getElementById(productId).children[1].innerHTML) + quantity;
	} else {
		// The user does not have enough money
		// TODO: Display a nicer alert
		alert("Not enough money");
	}
}

// Rather than add products seperately in HTML statically, we can produce them programatically to make changes easier
function addProduct(productId, name, quantities, prices) {
	// Create an empty string
	productString = "";
	// Add our HTML we want to insert to this string, inserting any relevant info we got passed in as arguments
	productString +=
		'<tr id="' + productId + '">' +
		'<td>' + name + '</td>' +
		'<td>0</td>' +
		'<td>' +
		'<ul>';

	// Check the quantities and prices arrays are of the same length
	if(quantities.length == prices.length) {
		// Add purchasing options with a for loop
		for (var i = 0; i < quantities.length; i++) {
			productString +=
				'<li><a href="#" onclick="buy(\'' + productId + '\', ' + quantities[i] + ', ' + prices[i] + ')">' + quantities[i] + ' (£' + prices[i] + ')</a></li>';
		}
	} else {
		// Log a useful error message so we can debug if something goes wrong
		console.error("Dimensions mismatch: " + quantities.length + " quanties but " + prices.length + " prices in creating " + name + " with id " + productId);
		return;
	}
	
	// Add the closing HTML for our string
	productString +=
		'</ul>' +
		'</td>' +
		'</tr>';

	// Update our HTML
	document.getElementById('shop').innerHTML += productString;

}

// Visually updates the balance
function updateBalance() {
	document.getElementById('balance').innerHTML = balance;
}
