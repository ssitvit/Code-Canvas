const dob = document.getElementById("birthDate");
const currentDate = document.getElementById("currentDate");
const output = document.getElementById("output");

document.getElementById("calculateBtn").addEventListener("click", () => {
  if (!dob.value || !currentDate.value) {
    output.innerHTML = "Please select Date";
  } else {
    const [dobYear, dobMonth, dobDate] = dob.value.split("-").map(num => parseInt(num, 10));
    const [currYear, currMonth, currDate] = currentDate.value.split("-").map(num => parseInt(num, 10));

    const yearDiff = currYear - dobYear;
    const monthDiff = currMonth - dobMonth;
    const dateDiff = currDate - dobDate;

    const yearAgeDiff = monthDiff < 0 || (monthDiff === 0 && dateDiff < 0) ? yearDiff - 1 : yearDiff;
    const monthAgeDiff = monthDiff < 0 ? 12 + monthDiff : monthDiff;
    const dateAgeDiff = dateDiff < 0 ? daysInMonth(dobMonth, dobYear) - dobDate + currDate : dateDiff;

    output.innerHTML = `${yearAgeDiff} Years, ${monthAgeDiff} Months, ${dateAgeDiff} Days.`;
  }
});

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}
