class Student {
  constructor(id, name, grades, attendance) {
    this.id = id;
    this.name = name;
    this.grades = grades;
    this.attendance = attendance;
  }
  getAverage() {
    return this.grades.reduce((acc, g) => acc + g, 0) / this.grades.length;
  }
  getGrade(avg) {
    if (avg >= 90) return "A";
    else if (avg >= 80) return "B";
    else if (avg >= 70) return "C";
    else if (avg >= 60) return "D";
    else if (avg >= 50) return "E";
    else return "F";
  }
  getResult() {
    let avg = this.getAverage();
    if (avg >= 50 && this.attendance >= 75) return "ناجح";
    else return "يحتاج مراجعة";
  }
}

const studentsList = [
  new Student(1, "احمد محمد", [85, 90, 88], 90),
  new Student(2, "سارة علي", [45, 42, 48], 80),
  new Student(3, "عمر خالد", [48, 44, 47], 70),
  new Student(4, "ليلى حسن", [30, 35, 28], 60),
];

console.log("===== تقرير الطلاب =====");
studentsList.forEach((s) => {
  let avg = s.getAverage();
  console.log(`الاسم: ${s.name} | المتوسط: ${avg.toFixed(2)} | التقدير: ${s.getGrade(avg)} | النتيجة: ${s.getResult()}`);
});

const strugglingStudents = studentsList.filter((s) => {
  let avg = s.getAverage();
  return avg >= 40 && avg <= 49;
});

const afterMercy = strugglingStudents.map((s) => {
  let oldAvg = s.getAverage();
  return { name: s.name, oldAvg: oldAvg, newAvg: oldAvg + 5 };
});

console.log("الطلاب المتعثرين بعد الرأفة:", afterMercy);
const sumAfterMercy = afterMercy.reduce((acc, item) => acc + item.newAvg, 0);
const mercyAvg = afterMercy.length > 0 ? sumAfterMercy / afterMercy.length : 0;
console.log(`متوسط المتعثرين بعد التعديل: ${mercyAvg.toFixed(2)}`);

let tbody = document.getElementById("studentsTable");
let pass = 0;

studentsList.forEach((s) => {
  let avg = s.getAverage();
  let result = s.getResult();
  if (result === "ناجح") pass++;

  let badge = result === "ناجح"
    ? "background:#e6f4ec; color:#1a7f4b; border:1px solid #b8e0c8;"
    : "background:#fdecec; color:#b42318; border:1px solid #f5c6c0;";
  let gradeStyle = s.getGrade(avg) === "F"
    ? "background:#fdecec; color:#b42318;"
    : "background:#eef2f7; color:#0f2a44;";

  tbody.innerHTML += `
    <tr>
      <td style="color:#9ca3af;">#${s.id}</td>
      <td style="color:#0f2a44; font-weight:900;">${s.name}</td>
      <td>${avg.toFixed(2)}</td>
      <td><span style="${gradeStyle} padding:4px 12px; border-radius:8px; display:inline-block; font-weight:900;">${s.getGrade(avg)}</span></td>
      <td style="color:#6b7280;">${s.attendance}%</td>
      <td><span style="${badge} padding:5px 12px; border-radius:20px; font-size:12px; font-weight:900;">${result}</span></td>
    </tr>
  `;
});

let mercyDiv = document.getElementById("mercyList");
afterMercy.forEach((m) => {
  mercyDiv.innerHTML += `
    <div class="mercy-item">
      <span style="font-weight:900; color:#0f2a44;">${m.name}</span>
      <span style="font-weight:800;">
        <span style="color:#9ca3af; text-decoration:line-through;">${m.oldAvg.toFixed(2)}</span>
        <span style="color:#c9a86a;"> ← </span>
        <span style="color:#1a7f4b; background:#e6f4ec; padding:2px 10px; border-radius:8px;">${m.newAvg.toFixed(2)}</span>
      </span>
    </div>
  `;
});

document.getElementById("mercyAvg").innerText = mercyAvg.toFixed(2);
document.getElementById("totalCount").innerText = studentsList.length;
document.getElementById("passCount").innerText = pass;
document.getElementById("failCount").innerText = studentsList.length - pass;
document.getElementById("mercyCount").innerText = afterMercy.length;