const fs = require("fs");
const path = require("path");

// Pastikan path ke data.json selalu benar
const dataPath = path.join(__dirname, "data.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

const mapping = {
  toba: data.toba,
  karo: data.karo,
  simalungun: data.simalungun,
};
const tompi = data.tompi;

// Fungsi utama transliterasi
function latinToBatak(text, variant) {
  text = text.toLowerCase();
  let hasil = "";
  let i = 0;

  while (i < text.length) {
    if (text.substring(i, i + 2) === "ng" && mapping[variant]["ng"]) {
      hasil += mapping[variant]["ng"];
      i += 2;
      continue;
    }

    const ch = text[i];

    if (ch === "a") {
      hasil += mapping[variant]["a"];
    } else if (tompi[ch]) {
      hasil += mapping[variant]["a"] + tompi[ch];
    } else if (mapping[variant][ch]) {
      if (i + 1 < text.length && tompi[text[i + 1]]) {
        hasil += mapping[variant][ch] + tompi[text[i + 1]];
        i++;
      } else {
        hasil += mapping[variant][ch] + "᯲"; // pangolat
      }
    } else {
      hasil += ch;
    }

    i++;
  }

  return hasil;
}

module.exports = { latinToBatak, mapping, tompi };
