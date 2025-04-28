import { useState, useEffect, useRef } from "react";
import { Send, Loader2 } from "lucide-react";
import Message from "./message.jsx";
import "./index.css";

export default function App() {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text:
        "Fala, furioso! Eu sou a **Pantera**, seu chatbot oficial da FURIA. " +
        "Pergunte algo ou use `/proximo`, `/stats <nick>` 😉",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendToBackend(userText) {
    setLoading(true);
    try {
      const res = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });
      const data = await res.json();
      return data.reply;
    } catch (e) {
      console.error(e);
      return "Desculpe, não consegui me conectar 😓";
    } finally {
      setLoading(false);
    }
  }

  async function handleSend() {
    if (!input.trim()) return;
    const userText = input.trim();
    setMessages((m) => [...m, { from: "user", text: userText }]);
    setInput("");
    const reply = await sendToBackend(userText);
    setMessages((m) => [...m, { from: "bot", text: reply }]);
  }

  return (
    <main className="flex flex-col h-full bg-gray-900 text-white">
      <header className="flex items-center justify-center py-4 border-b border-neutral-800 bg-neutral-800 shadow-lg">
        <h1 className="text-xl font-bold tracking-wide text-gray-100">PanteraChat</h1>
      </header>

      <section className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        <div className="max-w-3xl mx-auto w-full space-y-6">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === "bot" ? "justify-start" : "justify-end"}`}>
              <Message msg={msg} />
            </div>
          ))}
        </div>
        <div ref={bottomRef} />
      </section>

      <footer className="p-4 border-t border-neutral-800 bg-neutral-800 shadow-lg">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 bg-neutral-700 rounded-xl p-1 shadow-lg">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Digite sua mensagem…"
              className="flex-1 bg-transparent rounded-xl px-4 py-3 outline-none text-gray-100 placeholder:text-neutral-500 focus:ring-2 focus:ring-primary transition-all"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="p-3 rounded-xl bg-primary hover:bg-primary-hover transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Send />}
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
}
