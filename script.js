const teams = [
  "Cardinals", "Commanders", "Patriots", "Bears",
  "Chargers", "Giants", "Titans", "Falcons",
  "Jets", "Vikings", "Broncos", "Raiders",
  "Saints", "Colts", "Seahawks", "Jaguars",
  "Bengals", "Rams", "Steelers", "Dolphins",
  "Eagles", "Texans", "Cowboys", "Packers",
  "Buccaneers", "Bills", "Lions", "Ravens",
  "49ers", "Chiefs", "Panthers", "Browns"
];

// Sample 50 freshmen (replace with real player data later)
let allPlayers = Array.from({ length: 50 }, (_, i) => ({
  name: `Player ${i + 1}`,
  rank: i + 1
}));

let userTeam = "";
let draftOrder = [];
let userPicks = [];
let currentPick = 0;

function populateTeams() {
  const dropdown = document.getElementById("teamDropdown");
  teams.forEach(team => {
    let option = document.createElement("option");
    option.value = team;
    option.innerText = team;
    dropdown.appendChild(option);
  });
}
populateTeams();

function startDraft() {
  userTeam = document.getElementById("teamDropdown").value;
  document.getElementById("team-selection").classList.add("hidden");
  document.getElementById("draft-section").classList.remove("hidden");

  for (let round = 0; round < 3; round++) {
    for (let i = 0; i < teams.length; i++) {
      draftOrder.push({
        team: teams[i],
        pick: draftOrder.length + 1,
        round: round + 1
      });
    }
  }

  startNextPick();
}

function startNextPick() {
  if (currentPick >= draftOrder.length) {
    showResults();
    return;
  }

  const pick = draftOrder[currentPick];
  const board = document.getElementById("draft-board");
  const pickDiv = document.createElement("div");

  if (pick.team === userTeam) {
    document.getElementById("player-picker").classList.remove("hidden");
    const list = document.getElementById("available-players");
    list.innerHTML = "";
    allPlayers.slice(0, 5).forEach(player => {
      const li = document.createElement("li");
      li.innerText = `${player.name} (Rank ${player.rank})`;
      li.onclick = () => {
        userPicks.push({ pick, player });
        allPlayers = allPlayers.filter(p => p !== player);
        pickDiv.innerHTML = `Round ${pick.round}, Pick ${pick.pick}: ${userTeam} selected ${player.name}`;
        board.appendChild(pickDiv);
        document.getElementById("player-picker").classList.add("hidden");
        currentPick++;
        setTimeout(startNextPick, 400);
      };
      list.appendChild(li);
    });
  } else {
    const bestPlayer = allPlayers.shift();
    pickDiv.innerHTML = `Round ${pick.round}, Pick ${pick.pick}: ${pick.team} selected ${bestPlayer.name}`;
    board.appendChild(pickDiv);
    currentPick++;
    setTimeout(startNextPick, 200);
  }
}

function showResults() {
  document.getElementById("draft-section").classList.add("hidden");
  document.getElementById("draft-results").classList.remove("hidden");

  let totalScore = 0;
  userPicks.forEach(({ player }) => {
    totalScore += (50 - player.rank + 1);
  });

  const grade = totalScore > 120 ? "A" :
                totalScore > 90 ? "B" :
                totalScore > 60 ? "C" :
                totalScore > 40 ? "D" : "F";

  document.getElementById("final-grade").innerText =
    `${userTeam} Draft Grade: ${grade}`;
}
