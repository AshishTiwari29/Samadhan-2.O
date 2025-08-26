const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function gradeFromPercent(p) {
  if (p >= 90) return "A+";
  if (p >= 80) return "A";
  if (p >= 70) return "B";
  if (p >= 60) return "C";
  if (p >= 50) return "D";
  return "F";
}

async function ask(question) {
  return new Promise(resolve => rl.question(question, ans => resolve(ans)));
}

async function main() {
  const name = await ask("Enter Student Name: ");
  const subCount = parseInt(await ask("How many subjects? "), 10);

  const subjects = [];
  const marks = [];

  for (let i = 0; i < subCount; i++) {
    const subName = await ask(`Subject ${i + 1} name: `);
    let m;
    while (true) {
      m = parseFloat(await ask(`Marks for ${subName} (0-100): `));
      if (!Number.isFinite(m) || m < 0 || m > 100) {
        console.log("Enter valid marks (0-100).");
      } else {
        break;
      }
    }
    subjects.push(subName);
    marks.push(m);
  }

  
  const total = marks.reduce((a, b) => a + b, 0);
  const percent = (total / (subCount * 100)) * 100;
  const grade = gradeFromPercent(percent);

  console.log(`\nResult for ${name}:`);
  subjects.forEach((s, i) => {
    console.log(`- ${s}: ${marks[i]}/100`);
  });
  console.log(`Total: ${total}/${subCount * 100}`);
  console.log(`Percentage: ${percent.toFixed(2)}%`);
  console.log(`Grade: ${grade}`);

  rl.close();
}

main();
