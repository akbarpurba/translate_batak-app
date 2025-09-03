const { latinToBatak, mapping } = require("./translate");

const args = process.argv.slice(2);

let variant, text;
args.forEach(arg => {
  const [key, value] = arg.split("=");
  if (key === "batak") variant = value.toLowerCase();
  if (key === "text") text = value;
});


if (!mapping[variant]) {
  console.log("Varian tidak dikenal! Pilih: toba, karo, simalungun");
  process.exit(1);
}

console.log(`Input   : ${text}`);
console.log(`Variant : ${variant}`);
console.log(`Output  : ${latinToBatak(text, variant)}`);