var dataBahan = {
    'Beras giling, mentah': {
        'BDD': 12.0,
        'Air': 12.0,
        'Energi': 357,
        'Protein': 8.4,
        'Lemak': 1.7,
        'Karbohidrat': 77.1,
        'Serat': 0.2,
        'Abu': 0.8,
        'Kalsium': 147,
        'Fosfor': 81,
        'Besi': 1.8,
        'Natrium': 27,
        'Kalium': 71.0,
        'Tembaga': 0.10,
        'Seng': 0.5,
        'Retinol': 0,
        'B-Karoten': 0.20,
        'Karoten Total': 0.08,
        'Thiamin': 2.6,
        'Riboflavin': 0,
        'Niasin': 100
    },
    'Beras giling var pelita, mentah': {
        'BDD': 11.4,
        'Air': 11.4,
        'Energi': 369,
        'Protein': 9.5,
        'Lemak': 1.4,
        'Karbohidrat': 77.1,
        'Serat': 0.4,
        'Abu': 0.6,
        'Kalsium': 68,
        'Fosfor': 171,
        'Besi': 1.4,
        'Natrium': 34,
        'Kalium': 0,
        'Tembaga': 0,
        'Seng': 0,
        'Retinol': 0,
        'B-Karoten': 0,
        'Karoten Total': 0,
        'Thiamin': 0.26,
        'Riboflavin': 0,
        'Niasin': 0
    }
};

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


// var dataBahan = {
//     'Beras giling, mentah': {
//         'BDD': 12.0,
//         'Air': 12.0,
//         'Energi': 357,
//         'Protein': 8.4,
//         'Lemak': 1.7,
//         'Karbohidrat': 77.1,
//         'Serat': 0.2,
//         'Abu': 0.8,
//         'Kalsium': 147,
//         'Fosfor': 81,
//         'Besi': 1.8,
//         'Natrium': 27,
//         'Kalium': 71.0,
//         'Tembaga': 0.10,
//         'Seng': 0.5,
//         'Retinol': 0,
//         'B-Karoten': 0.20,
//         'Karoten Total': 0.08,
//         'Thiamin': 2.6,
//         'Riboflavin': 0,
//         'Niasin': 100
//     },
//     'Beras giling var pelita, mentah': {
//         'BDD': 11.4,
//         'Air': 11.4,
//         'Energi': 369,
//         'Protein': 9.5,
//         'Lemak': 1.4,
//         'Karbohidrat': 77.1,
//         'Serat': 0.4,
//         'Abu': 0.6,
//         'Kalsium': 68,
//         'Fosfor': 171,
//         'Besi': 1.4,
//         'Natrium': 34,
//         'Kalium': 0,
//         'Tembaga': 0,
//         'Seng': 0,
//         'Retinol': 0,
//         'B-Karoten': 0,
//         'Karoten Total': 0,
//         'Thiamin': 0.26,
//         'Riboflavin': 0,
//         'Niasin': 0
//     },
//     // Tambahkan data bahan lain sesuai kebutuhan
// };

// // Pastikan Anda melengkapi data bahan lainnya sesuai tabel yang diberikan.


// function hitungZatGizi() {
//     // Ambil nilai dari input
//     var namaBahan = document.getElementById('namaBahan').value;
//     var namaZat = document.getElementById('namaZat').value;
//     var beratBahan = parseFloat(document.getElementById('beratBahan').value);

//     // Cek apakah bahan dan zat gizi ada dalam database
//     if (dataBahan[namaBahan] && dataBahan[namaBahan][namaZat] !== undefined) {
//         // Hitung zat gizi
//         var zatGiziPer100g = dataBahan[namaBahan][namaZat];
//         var hasil = (beratBahan / 100) * zatGiziPer100g;

//         // Tampilkan hasil
//         document.getElementById('hasil').innerText = hasil.toFixed(2) + " gram " + namaZat;
//     } else {
//         alert("Bahan atau zat gizi tidak ditemukan dalam database.");
//     }
// }