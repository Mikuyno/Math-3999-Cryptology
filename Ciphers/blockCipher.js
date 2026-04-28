
function encryptBlockCipher() {
    const text = document.getElementById("inputText").value;
    const key = document.getElementById("blockKey").value;
    const outputDiv = document.getElementById("result");

    if (!key) {
        outputDiv.innerText = "Please enter a valid key.";
        return;
    }
    const SBOX = [
        6, 4, 12, 5, 0, 7, 2, 14, 1, 15, 3, 13, 8, 10, 9, 11,
        23, 21, 19, 25, 24, 22, 20, 18, 17, 16
    ];


    let clean = text.replace(/[^a-zA-Z]/g, "").toUpperCase();
    if (clean.length % 2 !== 0) clean += "X";

    let result = "";

    for (let i = 0; i < clean.length; i += 2) {
        let L = clean.charCodeAt(i) - 65;
        let R = clean.charCodeAt(i + 1) - 65;

        for (let round = 0; round < 3; round++) {
            let keyVal = key.toUpperCase().charCodeAt(round % key.length) - 65;

            let mixed = (R + keyVal) % 26;
            let f = SBOX[mixed];

            let newL = R;
            let newR = (L + f) % 26;
            if (newR < 0) newR += 26;

            L = newL;
            R = newR;
        }

        result += String.fromCharCode(L + 65) + String.fromCharCode(R + 65);
    }
    outputDiv.innerText = "Decrypted Text: " + result;

    outputDiv.innerText = "Encrypted Text: " + result;
}

function decryptBlockCipher() {
    const text = document.getElementById("inputText").value;
    const key = document.getElementById("blockKey").value;
    const outputDiv = document.getElementById("result");

    if (!key) {
        outputDiv.innerText = "Please enter a valid key.";
        return;
    }

    const SBOX = [
        6, 4, 12, 5, 0, 7, 2, 14, 1, 15, 3, 13, 8, 10, 9, 11,
        23, 21, 19, 25, 24, 22, 20, 18, 17, 16
    ];
    let clean = text.toUpperCase().replace(/[^A-Z]/g, "");
    let result = "";

    for (let i = 0; i < clean.length; i += 2) {
        let L = clean.charCodeAt(i) - 65;
        let R = clean.charCodeAt(i + 1) - 65;

        for (let round = 2; round >= 0; round--) {
            let keyVal = key.toUpperCase().charCodeAt(round % key.length) - 65;

            let mixed = (L + keyVal) % 26;
            let f = SBOX[mixed];

            let prevR = L;
            let prevL = (R - f) % 26;
            if (prevL < 0) prevL += 26;

            L = prevL;
            R = prevR;
        }

        result += String.fromCharCode(L + 65) + String.fromCharCode(R + 65);
    }
    outputDiv.innerText = "Decrypted Text: " + result;

}
