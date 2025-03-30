document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm");
    const signinForm = document.getElementById("signinForm");

    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            fetch("signup.php", {
                method: "POST",
                body: JSON.stringify({ name, email, password }),
                headers: { "Content-Type": "application/json" },
            })
            .then((response) => response.json())
            .then((data) => {
                document.getElementById("signupMessage").innerText = data.message;
            });
        });
    }

    if (signinForm) {
        signinForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const email = document.getElementById("signinEmail").value;
            const password = document.getElementById("signinPassword").value;

            fetch("signin.php", {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: { "Content-Type": "application/json" },
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    window.location.href = "game1.html";
                } else {
                    document.getElementById("signinMessage").innerText = data.message;
                }
            });
        });
    }
});
