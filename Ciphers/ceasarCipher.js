function encryptCeasarCipher() {
    const msgInput = document.getElementById('inputText');
    const shiftInput = document.getElementById('shiftValue');
    const outputDiv = document.getElementById('result');

    const text = msgInput.value;
    const k = parseInt(shiftInput.value) || 0;
    let result = "";

    for (let i = 0; i < text.length; i++) {
        const code = text.charCodeAt(i);

        if (code >= 65 && code <= 90) {
            const p = code - 65;
            let c = (p + k) % 26;
            if (c < 0) c += 26;
            result += String.fromCharCode(c + 65);
        }
        else if (code >= 97 && code <= 122) {
            const p = code - 97;
            let c = (p + k) % 26;
            if (c < 0) c += 26;
            result += String.fromCharCode(c + 97);
        }
        else if (code >= 48 && code <= 57) {
            const p = code - 48;
            let c = (p + k) % 10;
            if (c < 0) c += 10;
            result += String.fromCharCode(c + 48);
        }
        else {
            result += text[i];
        }
    }
    outputDiv.innerText = "Encrypted Text: " + result;
}

function decryptCeasarCipher() {
    const shiftInput = document.getElementById('shiftValue');
    const originalK = parseInt(shiftInput.value) || 0;

    shiftInput.value = originalK * -1;
    encryptCeasarCipher();

    document.getElementById('result').innerText = document.getElementById('result').innerText.replace("Encrypted", "Decrypted");
    shiftInput.value = originalK;
}
