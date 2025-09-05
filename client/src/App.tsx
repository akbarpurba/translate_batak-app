import { useState, useEffect } from "react";

export default function App() {
  const [variant, setVariant] = useState("toba");
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const url = "https://backend-seven-ashy-40.vercel.app/translate";

  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variant, text }),
      });
      const data = await res.json();
      if (data.error) setOutput("❌ " + data.error);
      else setOutput(data.output);
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

  if (pageLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-2 border-gray-200"></div>
            <div className="w-12 h-12 rounded-full border-2 border-gray-800 border-t-transparent animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="mt-4 text-gray-500 text-sm">Bentar...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <header className="bg-white border-b border-gray-100 py-5 px-6 fixed top-0 left-0 right-0 z-10 shadow-sm">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center overflow-hidden border border-gray-200">
              <img
                src="./logo.png"
                className="w-7 h-7 object-contain"
                alt="AkbarDev Logo"
              />
            </div>
            <h1 className="text-xl font-semibold text-gray-800">AkbarDev</h1>
          </div>
          <div className="hidden sm:flex items-center space-x-2 bg-gray-50 px-3 py-1.5 rounded-full">
            <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-500">
              Transliterasi Aksara Batak
            </span>
          </div>
        </div>
      </header>

      <div className="min-h-screen flex items-center justify-center bg-white p-4 pt-28">
        <div className="bg-white border border-gray-100 rounded-2xl p-7 w-full max-w-md shadow-lg">
          <div className="text-center mb-7">
            <img
              src="./motif-batak.png"
              className="w-full h-full object-contain"
              alt="Motif Batak"
            />

            <h1 className="text-2xl font-semibold text-gray-800 mb-1.5">
              Transliterasi Aksara Batak
            </h1>
            <p className="text-gray-500 text-sm">
              Ubah teks Latin ke Aksara Batak
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="variant"
                className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider"
              >
                Pilih Varian Aksara
              </label>
              <select
                id="variant"
                value={variant}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setVariant(e.target.value)
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent text-sm appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNCA2TDggMTBMMTIgNiIgc3Ryb2tlPSIjNkI3MjgwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==')] bg-no-repeat bg-[center_right_1rem]"
              >
                <option value="toba">Toba</option>
                <option value="karo">Karo</option>
                <option value="simalungun">Simalungun</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="text"
                className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider"
              >
                Masukkan Teks Latin
              </label>
              <textarea
                id="text"
                placeholder="Ketik teks dalam huruf Latin..."
                value={text}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setText(e.target.value)
                }
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent resize-none text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !text.trim()}
              className={`w-full py-3.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
                loading || !text.trim()
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-800 hover:bg-gray-900 text-white shadow-sm hover:shadow-md"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="mr-2">
                    <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                  </div>
                  Menerjemahkan...
                </span>
              ) : (
                "Terjemahkan"
              )}
            </button>
          </form>

          <div className="mt-7 p-5 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-medium text-gray-700 text-sm uppercase tracking-wider">
                Hasil Transliterasi:
              </h2>
              {output && (
                <button
                  onClick={copyToClipboard}
                  className="flex items-center text-xs text-gray-500 hover:text-gray-700 transition-colors duration-150 px-2 py-1.5 rounded-md bg-white border border-gray-200 shadow-sm"
                >
                  {copied ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 mr-1 text-green-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Tersalin!
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                      </svg>
                      Salin
                    </>
                  )}
                </button>
              )}
            </div>
            <div className="min-h-[4.5rem] p-4 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
              {output ? (
                <p className="batak-output text-lg text-gray-800 text-center">
                  {output}
                </p>
              ) : (
                <p className="text-gray-400 text-sm">
                  Hasil akan muncul di sini
                </p>
              )}
            </div>
          </div>

          <div className="mt-7 text-center">
            <p className="text-xs text-gray-400">
              Dibuat dengan ❤️ oleh Akbar. Horas, Mejuah-juah!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
