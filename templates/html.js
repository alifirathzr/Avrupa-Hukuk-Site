const index = require('./html_index');
const hakkimda = require('./html_hakkimda');
const uzmanlik = require('./html_uzmanlik');
const makaleler = require('./html_makaleler');
const detay = require('./html_detay');
const iletisim = require('./html_iletisim');
const kvkk = require('./html_kvkk');

module.exports = {
    'index.html': index,
    'hakkimda.html': hakkimda,
    'uzmanlik-alanlari.html': uzmanlik,
    'makaleler.html': makaleler,
    'makale-detay.html': detay,
    'iletisim.html': iletisim,
    'kvkk.html': kvkk
};
