const endpointURL = "https://80bwgdzl22.execute-api.ap-southeast-1.amazonaws.com/release"
var app = new Vue({
    el: '#app',
    data: {
        state: "LOGIN_SCREEN",
        access_key: ""
    },
    methods: {
        showSendEmailScreen() {
            this.state = "SEND_EMAIL_SCREEN";
        },
        showUploadFileScreen() {
            this.state = "UPLOAD_FILE_SCREEN";
        },
        showGetUploadedFilesScreen() {
            this.state = "GET_UPLOADED_FILES_SCREEN";
        },
        async doLogin() {
            // disable login button
            document.getElementById("btn_login").disabled = true;
            // execute http request
            const response = await fetch(`${endpointURL}/sessions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.access_key
                }
            });
            // parse response
            const respJSON = await response.json();
            // handle error by giving alert to user
            if (response.status != 200) {
                if (respJSON.message) {
                    alert(respJSON.message);
                } else {
                    alert("Something wrong happened, please try again later");
                }
                // enable login button
                document.getElementById("btn_login").disabled = false;
                return
            }
            // update state to send email screen
            this.showSendEmailScreen();
        }
    }
})