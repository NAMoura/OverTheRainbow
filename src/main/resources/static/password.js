function verifyPassword() {
    // Get the input password from the user
    var password = document.getElementById("passwordInput").value;

    // Check if the password is correct (e.g., "mypassword")
    if (password === "1234") {
        // Redirect to the next page (nextpage.html)
        window.location.href = "landingpage.html";
    } else {
        // Display an error message
        alert("Incorrect password. Please try again.");
    }
}