var app = new Vue({
    el: '#app',
    data: {
        state: "LOGIN_SCREEN",
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
        doLogin() {
            alert("Hello World!");
        }
    }
})