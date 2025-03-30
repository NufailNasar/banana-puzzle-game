document.addEventListener("DOMContentLoaded", function () {
    fetch("getUser.php")
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById("username").textContent = data.username;
            } else {
                document.getElementById("username").textContent = "Guest";
            }
        })
        .catch(error => console.error("Error fetching user:", error));
});
