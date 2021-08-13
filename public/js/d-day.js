const DdayForm = document.getElementById("dday-form");
const resultDday = document.getElementById("resultdday");
const ddayToggle = document.getElementById("dday-toggle");
const ddayOpenBtn = document.querySelector(".dday-open")

const yearInput = document.getElementById("year");
const monthInput = document.getElementById("month");
const dayInput = document.getElementById("day");
const newDdaySubmit = document.getElementById("submit");

function buttonVisibleHandler() {
    ddayToggle.classList.toggle("hidden");
}

function handleDdaySubmit(event) {
    event.preventDefault();
    const newYear = yearInput.value;
    const newMonth = monthInput.value;
    const newDay = dayInput.value;
    DdayForm.childNodes.value = "";
    const ddayValue = `${newYear}, ${newMonth}, ${newDay}`;
    calcDday(ddayValue);
}

function calcDday(ddayValue) {
	 const params = {
    year: yearInput.value,
    month: monthInput.value,
    day: dayInput.value,
  };

  axios.post("/save_date", params);
    const now = new Date();
    const Dday = new Date(ddayValue);
    const gap = now.getTime() - Dday.getTime();
    const result = Math.floor(gap / (1000 * 60 * 60 * 24)) * -1;
   if(result < 0){
		resultDday.innerText= `D +${Math.abs(result)}`;
	} else if(result > 0){
		resultDday.innerText= `D -${result}`;
	}else{
		resultDday.innerText= `D - Day`;
	}

}

function init() {
  if (
    yearInput.value !== "" &&
    monthInput.value !== "" &&
    dayInput.value !== ""
  ) {
    var now = new Date();
    var temp = [yearInput.value, monthInput.value, dayInput.value];
    var Dday = new Date(temp);
    
    var gap = now.getTime() - Dday.getTime();
    var result = Math.floor(gap / (1000 * 60 * 60 * 24)) * -1;
    if (result < 0) {
      resultDday.innerText = `D +${Math.abs(result)}`;
    } else if (result > 0) {
      resultDday.innerText = `D -${result}`;
    } else {
      resultDday.innerText = `D - Day`;
    }
  }
};

init(); // 리프레시 및 처음실행시 디데이 있으면 나오도록

DdayForm.addEventListener("submit", handleDdaySubmit);
ddayOpenBtn.addEventListener("click", buttonVisibleHandler)