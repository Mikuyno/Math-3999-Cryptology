function encryptBlockCipher() {
    const text = document.getElementById("inputText").value;
    let key = document.getElementById("blockKey").value;
    const outputDiv = document.getElementById("result");

    key = key.toUpperCase().replace(/[^A-Z]/g, '');
    if (!key) {
        outputDiv.innerText = "Error: Key must contain at least one letter (A-Z).";
        return;
    }

    const SBOX = [6,4,12,5,0,7,2,14,1,15,3,13,8,10,9,11,23,21,19,25,24,22,20,18,17,16];

    let clean = text.replace(/[^a-zA-Z]/g, "").toUpperCase();
    let padded = false;
    if (clean.length % 2 !== 0) {
        clean += "X";
        padded = true;
    }

    let result = "";
    for (let i = 0; i < clean.length; i += 2) {
        let L = clean.charCodeAt(i) - 65;
        let R = clean.charCodeAt(i+1) - 65;
        for (let round = 0; round < 3; round++) {
            let keyVal = key[round % key.length].charCodeAt(0) - 65;
            let mixed = (R + keyVal) % 26;
            let f = SBOX[mixed];
            let newL = R;
            let newR = (L + f) % 26;
            if (newR < 0) newR += 26;
            L = newL;
            R = newR;
        }
        result += String.fromCharCode(L+65) + String.fromCharCode(R+65);
    }
    // Store whether padding was added
    outputDiv.setAttribute("data-padded", padded ? "true" : "false");
    outputDiv.innerText = "Encrypted Text: " + result;
}

function decryptBlockCipher() {
    const text = document.getElementById("inputText").value;
    let key = document.getElementById("blockKey").value;
    const outputDiv = document.getElementById("result");

    key = key.toUpperCase().replace(/[^A-Z]/g, '');
    if (!key) {
        outputDiv.innerText = "Error: Key must contain at least one letter (A-Z).";
        return;
    }

    const SBOX = [6,4,12,5,0,7,2,14,1,15,3,13,8,10,9,11,23,21,19,25,24,22,20,18,17,16];
    let clean = text.toUpperCase().replace(/[^A-Z]/g, "");
    let result = "";

    for (let i = 0; i < clean.length; i += 2) {
        let L = clean.charCodeAt(i) - 65;
        let R = clean.charCodeAt(i+1) - 65;
        for (let round = 2; round >= 0; round--) {
            let keyVal = key[round % key.length].charCodeAt(0) - 65;
            let mixed = (L + keyVal) % 26;
            let f = SBOX[mixed];
            let prevR = L;
            let prevL = (R - f) % 26;
            if (prevL < 0) prevL += 26;
            L = prevL;
            R = prevR;
        }
        result += String.fromCharCode(L+65) + String.fromCharCode(R+65);
    }

    // Remove padding X only if it was added during encryption
    const wasPadded = outputDiv.getAttribute("data-padded") === "true";
    if (wasPadded && result.endsWith('X')) {
        result = result.slice(0, -1);
    }

    outputDiv.innerText = "Decrypted Text: " + result;
}