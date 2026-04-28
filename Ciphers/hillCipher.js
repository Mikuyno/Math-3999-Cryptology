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
