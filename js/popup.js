let mode = "decode";

document.getElementById("form-input").addEventListener("input", updateOutput);
document.getElementById("btnSwitch").addEventListener("click", switchMode);

function switchMode() {
    const result = document.getElementById("resultValue").textContent;
    mode = mode === "decode" ? "encode" : "decode";
    document.getElementById("header-text").textContent =
        mode === "decode" ? "base64 decode" : "base64 encode";
    document.getElementById("form-input").value = result;
    updateOutput();
}

function updateOutput() {
    const input = document.getElementById("form-input").value;

    if (!input) {
        document.getElementById("resultValue").textContent = "";
        updateCopyButton();
        return;
    }

    try {
        const result = mode === "decode" ? decodeBase64(input) : encodeBase64(input);
        document.getElementById("resultValue").textContent = result;
    } catch {
        document.getElementById("resultValue").textContent = "Invalid input";
    }

    updateCopyButton();
}

function encodeBase64(str) {
    const bytes = new TextEncoder().encode(str);
    let binary = "";
    for (const byte of bytes) binary += String.fromCharCode(byte);
    return btoa(binary);
}

function decodeBase64(str) {
    const binary = atob(str.replace(/\s/g, ""));
    const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
    return new TextDecoder().decode(bytes);
}

function updateCopyButton() {
    const hasInput = document.getElementById("form-input").value !== "";
    const btnCopy = document.getElementById("btnCopy");

    if (!hasInput && btnCopy) {
        btnCopy.remove();
    } else if (hasInput && !btnCopy) {
        const btn = document.createElement("button");
        btn.textContent = "Copy";
        btn.id = "btnCopy";
        btn.className = "btn";
        btn.addEventListener("click", copyResult);
        document.getElementById("content").appendChild(btn);
    }
}

async function copyResult() {
    const text = document.getElementById("resultValue").textContent;
    await navigator.clipboard.writeText(text);
}
