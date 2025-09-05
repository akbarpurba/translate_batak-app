import { useState } from "react";


export default function App() {
  const [variant, setVariant] = useState("toba");
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3050/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variant, text }),
      });
      const data = await res.json();
      if (data.error) {
        setOutput("❌ " + data.error);
      } else {
        setOutput(data.output);
      }
    } catch {
      setOutput("⚠️ Gagal menghubungi server!");
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>

      
      <div className="min-h-screen flex items-center justify-center bg-white p-4">
        <div className="bg-white border border-gray-200 rounded-xl p-6 w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-xl text-gray-700">🔤</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-800">Transliterasi Aksara Batak</h1>
            <p className="text-gray-500 text-sm mt-1">Ubah teks Latin ke Aksara Batak</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Variant Selector */}
            <div>
              <label htmlFor="variant" className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">
                Pilih Varian Aksara
              </label>
              <select
                id="variant"
                value={variant}
                onChange={(e) => setVariant(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
              >
                <option value="toba">Toba</option>
                <option value="karo">Karo</option>
                <option value="simalungun">Simalungun</option>
              </select>
            </div>

            {/* Text Input */}
            <div>
              <label htmlFor="text" className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">
                Masukkan Teks Latin
              </label>
              <textarea
                id="text"
                placeholder="Ketik teks dalam huruf Latin..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 resize-none text-sm"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !text.trim()}
              className={`w-full py-2 px-4 rounded-md font-medium text-sm transition-colors duration-150 ${
                loading || !text.trim()
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-gray-800 hover:bg-gray-900 text-white"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Menerjemahkan...
                </span>
              ) : (
                "Terjemahkan"
              )}
            </button>
          </form>

          {/* Output Section */}
          <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-medium text-gray-700 text-sm uppercase tracking-wide">Hasil Transliterasi:</h2>
              {output && (
                <button
                  onClick={copyToClipboard}
                  className="flex items-center text-xs text-gray-600 hover:text-gray-800 transition-colors duration-150"
                >
                  {copied ? (
                    <>
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Tersalin!
                    </>
                  ) : (
                    <>
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                      </svg>
                      Salin
                    </>
                  )}
                </button>
              )}
            </div>
            <div className="min-h-[3.5rem] p-3 bg-white rounded border border-gray-300 flex items-center">
              {output ? (
                <p className="batak-output">{output}</p>
              ) : (
                <p className="text-gray-400 text-sm">Hasil akan muncul di sini</p>
              )
              }
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-xs text-gray-400">
            <p>Dukung pelestarian aksara daerah Nusantara</p>
          </div>
        </div>
      </div>
    </>
  );
}