var dataBahan = {
    'Beras giling, mentah': {
        'Protein': 8.4,
        'Karbohidrat': 77.1,
        'Lemak': 1.7,
        'BDD': 12.0,
        // Tambahkan zat gizi lain jika diperlukan
    },
    'Beras giling var pelita, mentah': {
        'Protein': 9.5,
        'Karbohidrat': 77.1,
        'Lemak': 1.4,
        'BDD': 11.4,
        // Tambahkan zat gizi lain jika diperlukan
    },
    'Beras giling var rojolele, mentah': {
        'Protein': 8.4,
        'Karbohidrat': 77.1,
        'Lemak': 1.7,
        'BDD': 12.0,
        // Tambahkan zat gizi lain jika diperlukan
    },
    // Tambahkan data bahan lain sesuai kebutuhan
};

function hitungZatGizi() {
    // Ambil nilai dari input
    var namaBahan = document.getElementById('namaBahan').value;
    var namaZat = document.getElementById('namaZat').value;
    var beratBahan = parseFloat(document.getElementById('beratBahan').value);

    // Cek apakah bahan dan zat gizi ada dalam database
    if (dataBahan[namaBahan] && dataBahan[namaBahan][namaZat] !== undefined) {
        // Hitung zat gizi
        var zatGiziPer100g = dataBahan[namaBahan][namaZat];
        var hasil = (beratBahan / 100) * zatGiziPer100g;

        // Tampilkan hasil
        document.getElementById('hasil').innerText = hasil.toFixed(2) + " gram " + namaZat;
    } else {
        alert("Bahan atau zat gizi tidak ditemukan dalam database.");
    }
}