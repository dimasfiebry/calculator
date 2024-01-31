const dxy = [
    { x: "rizka", y: "45227684" },
    { x: "adam", y: "87364726" },
    { x: "yhoga", y: "12345678" },
    { x: "haha", y: "72625188" },
    { x: "hihi", y: "11627282" },
    { x: "hehe", y: "44723826" },
    { x: "arip", y: "66445522" },
    { x: "meh", y: "22551144" },
    { x: "kero", y: "66445533" },
];

function ap(y) {
    let b = y.slice(-4);
    let dp = y.slice(0, 4);
    let an = b + dp;
    let bp = parseInt(an) + 31;

    let cp = bp.toString().slice(-3);
    let ep = bp.toString().slice(0, 5);
    let fp = cp + ep;


    let gp = 0;

    if (parseInt(fp) % 2 === 0) {
        gp = parseInt(fp) / 2;
    } else {
        fp = parseInt(fp) - 1;
        gp = fp / 2;
    }
    

    let hp = gp - 24;
    let ip = hp * 2;
    let np = ip + 0;
    return np;

    // console.log(np);
}
for (let i = 0; i < dxy.length; i++) {
    let u = dxy[i];
    u.y = ap(u.y);
  }

function ceky() {
    var xi = document.getElementById('x').value;
    var yi = document.getElementById('y').value;
  
  
    var uValid = dxy.find((item) => {
        return item.x === xi && item.y.toString() === yi;
      });
    
      if (uValid) {
        return window.location.href = 'index2.html';
      } else {
        return tampilkanPesanError('Username atau kode akses tidak tersedia.');
      }
  
    
  }
function tampilkanPesanError(message) {
    var errorMessageElement = document.getElementById('error-message');
    errorMessageElement.innerText = message;
}
function tampilkanPesan(message) {
    var MessageElement = document.getElementById('message');
    MessageElement.innerText = message;
}
