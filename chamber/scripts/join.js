document.addEventListener("DOMContentLoaded", () => {
    // 1. Set the hidden timestamp value on load
    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // 2. Manage Modals for Membership Cards
    const modals = {
        np: document.getElementById("modal-np"),
        bronze: document.getElementById("modal-bronze"),
        silver: document.getElementById("modal-silver"),
        gold: document.getElementById("modal-gold")
    };

    Object.keys(modals).forEach(level => {
        const openBtn = document.getElementById(`open-${level}`);
        const closeBtn = document.getElementById(`close-${level}`);
        const dialog = modals[level];

        if (openBtn && dialog) {
            openBtn.addEventListener("click", () => dialog.showModal());
        }
        if (closeBtn && dialog) {
            closeBtn.addEventListener("click", () => dialog.close());
        }
    });
});