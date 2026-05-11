const uploadBtn = document.getElementById("uploadBtn");
const imageUpload = document.getElementById("imageUpload");
const productImage = document.getElementById("productImage");
const enhanceBtn = document.getElementById("enhanceBtn");
const resultBox = document.getElementById("aiResult");
const socialAd = document.getElementById("socialAd");
const bioCaption = document.getElementById("bioCaption");
const hashtagsBox = document.getElementById("hashtags");

let selectedFile = null;

uploadBtn.addEventListener("click", () => {
    imageUpload.click();
});

imageUpload.addEventListener("change", (e) => {
    selectedFile = e.target.files[0];

    if (!selectedFile) return;

    const imageURL = URL.createObjectURL(selectedFile);
    productImage.src = imageURL;
});

enhanceBtn.addEventListener("click", async () => {
    if (!selectedFile) {
        alert("قم برفع صورة أولاً");
        return;
    }

    resultBox.innerText = "AI is analyzing the image...";
    socialAd.innerText = "Generating ad...";
    bioCaption.innerText = "Generating caption...";
    hashtagsBox.innerText = "Generating hashtags...";

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
        const response = await fetch("http://localhost:3001/api/analysis", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (!response.ok) {
            resultBox.innerText = data.error || data.message || "Server error";
            socialAd.innerText = "";
            bioCaption.innerText = "";
            hashtagsBox.innerText = "";
            return;
        }

        const ai = data.ai_response || {};

        resultBox.innerText = ai.description || "No description returned.";
        socialAd.innerText = ai.ad || "No ad returned.";
        bioCaption.innerText = ai.bio || "No caption returned.";

        hashtagsBox.innerText = Array.isArray(ai.hashtags)
            ? ai.hashtags.join(" ")
            : ai.hashtags || "No hashtags returned.";

    } catch (error) {
        console.error("FRONTEND ERROR:", error);

        resultBox.innerText = "Frontend error: " + error.message;
        socialAd.innerText = "";
        bioCaption.innerText = "";
        hashtagsBox.innerText = "";
    }
});