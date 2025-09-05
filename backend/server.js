const express = require("express");
const cors = require("cors");
const { latinToBatak, mapping } = require("./translate");

const app = express();

app.use(cors());
app.use(express.json());

// Route tes
app.get("/", (req, res) => {
  res.json({ message: "Translate API is running 🚀" });
});

app.post("/translate", (req, res) => {
  try {
    const { variant, text } = req.body;

    if (!variant || !text) {
      return res.status(400).json({ success: false, error: "Field 'variant' dan 'text' wajib diisi" });
    }

    const lowerVariant = variant.toLowerCase();

    if (!mapping[lowerVariant]) {
      return res
        .status(400)
        .json({ success: false, error: "Varian tidak dikenal (toba, karo, simalungun)" });
    }

    const hasil = latinToBatak(text, lowerVariant);
    return res.json({ success: true, input: text, variant: lowerVariant, output: hasil });

  } catch (err) {
    console.error("Translate error:", err);
    return res.status(500).json({ success: false, error: "Terjadi kesalahan server" });
  }
});

module.exports = app;
