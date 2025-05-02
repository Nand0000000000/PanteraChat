import { Router } from "express";
import { askPantera } from "../services/openai.js";
import { getNextMatchPlain, getPlayerStatsPlain } from "../services/hltv.js";

const router = Router();

router.post("/", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Sem mensagem" });

  // comandos
  if (message.startsWith("/")) {
    const [cmd, arg] = message.slice(1).split(" ");
    switch (cmd) {
      case "proximo":
        return res.json({ reply: await getNextMatchPlain() });
      case "stats":
        if (!arg) return res.json({ reply: "Use /stats <nick>" });
        return res.json({ reply: await getPlayerStatsPlain(arg) });
      case "time":
        return res.json({ reply: "FalleN, Kscerato, Yuurih, Molodoy e Yekindar!" });
      default:
        return res.json({ reply: "Comando não reconhecido." });
    }
  }

  // IA
  const answer = await askPantera(message);
  res.json({ reply: answer });
});

export default router;
