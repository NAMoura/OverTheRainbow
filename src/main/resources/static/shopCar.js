var API_URL = "http://localhost:8080/products/";
var productData;

$(document).ready(function () {
    fetchCustomers();
    calculateTotalValue()

    $("#whatsapp-btn").on("click", function () {
        sendWhatsapp()
    });

    // Button - Delete product
    $("#product-table").on("click", ".remove-btn", function () {
        var id = $(this).attr("id").split("-")[2];
        deleteProduct(id);
    });

    // Button - Add products
    $("#tabletest").on("click", "#add-btn1, #add-btn2, #add-btn3, #add-btn4, #add-btn5, #add-btn6",function () {
            // Get data attributes of clicked button
            var productName = $(this).data("productname");
            var price = $(this).data("price");
            addProduct(productName, price);
    });

    // Button - Delete customer
    $("#clear-btn").on("click", function () {
        removeAll();
    });

});

function fetchCustomers() {
    $.ajax({
        url: API_URL,
        async: true,
        success: function (data) {
            productData = data; // Store product data in the global variable
            populateProducts(productData);
        }
    });
}

function populateProducts(productData) {
    var elementStr;
    var productTable = $("#product-table");
    var row;

    productTable.empty();

    productData.forEach(function (element) {
        elementStr =
            "<td>" +
            element.productName +
            "</td>" +
            "<td>" +
            element.price + "€" +
            "</td>" +
            '<td><button type="button" id="remove-btn-' +
            element.id +
            '" class="remove-btn btn btn-danger">delete</button></td>';

        row = $("<tr></tr>");
        row.html(elementStr);
        row.attr("id", "product-" + element.id);
        row.addClass("product-data");

        productTable.append(row);
    });
}

function deleteProduct(id) {
    $.ajax({
        url: API_URL + id,
        type: "DELETE",
        data: JSON.stringify({
            id: id,
        }),
        async: true,
        success: function () {
            $("#product-" + id).remove();
            calculateTotalValue()
        },
    });

}

function addProduct(productName, price) {
    //SUCCESS CB
    function successCallback() {
        console.log("success here")
        fetchCustomers();
        calculateTotalValue()
    }
    //ERROR CB
    function errorCallback(request, status, error) {
        console.log(request, status, error);
    }
    //AJAX SETUP AND INJECTION
    var jsonData = {
        productName: productName,
        price: price
    };


    $.ajax({
        url: API_URL,
        type: 'POST',
        async: true,
        contentType: 'application/json',
        data: JSON.stringify(jsonData),
        success: successCallback,
        error: errorCallback
    });


}

function removeAll(){
    var productTable = $("#product-table");

        productData.forEach(function (element) {
            deleteProduct(element.id)
        });
    productTable.empty();
    calculateTotalValue()
}

function sendWhatsapp() {
    // Fetch data from the API using AJAX
    $.ajax({
        url: API_URL,
        type: "GET",
        success: function (productData) {
            // Format the data into a list table
            var message = "I'm interested in this items\n\n";
            message += "Product    |    Price\n\n";
            var totalPrice = 0;
            productData.forEach(function (product) {
                var price = parseFloat(product.price);
                totalPrice += price;
                message += padString(product.productName, 16) + padString("€" + price.toFixed(2), 16) + "\n";
            });

            // Add the total price to the message
            message += "\nTotal Price: €" + totalPrice.toFixed(2); // Display the total price

            // Update the URL with the formatted message
            var encodedMessage = encodeURIComponent(message);
            var whatsappURL = "https://wa.me/351919902960?text=" + encodedMessage;
            window.location.href = whatsappURL;
        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });
}

function padString(str, length) {
    while (str.length < length) {
        str += " ";
    }
    return str;
}

function calculateTotalValue() {
    // SUCCESS CB
    function successCallback(data) {
        var totalValue = 0;
        // Iterate through the data returned from the API to calculate the total value
        data.forEach(function (product) {
            totalValue += parseFloat(product.price);
        });
        // Update the HTML element with the total value
        $("#total-value").text("Total Value: €" + totalValue.toFixed(2));
    }

    // ERROR CB
    function errorCallback(request, status, error) {
        console.log(request, status, error);
    }

    // AJAX SETUP AND INJECTION
    $.ajax({
        url: API_URL,
        type: 'GET',
        async: true,
        success: successCallback,
        error: errorCallback
    });
}

