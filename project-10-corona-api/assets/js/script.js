const API_ENDPOINT = "https://disease.sh/v3/covid-19/all";

const ui = {
    confirmed: document.querySelector("#confirmed"),
    recovered: document.querySelector("#recovered"),
    deaths: document.querySelector("#deaths"),
    loading: document.querySelector("#loading"),
    error: document.querySelector("#error"),
    cards: document.querySelector("#cards"),
    refresh: document.querySelector("#refreshBtn")
};

async function loadCovidStats() {
    toggleLoading(true);
    clearError();

    try {
        const res = await fetch(API_ENDPOINT);

        if (!res.ok) {
            throw new Error("API response error");
        }

        const json = await res.json();
updateUI(json);

    } catch (err) {
        showError("⚠️ Data not available right now");
        console.error("COVID API Error:", err);

    } finally {
        toggleLoading(false);
    }
}

function updateUI(stats) {
    ui.confirmed.textContent = formatNumber(stats.cases);
    ui.recovered.textContent = formatNumber(stats.recovered);
    ui.deaths.textContent = formatNumber(stats.deaths);

    ui.cards.style.display = "flex";
}

function formatNumber(num) {
    return num.toLocaleString();
}

function toggleLoading(state) {
    ui.loading.style.display = state ? "block" : "none";
    ui.cards.style.display = state ? "none" : "flex";
}

function clearError() {
    ui.error.textContent = "";
}

function showError(message) {
    ui.error.textContent = message;
}

ui.refresh.addEventListener("click", loadCovidStats);

loadCovidStats();
