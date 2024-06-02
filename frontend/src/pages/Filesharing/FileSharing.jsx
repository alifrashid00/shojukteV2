import React, { useEffect } from "react";
import './style.css'

const FileSharing = () => {
    useEffect(() => {
        const dropZone = document.querySelector(".drop-zone");
        const browseBtn = document.querySelector(".browseBtn");
        const fileInput = document.querySelector("#fileInput");
        const bgProgress = document.querySelector(".bg-progress");
        const progressContainer = document.querySelector(".progress-container");
        const progressBar = document.querySelector(".progress-bar");
        const percentDiv = document.querySelector("#percent");
        const fileURLInput = document.querySelector("#fileURL");
        const sharingContainer = document.querySelector(".sharing-container");
        const copyBtn = document.querySelector("#copyBtn");
        const emailForm = document.querySelector("#emailForm");
        const maxAllowedSize = 5 * 1024 * 1024;

        const host = "https://fs-2-mqto.onrender.com/";
        const uploadURL = `${host}api/files`;
        const emailURL = `${host}api/files/send`;

        const handleDragOver = (e) => {
            e.preventDefault();
            if (!dropZone.classList.contains("dragged")) {
                dropZone.classList.add("dragged");
            }
        };

        const handleDragLeave = () => {
            dropZone.classList.remove("dragged");
        };

        const handleDrop = (e) => {
            e.preventDefault();
            const files = e.dataTransfer.files;
            dropZone.classList.remove("dragged");
            console.log(files);
            if (files.length) {
                fileInput.files = files;
                uploadFile();
            }
        };

        const handleFileInputChange = () => {
            uploadFile();
        };

        const handleBrowseBtnClick = () => {
            fileInput.click();
        };

        const handleCopyBtnClick = () => {
            fileURLInput.select();
            document.execCommand("copy");
        };

        const uploadFile = () => {
            if (fileInput.files.length > 1) {
                resetFileInput();
                alert("You can only upload 1 file");
                return;
            }

            const file = fileInput.files[0];
            if (file.size > maxAllowedSize) {
                alert("You can only upload max 5mb");
                resetFileInput();
                return;
            }

            progressContainer.style.display = "block";

            const formData = new FormData();
            formData.append("myfile", file);

            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    console.log(xhr.response);
                    onUploadSuccess(JSON.parse(xhr.response));
                }
            };

            xhr.upload.onprogress = updateProgress;

            xhr.open("POST", uploadURL);
            xhr.send(formData);
        };

        const resetFileInput = () => {
            fileInput.value = "";
        };

        const updateProgress = (e) => {
            const percent = Math.round((e.loaded / e.total) * 100);
            bgProgress.style.width = `${percent}%`;
            percentDiv.innerText = percent;
            progressBar.style.transform = `scaleX(${percent / 100})`;
        };

        const onUploadSuccess = ({ file: url }) => {
            fileInput.value = "";
            emailForm[2].removeAttribute("disabled");
            progressContainer.style.display = "none";
            sharingContainer.style.display = "block";
            fileURLInput.value = url;
        };

        const handleEmailFormSubmit = (e) => {
            e.preventDefault();

            const url = fileURLInput.value;

            const formData = {
                uuid: url.split("/").splice(-1, 1)[0],
                emailTo: emailForm.elements["to-email"].value,
                emailFrom: emailForm.elements["from-email"].value
            };

            emailForm[2].setAttribute("disabled", "true");
            console.table(formData);

            fetch(emailURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            }).then(res => res.json())
                .then((data) => {
                    if (data.success) {
                        sharingContainer.style.display = "none";
                    }
                });
        };

        dropZone.addEventListener("dragover", handleDragOver);
        dropZone.addEventListener("dragleave", handleDragLeave);
        dropZone.addEventListener("drop", handleDrop);
        fileInput.addEventListener("change", handleFileInputChange);
        browseBtn.addEventListener("click", handleBrowseBtnClick);
        copyBtn.addEventListener("click", handleCopyBtnClick);
        emailForm.addEventListener("submit", handleEmailFormSubmit);

        return () => {
            dropZone.removeEventListener("dragover", handleDragOver);
            dropZone.removeEventListener("dragleave", handleDragLeave);
            dropZone.removeEventListener("drop", handleDrop);
            fileInput.removeEventListener("change", handleFileInputChange);
            browseBtn.removeEventListener("click", handleBrowseBtnClick);
            copyBtn.removeEventListener("click", handleCopyBtnClick);
            emailForm.removeEventListener("submit", handleEmailFormSubmit);
        };
    }, []);

    return (

            <div>
                <section className="upload-container">
                    <div className="drop-zone">
                        <div className="icon-container">
                            {/*<img src="./file.svg" className="center" alt="file icon" draggable="false"/>*/}
                            {/*<img src="./file.svg" className="right" alt="file icon" draggable="false"/>*/}
                            {/*<img src="./file.svg" className="left" alt="file icon" draggable="false"/>*/}
                        </div>
                        <input type="file" id="fileInput"/>
                        <div className="title">Drop your Files here or, <span class="browseBtn">browse</span>
                        </div>
                    </div>
                    <div className="progress-container">
                        <div className="bg-progress">
                            <div className="inner-container">
                                <div className="title">Uploading...</div>
                                <div className="percent-container"><span id="percent">0</span>%</div>
                                <div className="progress-bar"></div>
                            </div>
                        </div>
                    </div>
                    <div className="sharing-container">
                        <p className="expire">Link expires in 24 hrs</p>
                        <div className="input-container">
                            <input type="text" id="fileURL" readonly value=""/>
                            <img src = "./copy-icon.svg" alt="copy icon" id="copyBtn"/>
                        </div>
                        <p>Or Send Via Email</p>
                        <div className="email-container">
                            <form id="emailForm">
                                <div className="field">
                                    <label>Your email</label>
                                    <input type="email" required name="from-email" id="sender"/>
                                </div>
                                <div className="field">
                                    <label>Receiver's email</label>
                                    <input type="email" required name="to-email" id="receiver"/>
                                </div>
                                <button  type="submit">Send</button>
                            </form>
                        </div>
                    </div>

                </section>

            </div>

    );
};

export default FileSharing;
