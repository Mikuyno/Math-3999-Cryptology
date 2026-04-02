window.addEventListener("load", function () {
    const select = document.getElementById("cipherSelect");
    if (!select) return;

    function showSelectedCipher() {
        const selectedCipher = select.value;
        const container = document.querySelector(".CipherContainer");
        if (container) {
            container.style.display = selectedCipher ? "block" : "none";
        }

        document.querySelectorAll(".CipherContainer > div").forEach(div => {
            div.style.display = "none";
        });

        if (selectedCipher) {
            const target = document.getElementById(selectedCipher);
            if (target) target.style.display = "block";
        }
        document.getElementById("result").innerText = "";
    }

    select.addEventListener("change", showSelectedCipher);
});

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

function vigenèreCipherLogic(text, key, encrypt = true) {
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

/* Klement code 
function vigenèreCipherLogic(text, key) {
    const cleanKey = key.replace(/[^a-zA-Z]/g, "");//  removes any numbers and stuff
    let result = ""; // Currently Empty 
    let j = 0;
    for (let i = 0; i < text.length; i++) //goes through the letters
    {
        const code = text.charCodeAt(i);// gets letters from ASCII thing
        if (code >= 65 && code <= 90) { // Uppercase Letters
            const kChar = cleanKey[j % cleanKey.length];//

            const k = kChar.toUpperCase().charCodeAt(0) - 65; //whatever the shift number may be
            const p = code - 65; // gets letter number from 0-25 which will
            //be used to calculate the newer letter number
            let c = (p + k) % 26; //applies the shift.
            if (c < 0) c += 26; //just a fail safe for negative numbers...
            result += String.fromCharCode(c + 65); //adds the letter to the result.
            j++;
        }
        else if (code >= 97 && code <= 122) //same logic as the uppercase but just with lowercase
        {
            const kChar = cleanKey[j % cleanKey.length];
            const k = kChar.toUpperCase().charCodeAt(0) - 65;

            const p = code - 97;
            let c = (p + k) % 26;
            result += String.fromCharCode(c + 97);
            j++;
        }
        else //this is just for things like punctuation and spaces.
        {
            result += text[i];
        }
    }
    return result;
} */

function encryptVigenereCipher() {
    const inputText = document.getElementById("inputText").value;
    const key = document.getElementById("key").value;
    const encryptedText = vigenèreCipherLogic(inputText, key, true);
    document.getElementById("result").innerText = `Encrypted Text: ${encryptedText}\nOriginal Text: ${inputText}\nKey: ${key}`;
}

function decryptVigenereCipher() {
    const inputText = document.getElementById("inputText").value;
    const key = document.getElementById("key").value;
    const decryptedText = vigenèreCipherLogic(inputText, key, false);
    document.getElementById("result").innerText = `Decrypted Text: ${decryptedText}\nEncrypted Text: ${inputText}\nKey: ${key}`;
}

function encryptAffineCipher() {
    const text = document.getElementById("inputText").value;
    const k = parseInt(document.getElementById("k").value);
    const b = parseInt(document.getElementById("b").value);
    const outputDiv = document.getElementById("result");

    if (isNaN(k) || isNaN(b)) {
        outputDiv.innerText = "Please enter valid numbers for k and b.";
        return;
    }

    let result = "";

    for (let i = 0; i < text.length; i++) {
        const code = text.charCodeAt(i);

        if (code >= 65 && code <= 90) {
            const p = code - 65;
            const c = (k * p + b) % 26;
            result += String.fromCharCode(c + 65);
        }
        else if (code >= 97 && code <= 122) {
            const p = code - 97;
            const c = (k * p + b) % 26;
            result += String.fromCharCode(c + 97);
        }
        else {
            result += text[i];
        }
    }

    outputDiv.innerText = "Encrypted Text: " + result;
}
function decryptAffineCipher() {
    const text = document.getElementById("inputText").value;
    const k = parseInt(document.getElementById("k").value);
    const b = parseInt(document.getElementById("b").value);
    const outputDiv = document.getElementById("result");

    const inverse = findInverse(k);

    if (inverse === null) {
        outputDiv.innerText = "Invalid value for k.";
        return;
    }

    let result = "";

    for (let i = 0; i < text.length; i++) {
        const code = text.charCodeAt(i);

        if (code >= 65 && code <= 90) {
            let c = code - 65;
            let p = (inverse * (c - b)) % 26;
            if (p < 0) p += 26;
            result += String.fromCharCode(p + 65);
        }
        else if (code >= 97 && code <= 122) {
            let c = code - 97;
            let p = (inverse * (c - b)) % 26;
            if (p < 0) p += 26;
            result += String.fromCharCode(p + 97);
        }
        else {
            result += text[i];
        }
    }

    outputDiv.innerText = "Decrypted Text: " + result;
}
 function findInverse(k) {
    for (let i = 1; i < 26; i++) {
        if ((k * i) % 26 === 1) {
            return i;
        }
    }
    return null;
}
function encryptHillCipher() {
    const text = document.getElementById("inputText").value;
    const a = parseInt(document.getElementById("hillA").value);
    const b = parseInt(document.getElementById("hillB").value);
    const c = parseInt(document.getElementById("hillC").value);
    const d = parseInt(document.getElementById("hillD").value);
    const outputDiv = document.getElementById("result");

    if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d)) {
        outputDiv.innerText = "Please enter valid numbers for a, b, c, and d.";
        return;
    }

    let result = "";

    for (let i = 0; i < text.length; i += 2) {
        let x1 = text[i].toUpperCase().charCodeAt(0) - 65;
        let x2 = (i + 1 < text.length)
            ? text[i + 1].toUpperCase().charCodeAt(0) - 65
            : 23;

        let y1 = (a * x1 + b * x2) % 26;
        let y2 = (c * x1 + d * x2) % 26;

        if (y1 < 0) y1 += 26;
        if (y2 < 0) y2 += 26;

        result += String.fromCharCode(y1 + 65) + String.fromCharCode(y2 + 65);
    }

    outputDiv.innerText = "Encrypted Text: " + result;
}


function decryptHillCipher() {
    const text = document.getElementById("inputText").value;
    const a = parseInt(document.getElementById("hillA").value);
    const b = parseInt(document.getElementById("hillB").value);
    const c = parseInt(document.getElementById("hillC").value);
    const d = parseInt(document.getElementById("hillD").value);
    const outputDiv = document.getElementById("result");

    let det = (a*d - b*c) % 26;
    if (det < 0) det += 26;

    const inverseDet = findInverse(det);
    if (inverseDet === null) {
        outputDiv.innerText = "Invalid matrix. Determinant has no inverse.";
        return;
    }

    let aInv = (d * inverseDet) % 26;
    let bInv = (-b * inverseDet) % 26;
    let cInv = (-c * inverseDet) % 26;
    let dInv = (a * inverseDet) % 26;

    if (bInv < 0) bInv += 26;
    if (cInv < 0) cInv += 26;

    let result = "";

    for (let i = 0; i < text.length; i += 2) {
        let x1 = text.charCodeAt(i) - 65;
        let x2 = (i + 1 < text.length) ? text.charCodeAt(i + 1) - 65 : 23;

        let y1 = (aInv * x1 + bInv * x2) % 26;
        let y2 = (cInv * x1 + dInv * x2) % 26;

        if (y1 < 0) y1 += 26;
        if (y2 < 0) y2 += 26;

        result += String.fromCharCode(y1 + 65) + String.fromCharCode(y2 + 65);
    }

    outputDiv.innerText = "Decrypted Text: " + result;
}
