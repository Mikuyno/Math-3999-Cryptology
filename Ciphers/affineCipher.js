function encryptAffineCipher() {
    const originalText = document.getElementById("inputText").value;
    const k = parseInt(document.getElementById("kValue").value);
    const b = parseInt(document.getElementById("bValue").value);

    if (k < 1 || k > 24 || modInverse(k, 26) === -1) {
        document.getElementById("result").innerText = "Error: k must be between 1-24 and coprime with 26.";
        return;
    }

    if (b < 0 || b > 25) {
        document.getElementById("result").innerText = "Error: b must be between 0-25.";
        return;
    }

    let result = "";
    for (let i = 0; i < originalText.length; i++) {
        const code = originalText.charCodeAt(i);
        if (code >= 65 && code <= 90) {
            const p = code - 65;
            const c = (k * p + b) % 26;
            result += String.fromCharCode(c + 65);
        } else if (code >= 97 && code <= 122) {
            const p = code - 97;
            const c = (k * p + b) % 26;
            result += String.fromCharCode(c + 97);
        } else {
            result += originalText[i];
        }
    }
    document.getElementById("result").innerText = `Encrypted Text: ${result}\nOriginal Text: ${originalText}\nKey: ${k}, ${b}`;
}

function modInverse(a, m) {
    for (let i = 1; i < m; i++) {
        if ((a * i) % m === 1) {
            return i;
        }
    }
    return -1;
}

function decryptAffineCipher() {
    const encryptedText = document.getElementById("inputText").value;
    const k = parseInt(document.getElementById("kValue").value);
    const b = parseInt(document.getElementById("bValue").value);

    if (k < 1 || k > 24) {
        document.getElementById("result").innerText = "Error: k must be between 1-24.";
        return;
    }

    if (b < 0 || b > 25) {
        document.getElementById("result").innerText = "Error: b must be between 0-25.";
        return;
    }

    const kInv = modInverse(k, 26);
    if (kInv === -1) {
        document.getElementById("result").innerText = "Error: k has no modular inverse modulo 26.";
        return;
    }
    let result = "";
    for (let i = 0; i < encryptedText.length; i++) {
        const code = encryptedText.charCodeAt(i);
        if (code >= 65 && code <= 90) {
            const c = code - 65;
            const p = (kInv * ((c - b + 26) % 26)) % 26;
            result += String.fromCharCode(p + 65);
        } else if (code >= 97 && code <= 122) {
            const c = code - 97;
            const p = (kInv * ((c - b + 26) % 26)) % 26;
            result += String.fromCharCode(p + 97);
        } else {
            result += encryptedText[i];
        }
    }
    document.getElementById("result").innerText = `Decrypted Text: ${result}\nEncrypted Text: ${encryptedText}\nKey: ${k}, ${b}`;
}