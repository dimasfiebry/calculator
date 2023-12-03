
const dataNamaKodeAkses = [
    { nama: "rizka", kodeAkses: "800978" },
    { nama: "adam", kodeAkses: "123456" },
    { nama: "lisa", kodeAkses: "987654" },
    { nama: "ali", kodeAkses: "111222" },
    { nama: "sara", kodeAkses: "555666" },
    { nama: "rudi", kodeAkses: "777888" },
    { nama: "nina", kodeAkses: "999000" },
    { nama: "budi", kodeAkses: "456789" },
    { nama: "dina", kodeAkses: "135790" },
    { nama: "fajar", kodeAkses: "246801" }
];


function cekKodeAkses() {
    var namaInput = document.getElementById('nama').value;
    var kodeAksesInput = document.getElementById('kodeAkses').value;

    // Cek apakah nama dan kode akses benar
    var userValid = dataNamaKodeAkses.find(function (user) {
        return user.nama === namaInput && user.kodeAkses === kodeAksesInput;
    });

    if (userValid) {
        // Jika benar, lanjut ke halaman index.html
        window.location.href = "login.html";
    } else {
        // Jika salah, tampilkan pesan error
        tampilkanPesanError("Nama atau kode akses tidak tersedia.");
    }
}

function tampilkanPesanError(message) {
    var errorMessageElement = document.getElementById('error-message');
    errorMessageElement.innerText = message;
}
