// Cipher Learning Information
const cipherInfo = {
    ceasar: {
        title: "Caesar Cipher",
        content: `
            <h3>📖 Overview</h3>
            <p>The Caesar Cipher is one of the simplest and most well-known encryption techniques. It is a substitution cipher where each letter in the plaintext is shifted a fixed number of positions down the alphabet.</p>

            <h3>🔧 How It Works</h3>
            <p>The Caesar Cipher shifts each letter by a constant value <span class="formula-inline">k</span>. For example, with a shift of 3:</p>
            <div class="formula">A → D, B → E, C → F, ..., Z → C</div>

            <h3>📐 Mathematical Formula</h3>
            <div class="formula">Encryption: c ≡ (p + k) mod 26</div>
            <div class="formula">Decryption: p ≡ (c - k) mod 26</div>
            <p>Where <span class="formula-inline">p</span> is the plaintext letter, <span class="formula-inline">c</span> is the ciphertext letter, and <span class="formula-inline">k</span> is the shift value.</p>

            <h3>💡 Example</h3>
            <div class="example">
                <strong>Plaintext:</strong> HELLO<br>
                <strong>Shift:</strong> 3<br>
                <strong>Ciphertext:</strong> KHOOR<br><br>
                H→K, E→H, L→O, L→O, O→R
            </div>

            <h3>⚠️ Security</h3>
            <p>The Caesar Cipher is <strong>NOT secure</strong> for real-world use. It has only 25 possible shifts, making it trivial to break through brute force. However, it's an excellent introduction to cryptography and the concept of substitution ciphers.</p>

            <h3>📚 Key Properties</h3>
            <ul>
                <li><strong>Key Space:</strong> 25 possible keys (shifts 1-25)</li>
                <li><strong>Plaintext:</strong> Any text (letters preserved)</li>
                <li><strong>Ciphertext:</strong> Same length as plaintext</li>
                <li><strong>Reversible:</strong> Yes, using negative shift</li>
            </ul>

            <h3>🎯 Use Cases</h3>
            <p>While not suitable for protecting sensitive information, Caesar Cipher is used for:</p>
            <ul>
                <li>Educational purposes in cryptography courses</li>
                <li>Puzzle games and word games (ROT13)</li>
                <li>Understanding basic encryption principles</li>
            </ul>
        `
    },

    vigenère: {
        title: "Vigenère Cipher",
        content: `
            <h3>📖 Overview</h3>
            <p>The Vigenère Cipher is a polyalphabetic substitution cipher that extends the Caesar Cipher by using a keyword to vary the shift for each letter. This makes it significantly more secure than the Caesar Cipher.</p>

            <h3>🔧 How It Works</h3>
            <p>Instead of shifting all letters by the same amount, the Vigenère Cipher uses a repeating keyword where each letter determines the shift for the corresponding plaintext letter.</p>

            <h3>📐 Mathematical Formula</h3>
            <div class="formula">Encryption: cᵢ ≡ (pᵢ + kᵢ) mod 26</div>
            <div class="formula">Decryption: pᵢ ≡ (cᵢ - kᵢ) mod 26</div>
            <p>Where <span class="formula-inline">i</span> is the position in the text, <span class="formula-inline">p</span> is the plaintext, <span class="formula-inline">c</span> is the ciphertext, and <span class="formula-inline">k</span> is the repeated keyword.</p>

            <h3>💡 Example</h3>
            <div class="example">
                <strong>Plaintext:</strong> ATTACKATDAWN<br>
                <strong>Keyword:</strong> KEY (repeats: KEYKEYKEYKEY)<br>
                <strong>Key Values:</strong> K(10) E(4) Y(24) K(10) E(4) Y(24) K(10) E(4) Y(24) K(10) E(4) Y(24)<br>
                <strong>Ciphertext:</strong> KEYKEYKEYKEY
            </div>

            <h3>🔐 Security Improvements</h3>
            <p>The Vigenère Cipher was considered unbreakable for about 300 years until the Kasiski examination and Friedman test were developed. It's more secure than Caesar because:</p>
            <ul>
                <li>Same plaintext letter encrypts to different ciphertext letters</li>
                <li>Frequency analysis is much harder</li>
                <li>Key space depends on keyword length</li>
            </ul>

            <h3>⚠️ Vulnerabilities</h3>
            <p>The Vigenère Cipher can be broken if:</p>
            <ul>
                <li>The keyword length is discovered (Kasiski examination)</li>
                <li>Enough ciphertext is available for frequency analysis</li>
                <li>The keyword is weak or repeated pattern is found</li>
            </ul>

            <h3>📚 Key Properties</h3>
            <ul>
                <li><strong>Key:</strong> A keyword of any length</li>
                <li><strong>Key Space:</strong> Exponential in keyword length</li>
                <li><strong>Plaintext:</strong> Any text (letters preserved)</li>
                <li><strong>Ciphertext:</strong> Same length as plaintext</li>
                <li><strong>Type:</strong> Polyalphabetic substitution</li>
            </ul>

            <h3>🎯 Historical Significance</h3>
            <p>The Vigenère Cipher was invented in 1553 and remained unbroken for centuries. It represented a major advancement in cryptography and demonstrated the power of using a key to encrypt messages.</p>
        `
    },

    affine: {
        title: "Affine Cipher",
        content: `
            <h3>📖 Overview</h3>
            <p>The Affine Cipher is a substitution cipher that uses linear algebra. It combines two operations: multiplication and addition, making it more complex than the Caesar Cipher while still remaining relatively simple.</p>

            <h3>🔧 How It Works</h3>
            <p>The Affine Cipher uses two keys: <span class="formula-inline">a</span> (multiplier) and <span class="formula-inline">b</span> (additive shift). The multiplier <span class="formula-inline">a</span> must be coprime with 26 (gcd(a, 26) = 1) to ensure the cipher is reversible.</p>

            <h3>📐 Mathematical Formula</h3>
            <div class="formula">Encryption: c ≡ (a·p + b) mod 26</div>
            <div class="formula">Decryption: p ≡ a⁻¹·(c - b) mod 26</div>
            <p>Where <span class="formula-inline">a⁻¹</span> is the modular multiplicative inverse of <span class="formula-inline">a</span> modulo 26.</p>

            <h3>💡 Example</h3>
            <div class="example">
                <strong>Plaintext:</strong> AFFINE<br>
                <strong>Keys:</strong> a = 5, b = 8<br>
                <strong>Encryption Process:</strong><br>
                A(0): (5·0 + 8) mod 26 = 8 = I<br>
                F(5): (5·5 + 8) mod 26 = 33 mod 26 = 7 = H<br>
                F(5): (5·5 + 8) mod 26 = 7 = H<br>
                I(8): (5·8 + 8) mod 26 = 48 mod 26 = 22 = W<br>
                N(13): (5·13 + 8) mod 26 = 73 mod 26 = 21 = V<br>
                E(4): (5·4 + 8) mod 26 = 28 mod 26 = 2 = C<br>
                <strong>Ciphertext:</strong> IHHWVC
            </div>

            <h3>✅ Valid Multipliers (Coprime with 26)</h3>
            <p>The value of <span class="formula-inline">a</span> must satisfy gcd(a, 26) = 1. Valid values are:</p>
            <p><strong>1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25</strong></p>
            <p>This gives only 12 possible multipliers, so the total key space is 12 × 26 = 312 possible keys.</p>

            <h3>📚 Key Properties</h3>
            <ul>
                <li><strong>Keys:</strong> a (multiplier, must be coprime with 26) and b (additive shift)</li>
                <li><strong>Key Space:</strong> 12 × 26 = 312 possible keys</li>
                <li><strong>Type:</strong> Substitution cipher with linear algebra</li>
                <li><strong>Reversibility:</strong> Yes, requires modular inverse</li>
            </ul>

            <h3>⚠️ Security</h3>
            <p>The Affine Cipher is only marginally more secure than Caesar:</p>
            <ul>
                <li>Only 312 possible keys (easily brute-forced)</li>
                <li>Vulnerable to frequency analysis</li>
                <li>Can be broken with just a few pairs of plaintext-ciphertext letters</li>
            </ul>

            <h3>🎓 Educational Value</h3>
            <p>The Affine Cipher is excellent for learning about:</p>
            <ul>
                <li>Modular arithmetic and cryptography</li>
                <li>Modular multiplicative inverses</li>
                <li>Linear transformations in encryption</li>
            </ul>
        `
    },

    hill: {
        title: "Hill Cipher",
        content: `
            <h3>📖 Overview</h3>
            <p>The Hill Cipher is a block cipher that uses linear algebra and matrix multiplication. It was invented by Lester Hill in 1929 and represents an important step in the history of cryptography. It's one of the first ciphers to use matrix algebra.</p>

            <h3>🔧 How It Works</h3>
            <p>The Hill Cipher encrypts blocks of text together using matrix multiplication. Unlike substitution ciphers that encrypt one letter at a time, Hill encrypts multiple letters simultaneously using matrix operations.</p>

            <h3>📐 Mathematical Formula</h3>
            <div class="formula">Encryption: C ≡ K·P (mod 26)</div>
            <div class="formula">Decryption: P ≡ K⁻¹·C (mod 26)</div>
            <p>Where <span class="formula-inline">K</span> is the key matrix, <span class="formula-inline">P</span> is the plaintext block vector, and <span class="formula-inline">C</span> is the ciphertext block vector.</p>

            <h3>💡 Example (2x2 Matrix)</h3>
            <div class="example">
                <strong>Key Matrix K:</strong><br>
                | 6  24 |<br>
                | 13 16 |<br><br>
                <strong>Plaintext:</strong> HI (H=7, I=8)<br>
                <strong>Matrix Form:</strong> | 7 | (mod 26)<br>
                                      | 8 |<br><br>
                <strong>Encryption:</strong> | 6  24 | | 7 |  = | 264 | ≡ | 4 | = E (mod 26)<br>
                                     | 13 16 | | 8 |    | 219 |   | 11 | = L
            </div>

            <h3>🔑 Key Requirements</h3>
            <p>For the Hill Cipher to work:</p>
            <ul>
                <li>The key matrix must be square (n×n)</li>
                <li>The key matrix must be invertible modulo 26</li>
                <li>The determinant must have a modular inverse mod 26</li>
                <li>gcd(det(K), 26) must equal 1</li>
            </ul>

            <h3>📚 Key Properties</h3>
            <ul>
                <li><strong>Block Size:</strong> Depends on matrix dimension (2x2, 3x3, etc.)</li>
                <li><strong>Type:</strong> Block cipher using linear algebra</li>
                <li><strong>Key Space:</strong> Large (depends on matrix size and invertibility constraints)</li>
                <li><strong>Encryption:</strong> All plaintext letters encrypted together in block</li>
            </ul>

            <h3>⚠️ Vulnerabilities</h3>
            <p>Despite its mathematical sophistication:</p>
            <ul>
                <li>Vulnerable to known-plaintext attacks</li>
                <li>Frequency distribution is altered but patterns remain</li>
                <li>Can be broken with enough plaintext-ciphertext pairs</li>
                <li>Larger blocks needed for better security</li>
            </ul>

            <h3>🎓 Historical Significance</h3>
            <p>The Hill Cipher was revolutionary because:</p>
            <ul>
                <li>First cipher to use matrix mathematics</li>
                <li>Demonstrated importance of block ciphers</li>
                <li>Influenced development of modern block ciphers</li>
                <li>Introduced concept of encryption blocks</li>
            </ul>

            <h3>💻 Modern Connection</h3>
            <p>While not used in practice today, the Hill Cipher's principles influenced modern block ciphers like:</p>
            <ul>
                <li>DES (Data Encryption Standard)</li>
                <li>AES (Advanced Encryption Standard)</li>
                <li>Matrix operations in modern cryptography</li>
            </ul>
        `
    },

    block: {
        title: "Block Cipher (Feistel)",
        content: `
            <h3>📖 Overview</h3>
            <p>The Block Cipher using the Feistel structure is a modern symmetric encryption technique. The Feistel network is a fundamental design pattern used in many modern ciphers including DES (Data Encryption Standard).</p>

            <h3>🔧 How It Works</h3>
            <p>The Feistel Cipher works by dividing the plaintext block into left and right halves, then repeatedly applying a round function that combines the key with a substitution (S-box) operation.</p>

            <h3>📐 Feistel Round Structure</h3>
            <div class="formula">Lᵢ₊₁ = Rᵢ</div>
            <div class="formula">Rᵢ₊₁ = Lᵢ ⊕ F(Rᵢ, Kᵢ)</div>
            <p>Where ⊕ is the XOR operation, F is the round function, and Kᵢ is the round key.</p>

            <h3>🔄 Multi-Round Process</h3>
            <p>The Feistel structure repeats for multiple rounds (typically 3-16 rounds). Each round:</p>
            <ol>
                <li>Takes the right half of the previous round</li>
                <li>Applies the round function with the round key</li>
                <li>XORs the result with the left half</li>
                <li>Swaps the halves for the next round</li>
            </ol>

            <h3>💡 Example (Simplified 2-Round)</h3>
            <div class="example">
                <strong>Plaintext Block:</strong> 8 bytes (64 bits in DES)<br>
                <strong>Split:</strong> Left half (4 bytes) | Right half (4 bytes)<br><br>
                <strong>Round 1:</strong><br>
                L₁ = R₀<br>
                R₁ = L₀ ⊕ F(R₀, K₁)<br><br>
                <strong>Round 2:</strong><br>
                L₂ = R₁<br>
                R₂ = L₁ ⊕ F(R₁, K₂)<br><br>
                <strong>Ciphertext:</strong> R₂ | L₂ (final swap)
            </div>

            <h3>🔑 Key Components</h3>
            <ul>
                <li><strong>Block Size:</strong> Fixed size (8 bytes for classic DES)</li>
                <li><strong>Key Size:</strong> Variable (56 bits for DES, larger for modern variants)</li>
                <li><strong>Round Function F():</strong> S-box substitution + permutation</li>
                <li><strong>Rounds:</strong> Multiple rounds for diffusion and confusion</li>
                <li><strong>S-boxes:</strong> Substitution tables for non-linearity</li>
            </ul>

            <h3>⚙️ Round Function Details</h3>
            <p>The round function F() typically consists of:</p>
            <ul>
                <li><strong>Key Mixing:</strong> XOR with round key</li>
                <li><strong>Substitution (S-box):</strong> Non-linear transformation</li>
                <li><strong>Permutation:</strong> Diffuses the bits</li>
            </ul>

            <h3>📚 Advantages of Feistel Design</h3>
            <ul>
                <li>Encryption and decryption use same structure (just reverse order)</li>
                <li>Round function doesn't need to be invertible</li>
                <li>Modular design allows flexibility in round function</li>
                <li>Each round adds diffusion and confusion</li>
            </ul>

            <h3>🔐 Security Principles</h3>
            <p>Feistel ciphers achieve security through:</p>
            <ul>
                <li><strong>Confusion:</strong> S-boxes obscure relationship between key and ciphertext</li>
                <li><strong>Diffusion:</strong> Permutations spread plaintext bits across ciphertext</li>
                <li><strong>Multiple Rounds:</strong> Layering of transformations</li>
            </ul>

            <h3>📊 Comparison</h3>
            <table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
                <tr>
                    <td style="border: 1px solid #ccc; padding: 0.5rem;"><strong>Cipher</strong></td>
                    <td style="border: 1px solid #ccc; padding: 0.5rem;"><strong>Block Size</strong></td>
                    <td style="border: 1px solid #ccc; padding: 0.5rem;"><strong>Key Size</strong></td>
                    <td style="border: 1px solid #ccc; padding: 0.5rem;"><strong>Rounds</strong></td>
                </tr>
                <tr>
                    <td style="border: 1px solid #ccc; padding: 0.5rem;">DES</td>
                    <td style="border: 1px solid #ccc; padding: 0.5rem;">64 bits</td>
                    <td style="border: 1px solid #ccc; padding: 0.5rem;">56 bits</td>
                    <td style="border: 1px solid #ccc; padding: 0.5rem;">16</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #ccc; padding: 0.5rem;">3DES</td>
                    <td style="border: 1px solid #ccc; padding: 0.5rem;">64 bits</td>
                    <td style="border: 1px solid #ccc; padding: 0.5rem;">168 bits</td>
                    <td style="border: 1px solid #ccc; padding: 0.5rem;">48</td>
                </tr>
            </table>

            <h3>🎓 Modern Usage</h3>
            <p>While DES is now obsolete due to small key size, Feistel design principles are still used in:</p>
            <ul>
                <li>Reduced versions of AES for educational purposes</li>
                <li>Blowfish cipher</li>
                <li>CAST-128 cipher</li>
                <li>Understanding symmetric encryption fundamentals</li>
            </ul>
        `
    }
};

// Open modal with cipher information
function openModal(cipher) {
    const modal = document.getElementById('learningModal');
    const title = document.getElementById('modalTitle');
    const body = document.getElementById('modalBody');

    if (cipherInfo[cipher]) {
        title.textContent = cipherInfo[cipher].title;
        body.innerHTML = cipherInfo[cipher].content;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
    }
}

// Close modal
function closeModal() {
    const modal = document.getElementById('learningModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close modal when clicking outside the modal content
window.addEventListener('click', function (event) {
    const modal = document.getElementById('learningModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Close modal on escape key
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});