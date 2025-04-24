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
    <main className="flex flex-col h-full bg-black text-white">
      <header className="flex items-center justify-center py-4 border-b border-neutral-800">
        <h1 className="text-xl font-semibold tracking-wide">PanteraChat</h1>
      </header>

      <section className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg, i) => (
          <Message msg={msg} key={i} />
        ))}
        <div ref={bottomRef} />
      </section>

      <footer className="p-4 border-t border-neutral-800">
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Digite sua mensagem…"
            className="flex-1 bg-neutral-900 rounded-xl px-4 py-3 outline-none"
          />
          <button
            onClick={handleSend}
            className="p-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 transition"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Send />}
          </button>
        </div>
      </footer>
    </main>
  );
}
