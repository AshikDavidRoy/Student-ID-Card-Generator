const generateBtn = document.getElementById("generate-btn");
        const modal = document.getElementById("modal");
        const closeBtn = document.getElementById("close-btn");
        const photoInput = document.getElementById("photo");
        const studentNameElement = document.getElementById("student-name");
        const studentClassElement = document.getElementById("student-class");
        const studentRollElement = document.getElementById("student-roll");
        const studentPhoneElement = document.getElementById("student-phone");
        const studentPhotoElement = document.getElementById("student-photo");
        const qrCodeContainer = document.getElementById("qr-code");

        let uploadedImageURL = null;

        generateBtn.addEventListener("click", () => {
            const name = document.getElementById("name").value;
            const studentClass = document.getElementById("class").value;
            const roll = document.getElementById("roll").value;
            const phone = document.getElementById("phone").value;

            if (name && studentClass && roll && phone) {
                studentNameElement.textContent = name;
                studentClassElement.textContent = studentClass;
                studentRollElement.textContent = roll;
                studentPhoneElement.textContent = phone;

                if (uploadedImageURL) {
                    const photo = document.createElement("img");
                    photo.src = uploadedImageURL;
                    photo.height = 130;
                    photo.width = 130;
                    studentPhotoElement.innerHTML = "";  // Clear previous photo
                    studentPhotoElement.appendChild(photo);
                }

                // Generate QR Code
                const qrData = `
                    Name: ${name}
                    Class: ${studentClass}
                    Roll: ${roll}
                    Phone: ${phone}
                `;

                new QRCode(qrCodeContainer, {
                    text: qrData,
                    width: 80,
                    height: 80,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                });

                modal.style.display = "flex";
            } else {
                alert("Please fill out all fields.");
            }
        });

        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });

        photoInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = function () {
                    uploadedImageURL = reader.result;
                };
                reader.readAsDataURL(file);
            }
        });

        const downloadBtn = document.getElementById("download-btn");

        downloadBtn.addEventListener("click", () => {
            const cardContainer = document.querySelector(".card-container");

            // Using dom-to-image to capture the content and download as PNG
            domtoimage.toPng(cardContainer, {
                styleSheets: ['https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css'], // Add FontAwesome stylesheet
                // useImageCache: true, // Cache external images
            })
                .then(function (dataUrl) {
                    const link = document.createElement("a");
                    link.download = "student_id.png";
                    link.href = dataUrl;
                    link.click();
                })
                .catch(function (error) {
                    console.error("Error capturing the ID card:", error);
                });
        });