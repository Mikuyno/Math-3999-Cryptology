function caesarLogic(text, shift) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        const code = text.charCodeAt(i);
        if (code >= 65 && code <= 90) {
            let p = code - 65;
            let c = (p + shift) % 26;
            if (c < 0) c += 26;
            result += String.fromCharCode(c + 65);
        } else if (code >= 97 && code <= 122) {
            let p = code - 97;
            let c = (p + shift) % 26;
            if (c < 0) c += 26;
            result += String.fromCharCode(c + 97);
        } else if (code >= 48 && code <= 57) {
            let p = code - 48;
            let c = (p + shift) % 10;
            if (c < 0) c += 10;
            result += String.fromCharCode(c + 48);
        } else {
            result += text[i];
        }
    }
    return result;
}

function encryptCeasarCipher() {
    const text = document.getElementById("inputText").value;
    const k = parseInt(document.getElementById("shiftValue").value) || 0;
    const result = caesarLogic(text, k);
    document.getElementById("result").innerText = "Encrypted Text: " + result;
}

function decryptCeasarCipher() {
    const text = document.getElementById("inputText").value;
    const k = parseInt(document.getElementById("shiftValue").value) || 0;
    const result = caesarLogic(text, -k);
    document.getElementById("result").innerText = "Decrypted Text: " + result;
}
