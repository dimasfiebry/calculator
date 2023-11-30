// Dapatkan elemen input dan datalist untuk Nama Bahan
var namaBahanInput = document.getElementById('namaBahanInput');
var namaBahanOptions = document.getElementById('namaBahanOptions');

// Tambahkan event listener untuk memantau perubahan pada input Nama Bahan
namaBahanInput.addEventListener('input', function () {
    var searchValue = this.value.toLowerCase();
    populateOptions(searchValue, dataBahan, namaBahanOptions);
});

// Dapatkan elemen input dan datalist untuk Nama Zat Gizi
var namaZatInput = document.getElementById('namaZatInput');
var namaZatOptions = document.getElementById('namaZatOptions');

// Tambahkan event listener untuk memantau perubahan pada input Nama Zat Gizi
namaZatInput.addEventListener('input', function () {
    var searchValue = this.value.toLowerCase();
    // Replace dataZatGizi with your actual data structure for Zat Gizi
    // Assuming dataZatGizi is an object with Zat Gizi names as keys
    var dataZatGizi = {
        'BDD': true,
        'Air': true,
        'Energi': true,
        'Protein': true,
        'Lemak': true,
        'Karbohidrat': true,
        'Serat': true,
        'Abu': true,
        'Kalsium': true,
        'Fosfor': true,
        'Besi': true,
        'Natrium': true,
        'Kalium': true,
        'Tembaga': true,
        'Seng': true,
        'Retinol': true,
        'B-Karoten': true,
        'Karoten Total': true,
        'Thiamin': true,
        'Riboflavin': true,
        'Niasin': true,
        'Vitamin': true,
        





        // Add more Zat Gizi as needed
    };
    populateOptions(searchValue, dataZatGizi, namaZatOptions);
});

// Fungsi untuk mengisi opsi pada datalist
function populateOptions(searchValue, data, optionsElement) {
    optionsElement.innerHTML = ''; // Hapus opsi yang ada

    // Filter data berdasarkan searchValue
    var filteredOptions = Object.keys(data)
        .filter(function (option) {
            return option.toLowerCase().includes(searchValue);
        });

    // Tambahkan opsi ke dalam datalist
    filteredOptions.forEach(function (option) {
        var optionElement = document.createElement('option');
        optionElement.value = option;
        optionsElement.appendChild(optionElement);
    });
}

function addIngredientRow(tableId) {
    var table = document.getElementById(tableId);
    var newRow = table.insertRow(table.rows.length);
    var cells = [];

    for (var i = 0; i < table.rows[0].cells.length; i++) {
        cells[i] = newRow.insertCell(i);
        var input = document.createElement("input");
        input.type = (i === 2) ? "number" : "text";
        input.name = table.rows[0].cells[i].textContent.toLowerCase().trim() + "[]";
        input.placeholder = "Masukkan " + table.rows[0].cells[i].textContent.toLowerCase().trim();
        cells[i].appendChild(input);
    }
}
function addDailyNutritionRow() {
    var table = document.getElementById('ingredient-table-all');
    var newRow = table.insertRow(table.rows.length);
    var cells = [];

    for (var i = 0; i < 2; i++) { // Hanya dua kolom untuk zat gizi harian
        cells[i] = newRow.insertCell(i);
        var input = document.createElement("input");
        input.type = (i === 1) ? "number" : "text";
        input.name = table.rows[0].cells[i].textContent.toLowerCase().trim() + "[]";
        input.placeholder = "Masukkan " + table.rows[0].cells[i].textContent.toLowerCase().trim();
        cells[i].appendChild(input);
    }
}



function calculateSingleMeal(tableId) {
    var table = document.getElementById(tableId);
    var totalZatGizi = {};

    for (var i = 1; i < table.rows.length; i++) {
        var namaBahan = table.rows[i].cells[0].getElementsByTagName("input")[0].value;
        var namaZat = table.rows[i].cells[1].getElementsByTagName("input")[0].value;
        var beratBahan = parseFloat(table.rows[i].cells[2].getElementsByTagName("input")[0].value);

        if (namaBahan && namaZat && !isNaN(beratBahan)) {
            var zatGizi = dataBahan[namaBahan] ? dataBahan[namaBahan][namaZat] || 0 : 0;
            var hasil = (beratBahan / 100) * zatGizi;

            totalZatGizi[namaZat] = totalZatGizi[namaZat] ? totalZatGizi[namaZat] + hasil : hasil;
        }
    }

    var zatGizi = Object.keys(totalZatGizi);

    for (var i = 0; i < zatGizi.length; i++) {
        alert(zatGizi[i] + ": " + totalZatGizi[zatGizi[i]].toFixed(2));
    }
}

