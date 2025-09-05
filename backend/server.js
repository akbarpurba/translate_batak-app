const express = require("express");
const cors = require('cors');
const { latinToBatak, mapping } = require("./translate");

const app = express();
const PORT = 3050;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post("/translate", (req, res) => {
  try {
    const { variant, text } = req.body;

    // Validasi input
    if (!variant || !text) {
      return res.status(400).json({ error: "Field 'variant' dan 'text' wajib diisi" });
    }

    const lowerVariant = variant.toLowerCase();

    if (!mapping[lowerVariant]) {
      return res
        .status(400)
        .json({ error: "Varian tidak dikenal (toba, karo, simalungun)" });
    }

    const hasil = latinToBatak(text, lowerVariant);
    return res.json({ input: text, variant: lowerVariant, output: hasil });

  } catch (err) {
    console.error("Translate error:", err);
    return res.status(500).json({ error: "Terjadi kesalahan server" });
  }
});



app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res)=>{
res.render('index');
});
/*app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
*/
 
module.exports = app;