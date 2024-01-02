class LoginSystem {
    constructor() {
        this.currentState = "LoggedOut";
        this.transition('Idle');
    }

    submitCredentials() {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (!username || !password) {
            this.transition("IncompleteCredentials");
        } else {
            this.transition("CheckingCredentials");

            // Simulate server request
            setTimeout(() => {
                if (username === "admin" && password === "admin") {
                    this.transition("LoggedIn");
                } else {
                    this.transition("Error");
                }
            }, 1000);
        }
    }

    transition(newState) {
        this.currentState = newState;
        const statusElement = document.getElementById("status");

        switch (newState) {
            case 'Idle':
                statusElement.innerText = "";
                disableLoginButton(false);
                break;
            case "LoggedIn":
                statusElement.innerText = "Successfully logged in!";
                statusElement.style.color = "green";
                disableLoginButton(false);
                break;
            case "Error":
                statusElement.innerText = "Error: Incorrect credentials!";
                statusElement.style.color = "red";
                disableLoginButton(false);
                break;
            case "IncompleteCredentials":
                statusElement.innerText = "Please fill in both username and password.";
                statusElement.style.color = "#e67e22";
                break;
            case "CheckingCredentials":
                statusElement.innerText = "Checking credentials...";
                statusElement.style.color = "blue";
                disableLoginButton(true);
                break;
        }
    }
}

const loginSystem = new LoginSystem();

function submitCredentials() {
    loginSystem.submitCredentials();
}

function disableLoginButton(disabled) {
    const loginButton = document.getElementById("loginButton");
    loginButton.disabled = disabled;
}
