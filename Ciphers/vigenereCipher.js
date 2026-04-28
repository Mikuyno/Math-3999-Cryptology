function vigenereCipherLogic(text, key, encrypt = true) {
    key = key.toUpperCase().replace(/[^A-Z]/g, "");
    if (key.length === 0) return text;

    let result = "";
    let keyIndex = 0;
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (char.match(/[a-z]/i)) {
            let code = text.charCodeAt(i);
            let base = (code >= 65 && code <= 90) ? 65 : 97;
            let keyChar = key[keyIndex % key.length];
            let keyShift = keyChar.charCodeAt(0) - 65;

            if (encrypt) {
                char = String.fromCharCode(((code - base + keyShift) % 26) + base);
            } else {
                char = String.fromCharCode(((code - base - keyShift + 26) % 26) + base);
            }
            keyIndex++;
        }
        result += char;
    }
    return result;
}

function encryptVigenereCipher() {
    const inputText = document.getElementById("inputText").value;
    const key = document.getElementById("key").value;
    const encryptedText = vigenereCipherLogic(inputText, key, true);
    document.getElementById("result").innerText = `Encrypted Text: ${encryptedText}\nOriginal Text: ${inputText}\nKey: ${key}`;
}

function decryptVigenereCipher() {
    const inputText = document.getElementById("inputText").value;
    const key = document.getElementById("key").value;
    const decryptedText = vigenereCipherLogic(inputText, key, false);
    document.getElementById("result").innerText = `Decrypted Text: ${decryptedText}\nEncrypted Text: ${inputText}\nKey: ${key}`;
}