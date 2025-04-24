import { HLTV } from "hltv";

export async function getNextMatchPlain() {
  const matches = await HLTV.getMatches();
  const furia = matches.find(
    (m) => m.team1.name === "FURIA" || m.team2.name === "FURIA"
  );
  if (!furia) return "Sem partidas marcadas no momento.";
  const date = new Date(furia.date);
  const opponent =
    furia.team1.name === "FURIA" ? furia.team2.name : furia.team1.name;
  return `Próximo jogo: ${date.toLocaleDateString("pt-BR")} – ${
    furia.event.name
  } vs. ${opponent} às ${date.toLocaleTimeString("pt-BR")} (BRT).`;
}

export async function getPlayerStatsPlain(nick) {
  try {
    const player = await HLTV.getPlayerByName({ name: nick });
    return `${player.name} • K/D ${player.stats.kdRatio} • Rating ${
      player.stats.rating
    } nos últimos 3 meses.`;
  } catch {
    return "Jogador não encontrado.";
  }
}
