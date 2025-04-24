import axios from "axios";

const together = axios.create({
  baseURL: "https://api.together.xyz",
  headers: {
    Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
    "Content-Type": "application/json",
  },
});

export async function askPantera(userText) {
  try {
    const { data } = await together.post("/v1/chat/completions", {
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages: [
        {
          role: "system",
          content:
            "Você é a Pantera, chatbot oficial da FURIA. Responda em português do Brasil, tom empolgado.",
        },
        { role: "user", content: userText },
      ],
      temperature: 0.7,
      max_tokens: 1024,
    });

    return data.choices[0].message.content.trim();
  } catch (err) {
    console.error("Together error:", err.response?.data || err.message);
    return "😿 Não consegui responder agora. Tente mais tarde!";
  }
}