// Fungsi untuk menangani perhitungan zat gizi harian dan menampilkan status
function calculateDailyNutritionStatus() {
    var mealTables = ["ingredient-table-breakfast", "ingredient-table-snack-morning", "ingredient-table-lunch", "ingredient-table-snack-afternoon", "ingredient-table-dinner", "ingredient-table-snack-night"];
    var totalZatGiziHarian = {};
    var totalKebutuhanGizi = {};

    // Menghitung total zat gizi harian dari formulir waktu makan
    for (var i = 0; i < mealTables.length; i++) {
        var table = document.getElementById(mealTables[i]);

        for (var j = 1; j < table.rows.length; j++) {
            var namaZat = table.rows[j].cells[1].getElementsByTagName("input")[0].value;
            var beratBahan = parseFloat(table.rows[j].cells[2].getElementsByTagName("input")[0].value);

            if (namaZat && !isNaN(beratBahan)) {
                var zatGizi = dataBahan[table.rows[j].cells[0].getElementsByTagName("input")[0].value] ? dataBahan[table.rows[j].cells[0].getElementsByTagName("input")[0].value][namaZat] || 0 : 0;
                var hasil = (beratBahan / 100) * zatGizi;

                totalZatGiziHarian[namaZat] = totalZatGiziHarian[namaZat] ? totalZatGiziHarian[namaZat] + hasil : hasil;
            }
        }
    }

    // Menghitung total kebutuhan gizi harian dari formulir zat gizi harian
    var tableAll = document.getElementById('ingredient-table-all');
    for (var k = 1; k < tableAll.rows.length; k++) {
        var namaZat = tableAll.rows[k].cells[0].getElementsByTagName("input")[0].value;
        var kebutuhanZatGizi = parseFloat(tableAll.rows[k].cells[1].getElementsByTagName("input")[0].value);

        if (namaZat && !isNaN(kebutuhanZatGizi)) {
            totalKebutuhanGizi[namaZat] = kebutuhanZatGizi;
        }
    }

// Menampilkan hasil perhitungan dan pesan status
var zatGizi = Object.keys(totalZatGiziHarian);
var selisih = {};
var persentase = {};

// Menghitung selisih dan persentase untuk setiap zat gizi
for (var l = 0; l < zatGizi.length; l++) {
    selisih[zatGizi[l]] = totalKebutuhanGizi[zatGizi[l]] - totalZatGiziHarian[zatGizi[l]];
    persentase[zatGizi[l]] = ((selisih[zatGizi[l]] / totalKebutuhanGizi[zatGizi[l]]) * 100).toFixed(2);
}

var statusMessage = "";
for (var m = 0; m < zatGizi.length; m++) {
    statusMessage += zatGizi[m] + ": " + (selisih[zatGizi[m]] > 0 ? "Kurang " + selisih[zatGizi[m]].toFixed(2) + " (-" + persentase[zatGizi[m]] + "%)" : "Lebih " + Math.abs(selisih[zatGizi[m]]).toFixed(2) + " (" + persentase[zatGizi[m]] + "%)") + "\n";
}

// Menampilkan hasil perhitungan tanpa tanda kurung kurawal
alert("Total Zat Gizi Harian:\n" + JSON.stringify(totalZatGiziHarian, null, 2).replace(/[{()}]/g, '') + "\nTotal Kebutuhan Gizi Harian yang harus dipenuhi:\n" + JSON.stringify(totalKebutuhanGizi, null, 2).replace(/[{()}]/g, '') + "\n\n" + statusMessage);
}





