window.addEventListener("load", function () {
    const select = document.getElementById("cipherSelect");
    if (!select) return;

    function showSelectedCipher() {
        const selectedCipher = select.value;

        // Hide all cipher sections
        document.querySelectorAll(".cipher-section").forEach(section => {
            section.style.display = "none";
        });

        // Show selected cipher section
        if (selectedCipher) {
            const target = document.getElementById(selectedCipher);
            if (target) target.style.display = "block";
        }
        
        // Clear previous results
        document.getElementById("result").innerText = "";
    }

    select.addEventListener("change", showSelectedCipher);
});