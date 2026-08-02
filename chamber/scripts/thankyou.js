document.addEventListener("DOMContentLoaded", () => {
    const formData = new URLSearchParams(window.location.search);

    const showField = (fieldId, paramName) => {
        const element = document.getElementById(fieldId);
        if (element && formData.has(paramName)) {
            element.textContent = formData.get(paramName);
        }
    };

    showField("results-fname", "fname");
    showField("results-lname", "lname");
    showField("results-email", "email");
    showField("results-phone", "phone");
    showField("results-organization", "organization");
    showField("results-timestamp", "timestamp");

    // Format timestamp cleanly
    const timestampElem = document.getElementById("results-timestamp");
    if (timestampElem && formData.has("timestamp")) {
        const rawDate = formData.get("timestamp");
        const dateObj = new Date(rawDate);
        timestampElem.textContent = isNaN(dateObj) ? rawDate : dateObj.toLocaleString();
    }
});