var dataBahan = {
    'Beras giling, mentah KZGMI-2001': {'BDD': 100, 'Air': 12.0, 'Energi': 357, 'Protein': 8.4, 'Lemak': 1.7, 'Karbohidrat': 77.1, 'Serat': 0.2, 'Abu': 0.8, 'Kalsium': 147, 'Fosfor': 81, 'Besi': 1.8, 'Natrium': 27, 'Kalium': 71.0, 'Tembaga': 0.10, 'Seng': 0.5, 'Retinol': 0.0, 'B-Karoten': 0.20, 'Karoten Total': 0.08, 'Thiamin': 2.6, 'Riboflavin': 0.0, 'Niasin': 100},
    'Beras giling var pelita, mentah KZGPI-1990': {'BDD': 100, 'Air': 11.4, 'Energi': 369, 'Protein': 9.5, 'Lemak': 1.4, 'Karbohidrat': 77.1, 'Serat': 0.4, 'Abu': 0.6, 'Kalsium': 68, 'Fosfor': 171, 'Besi': 1.4, 'Natrium': 34, 'Kalium': 0.0, 'Tembaga': 0.0, 'Seng': 0.0, 'Retinol': 0.0, 'B-Karoten': 0.0, 'Karoten Total': 0.0, 'Thiamin': 0.26, 'Riboflavin': 0.0, 'Niasin': 0.0, 'Vitamin C': 0.0, 'BDD': 100},
    'Beras giling var rojolele, mentah KZGPI-1990': {'BDD': 100, 'Air': 12.0, 'Energi': 357, 'Protein': 8.4, 'Lemak': 1.7, 'Karbohidrat': 77.1, 'Serat': 0.2, 'Abu': 0.8, 'Kalsium': 147, 'Fosfor': 81, 'Besi': 1.8, 'Natrium': 34, 'Kalium': 112.9, 'Tembaga': 0.14, 'Seng': 0.1, 'Retinol': 0.0, 'B-Karoten': 0.0, 'Karoten Total': 80.0, 'Thiamin': 0.20, 'Riboflavin': 0.02, 'Niasin': 1.5, 'Vitamin C': 0.0, 'BDD': 100},
    'Beras hitam, mentah KZGMI-2001': {'BDD': 100, 'Air': 12.9, 'Energi': 351, 'Protein': 8.0, 'Lemak': 1.3, 'Karbohidrat': 76.9, 'Serat': 20.1, 'Abu': 0.9, 'Kalsium': 6, 'Fosfor': 198, 'Besi': 0.1, 'Natrium': 15, 'Kalium': 105.0, 'Tembaga': 0.10, 'Seng': 1.6, 'Retinol': 0.0, 'B-Karoten': 0.0, 'Karoten Total': 0.21, 'Thiamin': 0.06, 'Riboflavin': 0.0, 'Niasin': 0.0, 'Vitamin C': 0.0, 'BDD': 100},
    'Beras jagung kuning, kering, mentah KZGMI-2001': {'BDD': 100, 'Air': 10.8, 'Energi': 358, 'Protein': 5.5, 'Lemak': 0.1, 'Karbohidrat': 82.7, 'Serat': 10.0, 'Abu': 0.9, 'Kalsium': 20, 'Fosfor': 90, 'Besi': 1.4, 'Natrium': 1.0, 'Kalium': 80.0, 'Tembaga': 0.10, 'Seng': 4.1, 'Retinol': 0.0, 'B-Karoten': 641, 'Karoten Total': 0.12, 'Thiamin': 0.08, 'Riboflavin': 1.0, 'Niasin': 3.0, 'Vitamin C': 100, 'BDD': 100},
    'Beras jagung putih, kering, mentah KZGMI-2001': {'BDD': 100, 'Air': 22.5, 'Energi': 307, 'Protein': 4.8, 'Lemak': 0.1, 'Karbohidrat': 71.8, 'Serat': 10.0, 'Abu': 0.8, 'Kalsium': 17, 'Fosfor': 78, 'Besi': 1.2, 'Natrium': 1.0, 'Kalium': 70.0, 'Tembaga': 0.10, 'Seng': 3.5, 'Retinol': 0.0, 'B-Karoten': 301, 'Karoten Total': 0.15, 'Thiamin': 0.07, 'Riboflavin': 0.9, 'Niasin': 0.0, 'Vitamin C': 0.0, 'BDD': 100},
    'Beras ketan hitam tumbuk, mentah KZGPI-1990': {'BDD': 100, 'Air': 13.7, 'Energi': 360, 'Protein': 8.0, 'Lemak': 2.3, 'Karbohidrat': 74.5, 'Serat': 1.0, 'Abu': 1.5, 'Kalsium': 10, 'Fosfor': 347, 'Besi': 6.2, 'Natrium': 11, 'Kalium': 288.0, 'Tembaga': 0.28, 'Seng': 2.2, 'Retinol': 0.0, 'B-Karoten': 0.0, 'Karoten Total': 0.0, 'Thiamin': 0.24, 'Riboflavin': 0.10, 'Niasin': 2.0, 'Vitamin C': 0.0, 'BDD': 100},
    'Beras ketan putih tumbuk, mentah KZGPI-1990': {'BDD': 100, 'Air': 12.9, 'Energi': 361, 'Protein': 7.4, 'Lemak': 0.8, 'Karbohidrat': 78.4, 'Serat': 0.4, 'Abu': 0.5, 'Kalsium': 13, 'Fosfor': 157, 'Besi': 3.4, 'Natrium': 3, 'Kalium': 282.0, 'Tembaga': 0.28, 'Seng': 2.2, 'Retinol': 0.0, 'B-Karoten': 0.0, 'Karoten Total': 0.0, 'Thiamin': 0.28, 'Riboflavin': 0.00, 'Niasin': 1.4, 'Vitamin C': 0.0, 'BDD': 100},
    'Beras ladang, mentah KZGMI-2001': {'BDD': 100, 'Air': 9.8, 'Energi': 376, 'Protein': 7.5, 'Lemak': 3.8, 'Karbohidrat': 78.0, 'Serat': 5.9, 'Abu': 0.9, 'Kalsium': 20, 'Fosfor': 110, 'Besi': 0.8, 'Natrium': 10, 'Kalium': 70.0, 'Tembaga': 0.10, 'Seng': 1.4, 'Retinol': 0.0, 'B-Karoten': 0.0, 'Karoten Total': 0.0, 'Thiamin': 0.20, 'Riboflavin': 0.20, 'Niasin': 5.1, 'Vitamin C': 0.0, 'BDD': 100},
    'Beras menir, mentah DABM-1964': {'BDD': 100, 'Air': 12.0, 'Energi': 362, 'Protein': 7.7, 'Lemak': 4.4, 'Karbohidrat': 73.0, 'Serat': 0.2, 'Abu': 0.2, 'Kalsium': 22, 'Fosfor': 272, 'Besi': 3.7, 'Natrium': 90, 'Kalium': 201.0, 'Tembaga': 0.10, 'Seng': 0.5, 'Retinol': 0.0, 'B-Karoten': 0.55, 'Karoten Total': 0.00, 'Thiamin': 1.9, 'Riboflavin': 0.0, 'Niasin': 100, 'Vitamin C': 0.0, 'BDD': 100},
    'Beras parboiled DABM-1964': {'BDD': 100, 'Air': 10.0, 'Energi': 353, 'Protein': 6.8, 'Lemak': 0.6, 'Karbohidrat': 80.0, 'Serat': 0.5, 'Abu': 2.5, 'Kalsium': 5, 'Fosfor': 142, 'Besi': 0.8, 'Natrium': 2, 'Kalium': 46.0, 'Tembaga': 0.28, 'Seng': 1.0, 'Retinol': 0.0, 'B-Karoten': 0.0, 'Karoten Total': 0.0, 'Thiamin': 0.22, 'Riboflavin': 0.11, 'Niasin': 3.4, 'Vitamin C': 0.0, 'BDD': 100},
    'Beras tumbuk, mentah KZGMI-2001': {'BDD': 100, 'Air': 11.5, 'Energi': 354, 'Protein': 7.8, 'Lemak': 0.4, 'Karbohidrat': 79.9, 'Serat': 3.8, 'Abu': 0.4, 'Kalsium': 3, 'Fosfor': 112, 'Besi': 0.6, 'Natrium': 5, 'Kalium': 85.0, 'Tembaga': 0.50, 'Seng': 1.5, 'Retinol': 0.0, 'B-Karoten': 0.0, 'Karoten Total': 0.0, 'Thiamin': 0.25, 'Riboflavin': 0.22, 'Niasin': 5.1, 'Vitamin C': 0.0, 'BDD': 100},
    'Beras tumbuk merah, mentah KZGPI-1990': {'BDD': 100, 'Air': 14.6, 'Energi': 352, 'Protein': 7.3, 'Lemak': 0.9, 'Karbohidrat': 76.2, 'Serat': 0.8, 'Abu': 1.0, 'Kalsium': 15, 'Fosfor': 257, 'Besi': 4.2, 'Natrium': 10, 'Kalium': 202.0, 'Tembaga': 0.36, 'Seng': 1.9, 'Retinol': 0.0, 'B-Karoten': 0.0, 'Karoten Total': 0.0, 'Thiamin': 0.34, 'Riboflavin': 0.00, 'Niasin': 3.3, 'Vitamin C': 0.0, 'BDD': 100},
    'Cantel, mentah DABM-1964': {'BDD': 100, 'Air': 11.0, 'Energi': 366, 'Protein': 11.0, 'Lemak': 3.3, 'Karbohidrat': 73.0, 'Serat': 1.2, 'Abu': 1.7, 'Kalsium': 28, 'Fosfor': 287, 'Besi': 4.4, 'Natrium': 7, 'Kalium': 249.0, 'Tembaga': 0.0, 'Seng': 0.0, 'Retinol': 0.0, 'B-Karoten': 0.0, 'Karoten Total': 0.0, 'Thiamin': 0.09, 'Riboflavin': 0.14, 'Niasin': 2.8, 'Vitamin C': 0.0, 'BDD': 100},
    'Jagung muda, kuning, mentah KZGPI-1990': {'BDD': 100, 'Air': 61.8, 'Energi': 147, 'Protein': 5.1, 'Lemak': 0.7, 'Karbohidrat': 31.5, 'Serat': 1.3, 'Abu': 0.9, 'Kalsium': 6, 'Fosfor': 122, 'Besi': 1.1, 'Natrium': 5, 'Kalium': 33.6, 'Tembaga': 0.13, 'Seng': 0.9, 'Retinol': 0.0, 'B-Karoten': 113, 'Karoten Total': 261, 'Thiamin': 0.24, 'Riboflavin': 0.10, 'Niasin': 0.8, 'Vitamin C': 9, 'BDD': 100},
    'Jagung kuning pipil, kering, mentah KZGPI-1990': {'BDD': 100, 'Air': 11.5, 'Energi': 366, 'Protein': 9.8, 'Lemak': 7.3, 'Karbohidrat': 69.1, 'Serat': 2.2, 'Abu': 2.4, 'Kalsium': 30, 'Fosfor': 538, 'Besi': 2.3, 'Natrium': 5, 'Kalium': 79.4, 'Tembaga': 0.10, 'Seng': 4.1, 'Retinol': 0.0, 'B-Karoten': 636, 'Karoten Total': 641, 'Thiamin': 0.12, 'Riboflavin': 0.12, 'Niasin': 1.8, 'Vitamin C': 3, 'BDD': 100},
    'Jagung pipil var. harapan, kering KZGPI-1990': {'BDD': 100, 'Air': 11.3, 'Energi': 367, 'Protein': 6.2, 'Lemak': 5.1, 'Karbohidrat': 76.2, 'Serat': 2.6, 'Abu': 1.2, 'Kalsium': 7, 'Fosfor': 354, 'Besi': 2.8, 'Natrium': 1, 'Kalium': 79.6, 'Tembaga': 0.10, 'Seng': 4.1, 'Retinol': 0.0, 'B-Karoten': 637, 'Karoten Total': 385, 'Thiamin': 0.19, 'Riboflavin': 0.08, 'Niasin': 1.0, 'Vitamin C': 0.0, 'BDD': 100},
    'Jagung pipil var. metro, kering KZGPI-1990': {'BDD': 100, 'Air': 10.6, 'Energi': 368, 'Protein': 5.5, 'Lemak': 4.6, 'Karbohidrat': 78.0, 'Serat': 2.9, 'Abu': 1.3, 'Kalsium': 7, 'Fosfor': 300, 'Besi': 2.4, 'Natrium': 1, 'Kalium': 80.2, 'Tembaga': 0.10, 'Seng': 4.1, 'Retinol': 0.0, 'B-Karoten': 642, 'Karoten Total': 554, 'Thiamin': 0.16, 'Riboflavin': 0.08, 'Niasin': 1.0, 'Vitamin C': 0.0, 'BDD': 100},
    'Jali, mentah DABM-1964': {'BDD': 90, 'Air': 23.0, 'Energi': 324, 'Protein': 11.0, 'Lemak': 4.0, 'Karbohidrat': 61.0, 'Serat': 3.1, 'Abu': 1.0, 'Kalsium': 213, 'Fosfor': 176, 'Besi': 11.0, 'Natrium': 24, 'Kalium': 0.0, 'Tembaga': 0.10, 'Seng': 0.4, 'Retinol': 0.0, 'B-Karoten': 0.0, 'Karoten Total': 0.0, 'Thiamin': 0.14, 'Riboflavin': 0.08, 'Niasin': 1.8, 'Vitamin C': 0.0, 'BDD': 90},
    'Jawawut, mentah DABM-1964': {'BDD': 100, 'Air': 11.9, 'Energi': 364, 'Protein': 9.7, 'Lemak': 3.5, 'Karbohidrat': 73.4, 'Serat': 8.2, 'Abu': 1.5, 'Kalsium': 28, 'Fosfor': 311, 'Besi': 5.3, 'Natrium': 7, 'Kalium': 255.1, 'Tembaga': 0.45, 'Seng': 1.5, 'Retinol': 0.0, 'B-Karoten': 33, 'Karoten Total': 0.0, 'Thiamin': 0.33, 'Riboflavin': 0.28, 'Niasin': 4.5, 'Vitamin C': 0.0, 'BDD': 100},
    'Jampang huma, mentah DABM-1964': {'BDD': 100, 'Air': 11.7, 'Energi': 350, 'Protein': 6.2, 'Lemak': 1.4, 'Karbohidrat': 78.2, 'Serat': 1.7, 'Abu': 2.5, 'Kalsium': 329, 'Fosfor': 254, 'Besi': 5.3, 'Natrium': 53, 'Kalium': 396.7, 'Tembaga': 0.70, 'Seng': 1.6, 'Retinol': 0.0, 'B-Karoten': 33, 'Karoten Total': 0.0, 'Thiamin': 0.51, 'Riboflavin': 0.30, 'Niasin': 0.7, 'Vitamin C': 0.0, 'BDD': 100},
    'Nasi KZGPI-1990': {'BDD': 100, 'Air': 56.7, 'Energi': 180, 'Protein': 3.0, 'Lemak': 0.3, 'Karbohidrat': 39.8, 'Serat': 0.2, 'Abu': 0.2, 'Kalsium': 25, 'Fosfor': 27, 'Besi': 0.4, 'Natrium': 1, 'Kalium': 38.0, 'Tembaga': 0.10, 'Seng': 0.6, 'Retinol': 0.0, 'B-Karoten': 0.0, 'Karoten Total': 0.0, 'Thiamin': 0.05, 'Riboflavin': 0.10, 'Niasin': 2.6, 'Vitamin C': 0.0, 'BDD': 100},
    'Nasi tim OKN-1992': {'BDD': 100, 'Air': 71.0, 'Energi': 120, 'Protein': 2.4, 'Lemak': 0.4, 'Karbohidrat': 26.0, 'Serat': 0.5, 'Abu': 0.2, 'Kalsium': 3, 'Fosfor': 7, 'Besi': 0.4, 'Natrium': 0, 'Kalium': 23.9, 'Tembaga': 0.10, 'Seng': 0.4, 'Retinol': 0.0, 'B-Karoten': 0.0, 'Karoten Total': 0.0, 'Thiamin': 0.10, 'Riboflavin': 0.00, 'Niasin': 1.4, 'Vitamin C': 0.0, 'BDD': 100},
    'Tapai beras KZGMI-2001': {'BDD': 100, 'Air': 75.5, 'Energi': 99, 'Protein': 1.7, 'Lemak': 0.3, 'Karbohidrat': 22.4, 'Serat': 0.0, 'Abu': 0.1, 'Kalsium': 4, 'Fosfor': 19, 'Besi': 0.0, 'Natrium': 26, 'Kalium': 2.0, 'Tembaga': 0.10, 'Seng': 0.5, 'Retinol': 0.0, 'B-Karoten': 0.0, 'Karoten Total': 0.0, 'Thiamin': 0.00, 'Riboflavin': 0.00, 'Niasin': 0.0, 'Vitamin C': 0.0, 'BDD': 100},
    'Tepung beras, mentah DABM-1964': {'BDD': 100, 'Air': 12.0, 'Energi': 353, 'Protein': 7.0, 'Lemak': 0.5, 'Karbohidrat': 80.0, 'Serat': 2.4, 'Abu': 0.5, 'Kalsium': 5, 'Fosfor': 140, 'Besi': 0.8, 'Natrium': 5, 'Kalium': 241.0, 'Tembaga': 0.10, 'Seng': 0.8, 'Retinol': 0.0, 'B-Karoten': 0.0, 'Karoten Total': 0.0, 'Thiamin': 0.12, 'Riboflavin': 0.10, 'Niasin': 1.2, 'Vitamin C': 0.0, 'BDD': 100},
    'Nasi beras merah KZGPI-1990': {'BDD': 100, 'Air': 64.0, 'Energi': 149, 'Protein': 2.8, 'Lemak': 0.4, 'Karbohidrat': 32.5, 'Serat': 0.3, 'Abu': 0.3, 'Kalsium': 6, 'Fosfor': 63, 'Besi': 0.8, 'Natrium': 5, 'Kalium': 91.4, 'Tembaga': 0.20, 'Seng': 0.9, 'Retinol': 0.0, 'B-Karoten': 0.0, 'Karoten Total': 0.0, 'Thiamin': 0.06, 'Riboflavin': 0.00, 'Niasin': 1.6, 'Vitamin C': 0.0, 'BDD': 100},
    'Bihun, mentah DABM-1964': {'BDD': 100, 'Air': 12.9, 'Energi': 348, 'Protein': 4.7, 'Lemak': 0.1, 'Karbohidrat': 82.1, 'Serat': 1.2, 'Abu': 0.2, 'Kalsium': 6, 'Fosfor': 35, 'Besi': 1.8, 'Natrium': 12, 'Kalium': 5.0, 'Tembaga': 0.08, 'Seng': 0.7, 'Retinol': 0.0, 'B-Karoten': 0.0, 'Karoten Total': 0.0, 'Thiamin': 0.00, 'Riboflavin': 0.00, 'Niasin': 0.2, 'Vitamin C': 0.0, 'BDD': 100},
    'Bihun goreng instan KZGMS-1993': {'BDD': 100, 'Air': 9.0, 'Energi': 381, 'Protein': 6.1, 'Lemak': 3.9, 'Karbohidrat': 80.3, 'Serat': 0.0, 'Abu': 0.7, 'Kalsium': 266, 'Fosfor': 151, 'Besi': 2.9, 'Natrium': 928, 'Kalium': 0.0, 'Tembaga': 0.0, 'Seng': 0.0, 'Retinol': 0.0, 'B-Karoten': 58, 'Karoten Total': 0.0, 'Thiamin': 0.0, 'Riboflavin': 0.0, 'Niasin': 400, 'Vitamin C': 0.37, 'BDD': 100},
    'Bihun Jagung, mentah BKP': {'BDD': 100, 'Air': 11.3, 'Energi': 354, 'Protein': 0.5, 'Lemak': 0.3, 'Karbohidrat': 87.4, 'Serat': 3.0, 'Abu': 0.5, 'Kalsium': 13, 'Fosfor': 111, 'Besi': 0.6, 'Natrium': 49, 'Kalium': 1.4, 'Tembaga': 0.40, 'Seng': 0.0, 'Retinol': 0.0, 'B-Karoten': 0.0, 'Karoten Total': 0.0, 'Thiamin': 0.02, 'Riboflavin': 0.02, 'Niasin': 0.3, 'Vitamin C': 0.0, 'BDD': 100},
    'Nasi jagung BKP': {'BDD': 100, 'Air': 11.0, 'Energi': 357, 'Protein': 8.8, 'Lemak': 0.5, 'Karbohidrat': 79.5, 'Serat': 6.2, 'Abu': 0.3, 'Kalsium': 5, 'Fosfor': 43, 'Besi': 0.6, 'Natrium': 2, 'Kalium': 30.4, 'Tembaga': 0.10, 'Seng': 0.3, 'Retinol': 0.0, 'B-Karoten': 0.0, 'Karoten Total': 0.0, 'Thiamin': 0.30, 'Riboflavin': 0.02, 'Niasin': 0.1, 'Vitamin C': 0.0, 'BDD': 100},
    'Jagung kuning muda, rebus KZGPI-1990': {'BDD': 100, 'Air': 53.2, 'Energi': 142, 'Protein': 5.0, 'Lemak': 0.7, 'Karbohidrat': 30.3, 'Serat': 0.8, 'Abu': 0.8, 'Kalsium': 5, 'Fosfor': 105, 'Besi': 0.8, 'Natrium': 5, 'Kalium': 24.3, 'Tembaga': 0.20, 'Seng': 0.9, 'Retinol': 0.0, 'B-Karoten': 0.0, 'Karoten Total': 0.0, 'Thiamin': 0.15, 'Riboflavin': 0.00, 'Niasin': 0.7, 'Vitamin C': 0.0, 'BDD': 100},
    'Jagung kuning, tepung DABM-1964': {'BDD': 100, 'Air': 12.0, 'Energi': 355, 'Protein': 9.2, 'Lemak': 3.9, 'Karbohidrat': 73.7, 'Serat': 7.2, 'Abu': 1.2, 'Kalsium': 10, 'Fosfor': 256, 'Besi': 2.4, 'Natrium': 11, 'Kalium': 24.4, 'Tembaga': 0.23, 'Seng': 1.7, 'Retinol': 0.0, 'B-Karoten': 0.0, 'Karoten Total': 0.0, 'Thiamin': 0.38, 'Riboflavin': 0.02, 'Niasin': 0.3, 'Vitamin C': 0.0, 'BDD': 100},
    'Jagung kuning pipil, rebus KZGPI-1990': {'BDD': 100, 'Air': 63.7, 'Energi': 154, 'Protein': 3.8, 'Lemak': 3.5, 'Karbohidrat': 28.4, 'Serat': 0.7, 'Abu': 0.6, 'Kalsium': 7, 'Fosfor': 171, 'Besi': 0.5, 'Natrium': 5, 'Kalium': 56.4, 'Tembaga': 0.10, 'Seng': 4.4, 'Retinol': 0.00, 'B-Karoten': 818, 'Karoten Total': 234, 'Thiamin': 0.08, 'Riboflavin': 0.10, 'Niasin': 1.7, 'Vitamin C': 0.00, 'BDD': 100},
    'Tepung jagung putih DABM-1964': {'BDD': 100, 'Air': 12.0, 'Energi': 355, 'Protein': 9.2, 'Lemak': 3.9, 'Karbohidrat': 73.7, 'Serat': 7.2, 'Abu': 1.2, 'Kalsium': 10, 'Fosfor': 256, 'Besi': 2.4, 'Natrium': 11, 'Kalium': 24.4, 'Tembaga': 0.23, 'Seng': 1.7, 'Retinol': 0.00, 'B-Karoten': 0.00, 'Karoten Total': 0.00, 'Thiamin': 0.38, 'Riboflavin': 0.02, 'Niasin': 0.3, 'Vitamin C': 0.00, 'BDD': 100},
    'Ketupat ketan KZGPI-1990': {'BDD': 100, 'Air': 52.0, 'Energi': 212, 'Protein': 4.0, 'Lemak': 4.6, 'Karbohidrat': 38.6, 'Serat': 0.2, 'Abu': 0.9, 'Kalsium': 8, 'Fosfor': 46, 'Besi': 1.0, 'Natrium': 0.00, 'Kalium': 0.00, 'Tembaga': 0.00, 'Seng': 0.07, 'Retinol': 0.00, 'B-Karoten': 0.00, 'Karoten Total': 0.00, 'Thiamin': 0.00, 'Riboflavin': 0.00, 'Niasin': 0.2, 'Vitamin C': 0.00, 'BDD': 100},
    'Ketan hitam matang KZGPI-1990': {'BDD': 100, 'Air': 56.9, 'Energi': 181, 'Protein': 4.0, 'Lemak': 1.2, 'Karbohidrat': 37.3, 'Serat': 0.3, 'Abu': 0.6, 'Kalsium': 9, 'Fosfor': 144, 'Besi': 1.7, 'Natrium': 9, 'Kalium': 18.4, 'Tembaga': 0.10, 'Seng': 0.7, 'Retinol': 0.00, 'B-Karoten': 0.00, 'Karoten Total': 0.00, 'Thiamin': 0.00, 'Riboflavin': 0.00, 'Niasin': 0.5, 'Vitamin C': 0.00, 'BDD': 100},
    'Tapai ketan hitam KZGPI-1990': {'BDD': 100, 'Air': 50.2, 'Energi': 166, 'Protein': 3.8, 'Lemak': 1.0, 'Karbohidrat': 34.4, 'Serat': 0.3, 'Abu': 0.6, 'Kalsium': 8, 'Fosfor': 106, 'Besi': 1.6, 'Natrium': 5, 'Kalium': 12.0, 'Tembaga': 0.00, 'Seng': 0.02, 'Retinol': 0.00, 'B-Karoten': 0.00, 'Karoten Total': 0.00, 'Thiamin': 0.00, 'Riboflavin': 0.00, 'Niasin': 0.00, 'Vitamin C': 0.00, 'BDD': 100},
    'Ketan putih matang KZGPI-1990': {'BDD': 100, 'Air': 60.7, 'Energi': 163, 'Protein': 3.0, 'Lemak': 0.4, 'Karbohidrat': 35.7, 'Serat': 0.2, 'Abu': 0.2, 'Kalsium': 4, 'Fosfor': 55, 'Besi': 0.7, 'Natrium': 8, 'Kalium': 16.8, 'Tembaga': 0.10, 'Seng': 0.7, 'Retinol': 0.00, 'B-Karoten': 0.00, 'Karoten Total': 0.00, 'Thiamin': 0.07, 'Riboflavin': 0.00, 'Niasin': 0.5, 'Vitamin C': 0.00, 'BDD': 100},
    'Tapai ketan putih KZGPI-1990': {'BDD': 100, 'Air': 58.9, 'Energi': 172, 'Protein': 3.0, 'Lemak': 0.5, 'Karbohidrat': 37.5, 'Serat': 0.6, 'Abu': 0.1, 'Kalsium': 6, 'Fosfor': 35, 'Besi': 0.5, 'Natrium': 1, 'Kalium': 0.00, 'Tembaga': 0.00, 'Seng': 0.00, 'Retinol': 0.00, 'B-Karoten': 0.00, 'Karoten Total': 0.00, 'Thiamin': 0.04, 'Riboflavin': 0.00, 'Niasin': 0.2, 'Vitamin C': 0.00, 'BDD': 100},
    'Maizena, tepung DABM-1964': {'BDD': 100, 'Air': 14.0, 'Energi': 341, 'Protein': 0.3, 'Lemak': 0.0, 'Karbohidrat': 85.0, 'Serat': 7.0, 'Abu': 0.7, 'Kalsium': 20, 'Fosfor': 30, 'Besi': 1.5, 'Natrium': 6, 'Kalium': 9.0, 'Tembaga': 0.22, 'Seng': 1.6, 'Retinol': 0.00, 'B-Karoten': 0.00, 'Karoten Total': 0.00, 'Thiamin': 0.09, 'Riboflavin': 1.3, 'Niasin': 0.00, 'Vitamin C': 0.00, 'BDD': 100},
    'Makaroni, mentah DABM-1964': {'BDD': 100, 'Air': 11.7, 'Energi': 353, 'Protein': 8.7, 'Lemak': 0.4, 'Karbohidrat': 78.7, 'Serat': 4.9, 'Abu': 2.5, 'Kalsium': 20, 'Fosfor': 80, 'Besi': 0.3, 'Natrium': 5, 'Kalium': 0.0, 'Tembaga': 0.28, 'Seng': 1.4, 'Retinol': 0.00, 'B-Karoten': 0.00, 'Karoten Total': 0.00, 'Thiamin': 0.10, 'Riboflavin': 2.2, 'Niasin': 0.00, 'Vitamin C': 0.00, 'BDD': 100},
    'Mi basah DABM-1964': {'BDD': 0, 'Air': 80.0, 'Energi': 88, 'Protein': 0.6, 'Lemak': 3.3, 'Karbohidrat': 14.0, 'Serat': 0.1, 'Abu': 2.1, 'Kalsium': 14, 'Fosfor': 13, 'Besi': 6.8, 'Natrium': 63, 'Kalium': 13.5, 'Tembaga': 0.06, 'Seng': 0.4, 'Retinol': 0.00, 'B-Karoten': 0.00, 'Karoten Total': 0.00, 'Thiamin': 0.00, 'Riboflavin': 0.00, 'Niasin': 0.0, 'Vitamin C': 0.0, 'BDD': 0},
    'Mi kering KZGPI-1990': {'BDD': 100, 'Air': 10.6, 'Energi': 339, 'Protein': 10.0, 'Lemak': 1.7, 'Karbohidrat': 6.3, 'Serat': 0.4, 'Abu': 1.4, 'Kalsium': 31, 'Fosfor': 143, 'Besi': 3.9, 'Natrium': 760, 'Kalium': 83.0, 'Tembaga': 0.29, 'Seng': 1.9, 'Retinol': 0.00, 'B-Karoten': 0.00, 'Karoten Total': 0.00, 'Thiamin': 0.08, 'Riboflavin': 2.2, 'Niasin': 0.00, 'Vitamin C': 0.00, 'BDD': 100},
    'Misoa KZGPI-1990': {'BDD': 100, 'Air': 10.0, 'Energi': 345, 'Protein': 8.5, 'Lemak': 2.2, 'Karbohidrat': 78.0, 'Serat': 0.5, 'Abu': 1.3, 'Kalsium': 52, 'Fosfor': 120, 'Besi': 8.7, 'Natrium': 3064, 'Kalium': 44.0, 'Tembaga': 0.08, 'Seng': 0.0, 'Retinol': 0.00, 'B-Karoten': 0.00, 'Karoten Total': 0.00, 'Thiamin': 0.02, 'Riboflavin': 0.2, 'Niasin': 0.00, 'Vitamin C': 0.00, 'BDD': 100},
    'Roti putih DABM-1964': {'BDD': 100, 'Air': 40.0, 'Energi': 248, 'Protein': 8.0, 'Lemak': 1.2, 'Karbohidrat': 50.0, 'Serat': 9.1, 'Abu': 0.8, 'Kalsium': 10, 'Fosfor': 95, 'Besi': 1.5, 'Natrium': 530, 'Kalium': 91.0, 'Tembaga': 0.15, 'Seng': 0.9, 'Retinol': 0.00, 'B-Karoten': 0.00, 'Karoten Total': 0.00, 'Thiamin': 0.10, 'Riboflavin': 2.4, 'Niasin': 0.00, 'Vitamin C': 0.00, 'BDD': 100},
    'Tepung terigu KZGPI-1990': {'BDD': 100, 'Air': 11.8, 'Energi': 333, 'Protein': 9.0, 'Lemak': 1.0, 'Karbohidrat': 77.2, 'Serat': 0.3, 'Abu': 1.0, 'Kalsium': 22, 'Fosfor': 150, 'Besi': 1.3, 'Natrium': 2, 'Kalium': 0.0, 'Tembaga': 0.00, 'Seng': 0.00, 'Retinol': 0.00, 'B-Karoten': 0.00, 'Karoten Total': 0.00, 'Thiamin': 0.10, 'Riboflavin': 0.07, 'Niasin': 1.0, 'Vitamin C': 0.00, 'BDD': 100},
    'Amparan tatak KZGMI-2001': {'BDD': 100, 'Air': 58.4, 'Energi': 191, 'Protein': 1.3, 'Lemak': 5.5, 'Karbohidrat': 34.0, 'Serat': 0.00, 'Abu': 0.8, 'Kalsium': 0.00, 'Fosfor': 0.00, 'Besi': 0.00, 'Natrium': 0.00, 'Kalium': 0.00, 'Tembaga': 0.00, 'Seng': 0.00, 'Retinol': 0.00, 'B-Karoten': 0.00, 'Karoten Total': 0.00, 'Thiamin': 0.00, 'Riboflavin': 0.00, 'Niasin': 0.00, 'Vitamin C': 0.00, 'BDD': 100},
        
};