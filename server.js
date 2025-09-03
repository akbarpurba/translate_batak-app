const express = require("express");
const { latinToBatak, mapping } = require("./translate");

const app = express();
const PORT = 3000;

app.get("/translate", (req, res) => {
  const variant = req.query.variant?.toLowerCase();
  const text = req.query.text;

  if (!variant || !text) {
    return res.status(400).json({ error: "Gunakan ?variant=toba&text=akbar" });
  }

  if (!mapping[variant]) {
    return res.status(400).json({ error: "Varian tidak dikenal (toba, karo, simalungun)" });
  }

  const hasil = latinToBatak(text, variant);
  res.json({ input: text, variant, output: hasil });
});

app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});