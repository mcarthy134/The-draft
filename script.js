let allPlayers = [
  { name: "Jeremiah Smith", position: "WR", college: "Ohio State", rank: 1 },
  { name: "DJ Lagway", position: "QB", college: "Florida", rank: 2 },
  { name: "Ryan Williams", position: "WR", college: "Alabama", rank: 3 },
  { name: "Cam Coleman", position: "WR", college: "Auburn", rank: 4 },
  { name: "Ellis Robinson IV", position: "CB", college: "Georgia", rank: 5 },
  { name: "Dylan Raiola", position: "QB", college: "Nebraska", rank: 6 },
  { name: "Julian Sayin", position: "QB", college: "Ohio State", rank: 7 },
  { name: "Micah Hudson", position: "WR", college: "Texas Tech", rank: 8 },
  { name: "Colin Simmons", position: "DE", college: "Texas", rank: 9 },
  { name: "Dylan Stewart", position: "DE", college: "South Carolina", rank: 10 },
  { name: "L.J. McCray", position: "DT", college: "Florida", rank: 11 },
  { name: "Justin Scott", position: "DT", college: "Miami (FL)", rank: 12 },
  { name: "Jaylen Mbakwe", position: "ATH", college: "Alabama", rank: 13 },
  { name: "KJ Bolden", position: "S", college: "Georgia", rank: 14 },
  { name: "Jordan Ross", position: "DE", college: "Tennessee", rank: 15 },
  { name: "Williams Nwaneri", position: "DE", college: "Missouri", rank: 16 },
  { name: "Terry Bussey", position: "ATH", college: "Texas A&M", rank: 17 },
  { name: "Marquise Lightfoot", position: "DE", college: "Miami (FL)", rank: 18 },
  { name: "David Stone", position: "DT", college: "Oklahoma", rank: 19 },
  { name: "Justin Williams", position: "LB", college: "Georgia", rank: 20 },
  { name: "Kobe Black", position: "CB", college: "Texas", rank: 21 },
  { name: "Josiah Thompson", position: "OT", college: "South Carolina", rank: 22 },
  { name: "Guerby Lambert", position: "OT", college: "Notre Dame", rank: 23 },
  { name: "Eddrick Houston", position: "DE", college: "Ohio State", rank: 24 },
  { name: "Chris Cole", position: "LB", college: "Georgia", rank: 25 },
  { name: "Kamarion Franklin", position: "DE", college: "Ole Miss", rank: 26 },
  { name: "Zavier Mincey", position: "CB", college: "Alabama", rank: 27 },
  { name: "Kyngstonn Viliamu-Asa", position: "LB", college: "Notre Dame", rank: 28 },
  { name: "Sammy Brown", position: "LB", college: "Clemson", rank: 29 },
  { name: "Jordan Seaton", position: "OT", college: "Colorado", rank: 30 },
  { name: "TJ Moore", position: "WR", college: "Clemson", rank: 31 },
  { name: "Bryant Wesco", position: "WR", college: "Clemson", rank: 32 },
  { name: "Caleb Downs", position: "S", college: "Ohio State", rank: 33 },
  { name: "Kelvin Banks Jr.", position: "OT", college: "Texas", rank: 34 },
  { name: "Tyler Booker", position: "OG", college: "Alabama", rank: 35 },
  { name: "Will Campbell", position: "OT", college: "LSU", rank: 36 },
  { name: "Seth McLaughlin", position: "C", college: "Ohio State", rank: 37 },
  { name: "Donovan Jackson", position: "OG", college: "Ohio State", rank: 38 },
  { name: "Wyatt Milum", position: "OT", college: "West Virginia", rank: 39 },
  { name: "Addison West", position: "OT", college: "Western Michigan", rank: 40 },
  { name: "Willie Lampkin", position: "OG", college: "North Carolina", rank: 41 },
  { name: "Tyler Warren", position: "TE", college: "Penn State", rank: 42 },
  { name: "Harold Fannin Jr.", position: "TE", college: "Bowling Green", rank: 43 },
  { name: "Nick Nash", position: "WR", college: "San Jose State", rank: 44 },
  { name: "Tetairoa McMillan", position: "WR", college: "Arizona", rank: 45 },
  { name: "Xavier Restrepo", position: "WR", college: "Miami (FL)", rank: 46 },
  { name: "Cam Skattebo", position: "RB", college: "Arizona State", rank: 47 },
  { name: "Kaleb Johnson", position: "RB", college: "Iowa", rank: 48 },
  { name: "Omarion Hampton", position: "RB", college: "North Carolina", rank: 49 },
  { name: "Ashton Jeanty", position: "RB", college: "Boise State", rank: 50 }
];

const userTeam = prompt("Select your NFL team:");
let draftOrder = Array.from({ length: 32 }, (_, i) => i);
let userTeamIndex = Math.floor(Math.random() * 32); // Random team slot
draftOrder[userTeamIndex] = userTeam;

const rounds = 3;
let userPicks = [];
let availablePlayers = [...allPlayers];

function simulatePick() {
  // Simulate best available (lowest rank)
  availablePlayers.sort((a, b) => a.rank - b.rank);
  return availablePlayers.shift();
}

function userDraft(pickNumber) {
  const playerList = availablePlayers
    .map(p => `${p.name} - ${p.position}, ${p.college} (Rank ${p.rank})`)
    .join("\n");
  let choice;
  do {
    choice = prompt(`Pick ${pickNumber + 1} - Choose your player:\n\n${playerList}`);
    var selected = availablePlayers.find(p => p.name.toLowerCase() === choice?.toLowerCase());
  } while (!selected);
  availablePlayers = availablePlayers.filter(p => p !== selected);
  userPicks.push(selected);
  alert(`You picked: ${selected.name}`);
}

function runDraft() {
  for (let round = 0; round < rounds; round++) {
    for (let pick = 0; pick < 32; pick++) {
      const pickNumber = round * 32 + pick;
      if (draftOrder[pick] === userTeam) {
        userDraft(pickNumber);
      } else {
        simulatePick();
      }
    }
  }

  // Grade the draft
  const avgRank = userPicks.reduce((sum, p) => sum + p.rank, 0) / userPicks.length;
  let grade;
  if (avgRank <= 10) grade = "A+";
  else if (avgRank <= 20) grade = "A";
  else if (avgRank <= 30) grade = "B";
  else if (avgRank <= 40) grade = "C";
  else grade = "D";

  alert(`Your Draft Picks for ${userTeam}:\n\n${userPicks
    .map(p => `${p.name} (${p.position}, ${p.college}) - Rank ${p.rank}`)
    .join("\n")}\n\nFinal Grade: ${grade}`);
}

runDraft();
