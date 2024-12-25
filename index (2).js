document.addEventListener('DOMContentLoaded', () => {
    displaySavedConversions();
});

function displaySavedConversions() {
    const savedConversions = JSON.parse(localStorage.getItem("savedConversions")) || [];
    const savedConversionsDiv = document.getElementById("savedConversions");

    if (savedConversions.length === 0) {
        savedConversionsDiv.innerHTML = "<p>No saved conversions.</p>";
    } else {
        savedConversionsDiv.innerHTML = savedConversions.map(conversion => `
            <div class="conversion-item mb-3 p-3 border rounded bg-light text-dark">
                <p><strong>Category:</strong> ${conversion.category}</p>
                <p><strong>From:</strong> ${conversion.fromUnit}</p>
                <p><strong>To:</strong> ${conversion.toUnit}</p>
                <p><strong>Value:</strong> ${conversion.value}</p>
                <p><strong>Result:</strong> ${conversion.result || "N/A"}</p>
            </div>
        `).join('');
    }
}
