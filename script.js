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
const downloadBtn = document.getElementById("download-btn");

let uploadedImageURL = null; // Stores the uploaded image URL

// Generate ID Card
generateBtn.addEventListener("click", () => {
    const name = document.getElementById("name").value;
    const studentClass = document.getElementById("class").value;
    const roll = document.getElementById("roll").value;
    const phone = document.getElementById("phone").value;

    if (name && studentClass && roll && phone) {
        // Update ID card fields
        studentNameElement.textContent = name;
        studentClassElement.textContent = studentClass;
        studentRollElement.textContent = roll;
        studentPhoneElement.textContent = phone;

        // If an image is uploaded, display it. Otherwise, display a placeholder or nothing.
        studentPhotoElement.innerHTML = ''; // Clear any previous photo
        if (uploadedImageURL) {
            const photo = document.createElement("img");
            photo.src = uploadedImageURL;
            photo.height = 130;
            photo.width = 130;
            studentPhotoElement.appendChild(photo);
        } else {
            // Optional: Show a placeholder when no photo is uploaded
            const placeholder = document.createElement("div");
            placeholder.style.width = "130px";
            placeholder.style.height = "130px";
            placeholder.style.backgroundColor = "#ddd";
            placeholder.style.borderRadius = "50%";
            studentPhotoElement.appendChild(placeholder);
        }

        // Clear and generate a new QR Code
        qrCodeContainer.innerHTML = "";
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

        // Show the modal
        modal.style.display = "flex";
    } else {
        alert("Please fill out all fields.");
    }
});

// Close the modal
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Handle photo upload
photoInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = function () {
            uploadedImageURL = reader.result;
            console.log("Uploaded Image URL:", uploadedImageURL);
        };
        reader.readAsDataURL(file);
    }
});

// Download ID as PNG
downloadBtn.addEventListener("click", () => {
    const cardContainer = document.querySelector(".card-container");

    domtoimage
        .toPng(cardContainer, {
            cacheBust: true,
            useImageCache: true,
        })
        .then((dataUrl) => {
            const link = document.createElement("a");
            link.download = "student_id.png";
            link.href = dataUrl;
            link.click();
        })
        .catch((error) => {
            console.error("Error generating the ID card:", error);
        });
});
