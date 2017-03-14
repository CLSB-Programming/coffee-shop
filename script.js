// Set up global variables
var balance = 30;

// Update the balance to reflect it as defined above
updateBalance();

// Create empty amounts object to edit later
amounts = {};

// Add products
addProduct(1, "Cups", [100, 250, 500], [2, 4, 6], 0, 3, ' cups');
addProduct(2, "Coffee", [2000, 4000, 6000], [10, 14, 18], 0, 20, 'g');
addProduct(3, "Milk", [1000, 2500, 4000], [1, 2, 3], 0, 100, 'ml');
addProduct(4, "Sugar", [100, 200, 500], [3, 5, 8], 0, 5, ' cubes');

// Player requests to purchase a product
function buy(productId, quantity, price) {
	// Check the player has enough money
	if(price <= balance) {
		// Charge the player
		balance -= price;
		updateBalance();

		// Update the current quantity field.
		// TODO: Replace this with its own function that also updates units singular/plural
		document.getElementById(productId).children[1].children[0].innerHTML = parseInt(document.getElementById(productId).children[1].children[0].innerHTML) + quantity;
	} else {
		// The user does not have enough money
		// TODO: Display a nicer alert
		alert("Not enough money");
	}
}

// Rather than add products seperately in HTML statically, we can produce them programatically to make changes easier
function addProduct(productId, name, quantities, prices, min, max, units) {
	// Create an empty string
	productString = "";
	// Add our HTML we want to insert to this string, inserting any relevant info we got passed in as arguments
	productString +=
		'<tr id="' + productId + '">' +
		'<td>' + name + '</td>' +
		'<td><span>0</span><span>' + units + '</span></td>' +
		'<td>' +
		'<ul>';

	// Check the quantities and prices arrays are of the same length
	if(quantities.length == prices.length) {
		// Add purchasing options with a for loop
		for (var i = 0; i < quantities.length; i++) {
			productString +=
				'<li><a href="#" onclick="buy(\'' + productId + '\', ' + quantities[i] + ', ' + prices[i] + ')">' + quantities[i] + units + ' (£' + prices[i] + ')</a></li>';
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
		'<td><input id="' + productId + '_amountPerCustomer" type="range" min="' + min + '" max="' + max + '" value="0" oninput="updateAmount(' + productId + ')">' + ' <span id="' + productId + '_amountPerCustomerDisplay">0</span>' + units + '</td>' +
		'</tr>';

	// Update our HTML
	document.getElementById('shop').innerHTML += productString;
}

// Update sliders visually and update amounts object
function updateAmount(productId) {
	var newValue = document.getElementById(productId + '_amountPerCustomer').value;
	amounts[productId] = newValue;
	document.getElementById(productId + '_amountPerCustomerDisplay').innerHTML = newValue;
}

// Visually updates the balance
function updateBalance() {
	document.getElementById('balance').innerHTML = balance;
}
