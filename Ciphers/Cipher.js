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

function vigenèreCipherLogic(text, key)
 {
const cleanKey=key.replace(/[^a-zA-Z]/g,"");//  removes any numbers and stuff
let result = ""; // Currently Empty 
let j=0; 
for (let i=0;i< text.length;i++) //goes through the letters
    { 
    const code=text.charCodeAt(i);// gets letters from ASCII thing
    if (code >=65 && code <=90){ // Uppercase Letters
        const kChar=cleanKey[j%cleanKey.length];//
        
        const k=kChar.toUpperCase().charCodeAt(0)-65; //whatever the shift number may be
        const p=code-65; // gets letter number from 0-25 which will
        //be used to calculate the newer letter number
        let c =(p+k)%26; //applies the shift.
        if (c<0) c+=26; //just a fail safe for negative numbers...
        result +=String.fromCharCode(c+65); //adds the letter to the result.
        j++;
    }
    else if (code>=97 && code <=122) //same logic as the uppercase but just with lowercase
    {
        const kChar=cleanKey [j%cleanKey.length];
        const k=kChar.toUpperCase().charCodeAt(0)-65;

        const p=code-97;
        let c=(p+k)%26;
        result+=String.fromCharCode(c+97);
        j++;
    }
    else //this is just for things like punctuation and spaces.
        {
        result += text[i];
    }
}
return result;
}
function encryptVigenereCipher() {
    const inputText = document.getElementById("inputText");
    const keyInput = document.getElementById("key");
    const output = document.getElementById("result");

    const text = inputText.value;
    const key = keyInput.value;

    output.innerText = "Encrypted Text: " + vigenèreCipherLogic(text, key);
}