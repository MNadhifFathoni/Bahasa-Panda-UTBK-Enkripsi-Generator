// Menunggu seluruh halaman HTML dimuat sebelum menjalankan script
document.addEventListener('DOMContentLoaded', () => {

    // 1. Mengambil semua elemen HTML yang kita butuhkan
    const refLetterInput = document.getElementById('refLetterInput');
    const targetNumberInput = document.getElementById('targetNumberInput');
    const inputTextarea = document.getElementById('inputText');
    const outputTextarea = document.getElementById('outputText');
    const encryptBtn = document.getElementById('encryptBtn');
    const decryptBtn = document.getElementById('decryptBtn');
    
    // 2. Menambahkan 'event listener' ke tombol
    // Saat tombol enkripsi diklik, jalankan fungsi processText dengan mode 'encrypt'
    encryptBtn.addEventListener('click', () => processText('encrypt'));
    
    // Saat tombol dekripsi diklik, jalankan fungsi processText dengan mode 'decrypt'
    decryptBtn.addEventListener('click', () => processText('decrypt'));

    /**
     * Fungsi inti untuk memproses enkripsi atau dekripsi teks.
     * @param {'encrypt' | 'decrypt'} mode - Menentukan operasi yang akan dilakukan.
     */
    function processText(mode) {
        // --- Mendapatkan Nilai Input dari Pengguna ---
        const refLetter = refLetterInput.value.toUpperCase();
        const targetNumber = parseInt(targetNumberInput.value, 10);
        const inputText = inputTextarea.value;
        
        // --- Validasi Input ---
        // Cek apakah huruf referensi valid (satu karakter A-Z)
        if (!/^[A-Z]$/.test(refLetter)) {
            alert("Harap masukkan satu huruf referensi yang valid (A-Z).");
            return; // Hentikan fungsi jika tidak valid
        }

        // --- Menghitung Nilai Pergeseran (Shift) ---
        // charCodeAt(0) mendapatkan nilai ASCII. 'A' adalah 65, 'B' adalah 66, dst.
        const originalNumber = refLetter.charCodeAt(0) - 'A'.charCodeAt(0) + 1;
        const shift = targetNumber - originalNumber;

        let resultText = "";

        // --- Melakukan Iterasi pada Setiap Karakter di Input Teks ---
        for (const char of inputText) {
            const charCode = char.charCodeAt(0);
            
            // Cek apakah karakter adalah huruf besar (A-Z)
            if (char >= 'A' && char <= 'Z') {
                const originalPos = charCode - 'A'.charCodeAt(0);
                let newPos;
                
                if (mode === 'encrypt') {
                    newPos = (originalPos + shift) % 26;
                } else { // decrypt
                    newPos = (originalPos - shift) % 26;
                }
                
                // Menangani hasil modulo negatif di JavaScript
                if (newPos < 0) {
                    newPos += 26;
                }
                
                resultText += String.fromCharCode('A'.charCodeAt(0) + newPos);

            // Cek apakah karakter adalah huruf kecil (a-z)
            } else if (char >= 'a' && char <= 'z') {
                const originalPos = charCode - 'a'.charCodeAt(0);
                let newPos;
                
                if (mode === 'encrypt') {
                    newPos = (originalPos + shift) % 26;
                } else { // decrypt
                    newPos = (originalPos - shift) % 26;
                }

                if (newPos < 0) {
                    newPos += 26;
                }

                resultText += String.fromCharCode('a'.charCodeAt(0) + newPos);
            
            } else {
                // Jika bukan huruf (spasi, angka, simbol), biarkan apa adanya
                resultText += char;
            }
        }
        
        // --- Menampilkan Hasil di Area Output ---
        outputTextarea.value = resultText;
    }
});