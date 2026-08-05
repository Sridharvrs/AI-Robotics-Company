document.addEventListener("DOMContentLoaded", () => {

    /*==================================
            ELEMENTS
    ==================================*/

    const loginForm = document.getElementById("loginForm");

    const email = document.getElementById("email");
    const password = document.getElementById("password");

    const submitBtn = document.getElementById("submitBtn");

    const loginMsg = document.getElementById("loginMsg");

    const roleBtns = document.querySelectorAll(".role-opt");

    const formTitle = document.getElementById("formTitle");
    const formSub = document.getElementById("formSub");

    /*==================================
            RESET FORM
    ==================================*/

    loginForm.reset();

    let currentRole = "engineer";

    /*==================================
            ROLE DATA
    ==================================*/

    const roleData = {

        engineer: {

            title: "Welcome Back",

            sub: "Sign in to your Engineer Dashboard",

            button: "Sign In as Engineer"

        },

        researcher: {

            title: "Welcome Researcher",

            sub: "Access your Research Workspace",

            button: "Sign In as Researcher"

        }

    };

    /*==================================
            ROLE SELECTOR
    ==================================*/

    roleBtns.forEach(btn => {

        btn.addEventListener("click", () => {

            roleBtns.forEach(b => b.classList.remove("active"));

            btn.classList.add("active");

            currentRole = btn.dataset.role;

            formTitle.textContent =
                roleData[currentRole].title;

            formSub.textContent =
                roleData[currentRole].sub;

            submitBtn.textContent =
                roleData[currentRole].button;

            loginMsg.textContent = "";

        });

    });

    /*==================================
            VALIDATION
    ==================================*/

    function validateEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    }

    function validatePassword(password) {

        return password.length >= 8;

    }

    /*==================================
            LOGIN
    ==================================*/

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        loginMsg.textContent = "";

        loginMsg.className = "login__msg";

        const emailValue = email.value.trim();

        const passwordValue = password.value.trim();

        /*==============================
                EMAIL
        ==============================*/

        if (!validateEmail(emailValue)) {

            loginMsg.textContent =
                "Please enter a valid email address.";

            loginMsg.style.color = "#ff6b6b";

            return;

        }

        /*==============================
                PASSWORD
        ==============================*/

        if (!validatePassword(passwordValue)) {

            loginMsg.textContent =
                "Password must be at least 8 characters.";

            loginMsg.style.color = "#ff6b6b";

            return;

        }

        /*==============================
                LOADING
        ==============================*/

        submitBtn.disabled = true;

        const originalText = submitBtn.textContent;

        submitBtn.textContent = "Signing In...";

        /*==============================
                FAKE LOGIN
        ==============================*/

        setTimeout(() => {

            const fullName = emailValue
    .split("@")[0]
    .replace(/[._-]/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());

const currentUser = {

    name: fullName,

    email: emailValue,

    role: currentRole

};



            sessionStorage.setItem(

                "currentUser",

                JSON.stringify(currentUser)

            );



            loginMsg.style.color = "#2bd9a8";

            loginMsg.textContent =
                "✓ Login Successful! Redirecting...";

            submitBtn.disabled = false;

            submitBtn.textContent = originalText;

            /*==============================
                    REDIRECT
            ==============================*/

            setTimeout(() => {

                if (currentRole === "engineer") {

                    window.location.href =
                        "engineer.html";

                }

                else {

                    window.location.href =
                        "researcher.html";

                }

            }, 800);

        }, 1200);

    });

});