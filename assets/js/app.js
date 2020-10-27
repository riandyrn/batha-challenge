const endpointURL = "https://80bwgdzl22.execute-api.ap-southeast-1.amazonaws.com/release"
var app = new Vue({
    el: '#app',
    data: {
        state: "LOGIN_SCREEN",
        access_key: "",
        email: "",
        name: "",
        send_email_page: {
            body_html: "<h1>Hello World!</h1>"
        }
    },
    methods: {
        showSendEmailScreen() {
            this.state = "SEND_EMAIL_SCREEN";
        },
        showUploadFileScreen() {
            this.state = "UPLOAD_FILE_SCREEN";
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
            // update email & name values
            this.email = respJSON.data.email;
            this.name = respJSON.data.name;
            // update state to send email screen
            this.showSendEmailScreen();
        },
        async doSendEmail() {
            // disable send email button
            document.getElementById("btn_email").disabled = true;
            // execute http request
            const response = await fetch(`${endpointURL}/emails`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.access_key
                },
                body: JSON.stringify({
                    body_html: this.send_email_page.body_html,
                })
            })
            // parse response
            const respJSON = await response.json();
            // give response to user
            if (response.status != 200) {
                if (respJSON.message) {
                    alert(respJSON.message);
                } else {
                    alert("Something wrong happened, please try again later");
                }
            } else {
                alert(`Succesfully send email to ${this.email}`);
            }
            // enable send email button
            document.getElementById("btn_email").disabled = false;
        },
        async doUploadFile() {
            // clear page
            upload_progress.innerHTML = "";
            download_url.innerHTML = "";
            // disable upload file button
            btn_upload.disabled = true;
            file_input.disabled = true;
            // check whether user already choose file to upload
            if (file_input.files.length == 0) {
                return
            }
            // get presigned upload url
            const file = file_input.files[0];
            const response = await fetch(`${endpointURL}/uploads`, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.access_key
                },
                body: JSON.stringify({
                    name: file.name,
                    size: file.size,
                    type: file.type
                })
            })
            // parse request upload response
            const respJSON = await response.json();
            if (response.status == 200) {
                const uploadURL = respJSON.data.upload_url;
                // upload file to presigned upload url
                const uploadResponse = await this.uploadToS3(uploadURL, file, (progress) => {
                    upload_progress.innerHTML = `<b>Upload progress:</b> ${Math.floor(progress * 100)}%`
                });
                if (uploadResponse.status == 200) {
                    alert("successfully upload file!");
                    const downloadURL = uploadURL.split("?")[0];
                    download_url.innerHTML = `<b>Download URL:</b><br/><a href="${downloadURL}" target="_blank">${downloadURL}</a>`;
                } else {
                    console.log(uploadResponse.body);
                    alert("unable to upload file, check console for details");
                }
            } else {
                if (respJSON.message) {
                    alert(respJSON.message);
                } else {
                    alert("Something wrong happened, please try again later");
                }
            }
            // clear form
            form_upload.reset();
            // enable upload file button
            btn_upload.disabled = false;
            file_input.disabled = false;
        },
        async uploadToS3(uploadURL, file, onProgress) {
            return new Promise((resolve) => {
                const xhr = new XMLHttpRequest();
                xhr.upload.addEventListener("progress", e => {
                    if (e.lengthComputable) {
                        onProgress(e.loaded / e.total);
                    }
                })
                xhr.onreadystatechange = e => {
                    if (xhr.readyState !== xhr.DONE) {
                        return
                    }
                    resolve({ status: xhr.status, body: xhr.responseText });
                }
                xhr.open("PUT", uploadURL, true);
                xhr.setRequestHeader("x-amz-acl", "public-read");
                xhr.setRequestHeader("Content-Type", file.type)
                xhr.send(file);
            });
        }
    }
})