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

/* function encryptAffineCipher() { Klement's code
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
} */

function encryptHillCipher() {
    const text = document.getElementById("inputText").value.toUpperCase().replace(/[^A-Z]/g, '');
    const keyMatrixInput = document.getElementById("keyMatrix").value;
    const outputDiv = document.getElementById("result");

    const keyRows = keyMatrixInput.split(";");
    if (keyRows.length === 0) {
        outputDiv.innerText = "Invalid key matrix format.";
        return;
    }


    const keyMatrix = keyRows.map(row =>
        row.trim().split("").map(char => char.toUpperCase().charCodeAt(0) - 65)
    );
    const n = keyMatrix.length;
    if (n === 0) {
        outputDiv.innerText = "Key matrix cannot be empty.";
        return;
    }
    const isSquare = keyMatrix.every(row => row.length === n);
    if (!isSquare) {
        outputDiv.innerText = "Key matrix must be square.";
        return;
    }

    let paddedText = text;
    while (paddedText.length % n !== 0) {
        paddedText += "X";
    }

    let result = "";
    for (let i = 0; i < paddedText.length; i += n) {
        for (let row = 0; row < n; row++) {
            let sum = 0;
            for (let col = 0; col < n; col++) {
                let charCode = paddedText.charCodeAt(i + col) - 65;
                sum += keyMatrix[row][col] * charCode;
            }
            result += String.fromCharCode((sum % 26) + 65);
        }
    }

    outputDiv.innerText = "Encrypted Text: " + result;
}

function decryptHillCipher() {
    const text = document.getElementById("inputText").value.toUpperCase().replace(/[^A-Z]/g, '');
    const keyMatrixInput = document.getElementById("keyMatrix").value;
    const outputDiv = document.getElementById("result");

    const keyRows = keyMatrixInput.split(";");
    if (keyRows.length === 0) {
        outputDiv.innerText = "Invalid key matrix format.";
        return;
    }

    const keyMatrix = keyRows.map(row =>
        row.trim().split("").map(char => char.toUpperCase().charCodeAt(0) - 65)
    );
    const n = keyMatrix.length;
    if (n === 0) {
        outputDiv.innerText = "Key matrix cannot be empty.";
        return;
    }
    const isSquare = keyMatrix.every(row => row.length === n);
    if (!isSquare) {
        outputDiv.innerText = "Key matrix must be square.";
        return;
    }

    const getDet = (mat) => {
        if (mat.length === 1) return mat[0][0];
        if (mat.length === 2) return mat[0][0] * mat[1][1] - mat[0][1] * mat[1][0];
        let d = 0;
        for (let c = 0; c < mat.length; c++) {
            const minor = mat.filter((_, r) => r !== 0).map(row => row.filter((_, col) => col !== c));
            d += Math.pow(-1, c) * mat[0][c] * getDet(minor);
        }
        return d;
    };

    let det = getDet(keyMatrix) % 26;
    if (det < 0) det += 26;

    let inverseDet = null;
    for (let i = 1; i < 26; i++) {
        if ((det * i) % 26 === 1) {
            inverseDet = i;
            break;
        }
    }

    if (inverseDet === null) {
        outputDiv.innerText = "Invalid matrix. Determinant has no inverse.";
        return;
    }

    let inverseMatrix = [];
    for (let i = 0; i < n; i++) {
        inverseMatrix[i] = [];
        for (let j = 0; j < n; j++) {
            let minor = keyMatrix.filter((_, r) => r !== j).map(row => row.filter((_, c) => c !== i));
            let cofactor = Math.pow(-1, i + j) * getDet(minor);

            let val = (cofactor * inverseDet) % 26;
            if (val < 0) val += 26;

            inverseMatrix[i][j] = val;
        }
    }

    let result = "";
    for (let i = 0; i < text.length; i += n) {
        for (let row = 0; row < n; row++) {
            let sum = 0;
            for (let col = 0; col < n; col++) {
                let charCode;
                if (i + col < text.length) {
                    charCode = text.charCodeAt(i + col) - 65;
                } else {
                    charCode = 23;
                }
                sum += inverseMatrix[row][col] * charCode;
            }

            let finalVal = sum % 26;
            if (finalVal < 0) finalVal += 26;

            result += String.fromCharCode(finalVal + 65);
        }
    }

    outputDiv.innerText = "Decrypted Text: " + result;
}

function stringtoBytes(str) {
    const bytes = [];
    for (let i = 0; i < str.length; i++) {
        bytes.push(str.charCodeAt(i) & 0xFF);
    }
    return bytes;
}

function blockTextPadding(text, blockSize) {
    const paddingNeeded = blockSize - (text.length % blockSize);
    const padded = text.slice();
    for (let i = 0; i < paddingNeeded; i++) {
        padded.push(paddingNeeded);
    }
    return padded;
}

function normalizeBlockKey(key, KeySize) {
    const normalized = key.slice(0, KeySize);
    while (normalized.length < KeySize) {
        normalized.push(0);
    }
    return normalized;
}

function splitBlocks(text, blockSize) {
    const blocks = [];
    for (let i = 0; i < text.length; i += blockSize) {
        blocks.push(text.slice(i, i + blockSize));
    }
    return blocks;
}

function xorBlock(block, key) {
    return block.map((byte, index) => byte ^ key[index]);
}

function encryptBlockCipher() {
    const BLOCK_SIZE = 16;
    //const NUM_ROUNDS = 10;
    const KEY_SIZE = 16;

    const text = document.getElementById("inputText").value;
    const key = document.getElementById("blockKey").value;

    let textBytes = stringtoBytes(text);
    const keyBytes = stringtoBytes(key).slice(0, KEY_SIZE);

    console.log("Text Bytes:", textBytes);
    console.log("Key Bytes:", keyBytes);

    textBytes = blockTextPadding(textBytes, BLOCK_SIZE);

    const blocks = splitBlocks(textBytes, BLOCK_SIZE);
    const normalizedKey = normalizeBlockKey(keyBytes, KEY_SIZE);

    const ciphertextBlocks = blocks.map(block => xorBlock(block, normalizedKey));
    const ciphertextBytes = ciphertextBlocks.flat();

    const hexBytes = ciphertextBytes.map(b => b.toString(16).padStart(2, '0').toUpperCase());
    const groupedHex = [];
    for (let i = 0; i < hexBytes.length; i += 4) {
        groupedHex.push(hexBytes.slice(i, i + 4).join(' '));
    }
    const readableHex = groupedHex.join('  ');
    document.getElementById("result").innerText = "Encrypted Text (Hex): " + readableHex;
}

function hexToBytes(hex) {
    const bytes = [];
    for (let i = 0; i < hex.length; i += 2) {
        bytes.push(parseInt(hex.substr(i, 2), 16));
    }
    return bytes;
}

function decryptBlockCipher() {
    const BLOCK_SIZE = 16;
    const KEY_SIZE = 16;
    const hexInput = document.getElementById("inputText").value.replace(/\s+/g, '');
    const key = document.getElementById("blockKey").value;
    const keyBytes = stringtoBytes(key).slice(0, KEY_SIZE);
    const ciphertextBytes = hexToBytes(hexInput);

    const blocks = splitBlocks(ciphertextBytes, BLOCK_SIZE);
    const normalizedKey = normalizeBlockKey(keyBytes, KEY_SIZE);
    const decryptedBlocks = blocks.map(block => xorBlock(block, normalizedKey));
    const decryptedBytes = decryptedBlocks.flat();
    const decryptedText = String.fromCharCode(...decryptedBytes);
    document.getElementById("result").innerText = "Decrypted Text: " + decryptedText;
}