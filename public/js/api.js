const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const urlYear = parseInt(urlParams.get('year'));
const urlWeek = parseInt(urlParams.get('week'));

let scheduleYear = getYearNumber();
let scheduleWeek = getWeekNumber();

const scheduleTable = document.getElementById('scheduleTable').getElementsByTagName('tbody')[0];
document.getElementById('currentSchedule').innerHTML = `${scheduleYear} W:${scheduleWeek}`;

let nameClasses = {
  "Robin": "workerColor1",
  "Funda": "workerColor2",
  "Demi": "workerColor3",
  "Milo": "workerColor4",
  "Petra": "workerColor5",
  "Maickel": "workerColor6",
  "Mike": "workerColor7",

  "Stanley": "workerColor8",
  "Red": "workerColor9",
};

function getYearNumber() {
  return new Date().getFullYear();
}

function getWeekNumber() {
  let currentdate = new Date();
  let oneJan = new Date(currentdate.getFullYear(),0,1);
  let numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
  let result = Math.ceil(( currentdate.getDay() + 1 + numberOfDays) / 7);
  return parseInt(result);
}

function showWorker(worker) {
  console.log(worker);
}

async function getCustomScheduleAPI(year, week) {
  /* Empty Table */
  scheduleTable.innerHTML = '';

  /* Get current schedule */
  const dataReq = await fetch(`./api/getSchedule/${parseInt(year)}/${parseInt(week)}`);
  let data = await dataReq.json();
  
  let currentTimestamp = parseInt(data['startDate']);

  let i = 1;
  for(day in data) {
    if(i < 8) {
      let currentDay = "";
      if(day == "1") { currentDay = "MA"; } else
      if(day == "2") { currentDay = "DI"; } else
      if(day == "3") { currentDay = "WO"; } else
      if(day == "4") { currentDay = "DO"; } else
      if(day == "5") { currentDay = "VR"; } else
      if(day == "6") { currentDay = "ZA"; } else
      if(day == "7") { currentDay = "ZO"; }

      let date = new Date(currentTimestamp * 1000);
      currentDay += `<br>${(isNaN(date.getDate()) && isNaN((parseInt(date.getMonth())+1)) ? '' : date.getDate() + '-' + (parseInt(date.getMonth())+1))}`;

      const row = scheduleTable.insertRow();

      const dayRef = row.insertCell();
      dayRef.innerHTML = `<span class="badge bg-secondary${(new Date().getDate() == date.getDate() && (new Date().getMonth()+1) == (date.getMonth()+1) ? ' bg-currentDay': '')}" style="line-height: 14px;">${currentDay}</span>`;

      const earlyRef = row.insertCell();
      earlyRef.innerHTML = `<span class="badge bg-secondary${(nameClasses[data[day][0]] == undefined ? '' : ` ${nameClasses[data[day][0]]}" onclick="showWorker('${data[day][0].toLowerCase()}')`)}">${(data[day][0] == undefined ? '-' : data[day][0])}</span>`;

      const betweenRef = row.insertCell();
      betweenRef.innerHTML = `<span class="badge bg-secondary${(nameClasses[data[day][1]] == undefined ? '' : ` ${nameClasses[data[day][1]]}" onclick="showWorker('${data[day][1].toLowerCase()}')`)}">${(data[day][1] == undefined ? '-' : data[day][1])}</span>`;

      const lateRef = row.insertCell();
      lateRef.innerHTML = `<span class="badge bg-secondary${(nameClasses[data[day][2]] == undefined ? '' : ` ${nameClasses[data[day][2]]}" onclick="showWorker('${data[day][2].toLowerCase()}')`)}">${(data[day][2] == undefined ? '-' : data[day][2])}</span>`;

      const pbRef = row.insertCell();
      pbRef.innerHTML = `<span class="badge bg-secondary${(nameClasses[data[day][3]] == undefined ? '' : ` ${nameClasses[data[day][3]]}" onclick="showWorker('${data[day][3].toLowerCase()}')`)}">${(data[day][3] == undefined ? '-' : data[day][3])}</span>`;

      const nightRef = row.insertCell();
      nightRef.innerHTML = `<span class="badge bg-secondary${(nameClasses[data[day][4]] == undefined ? '' : ` ${nameClasses[data[day][4]]}" onclick="showWorker('${data[day][4].toLowerCase()}')`)}">${(data[day][4] == undefined ? '-' : data[day][4])}</span>`;
      
      i++;
      currentTimestamp = currentTimestamp + 86400;
    }
  }
}

function changeSchedule(year, week, type) {
  if(type == "back") {
    /* If first week of the year */
    if(week == 1) {
      scheduleWeek = 52;
      scheduleYear = scheduleYear-1;
    } else {
      scheduleWeek = scheduleWeek-1;
    }
    getCustomScheduleAPI(parseInt(scheduleYear), parseInt(scheduleWeek));
  } else if(type == "next") {
    /* If last week of the year */
    if(week == 52) {
      scheduleWeek = 1;
      scheduleYear = scheduleYear+1;
    } else {
      scheduleWeek = scheduleWeek+1;
    }
    getCustomScheduleAPI(parseInt(scheduleYear), parseInt(scheduleWeek));
  }
  
  document.getElementById('currentSchedule').innerHTML = `${scheduleYear} W:${scheduleWeek}`;
}

async function main() {
  /* Get current schedule */
  const dataReq = await fetch('./api/getSchedule');
  let data = await dataReq.json();
  
  let currentTimestamp = parseInt(data['startDate']);

  let i = 1;
  for(day in data) {
    if(i < 8) {
      let currentDay = "";
      if(day == "1") { currentDay = "MA"; } else
      if(day == "2") { currentDay = "DI"; } else
      if(day == "3") { currentDay = "WO"; } else
      if(day == "4") { currentDay = "DO"; } else
      if(day == "5") { currentDay = "VR"; } else
      if(day == "6") { currentDay = "ZA"; } else
      if(day == "7") { currentDay = "ZO"; }

      let date = new Date(currentTimestamp * 1000);
      currentDay += `<br>${(isNaN(date.getDate()) && isNaN((parseInt(date.getMonth())+1)) ? '' : date.getDate() + '-' + (parseInt(date.getMonth())+1))}`;

      const row = scheduleTable.insertRow();

      const dayRef = row.insertCell();
      dayRef.innerHTML = `<span class="badge bg-secondary${(new Date().getDate() == date.getDate() && (new Date().getMonth()+1) == (date.getMonth()+1) ? ' bg-currentDay': '')}" style="line-height: 14px;">${currentDay}</span>`;

      const earlyRef = row.insertCell();
      earlyRef.innerHTML = `<span class="badge bg-secondary${(nameClasses[data[day][0]] == undefined ? '' : ` ${nameClasses[data[day][0]]}" onclick="showWorker('${data[day][0].toLowerCase()}')`)}">${(data[day][0] == undefined ? '-' : data[day][0])}</span>`;

      const betweenRef = row.insertCell();
      betweenRef.innerHTML = `<span class="badge bg-secondary${(nameClasses[data[day][1]] == undefined ? '' : ` ${nameClasses[data[day][1]]}" onclick="showWorker('${data[day][1].toLowerCase()}')`)}">${(data[day][1] == undefined ? '-' : data[day][1])}</span>`;

      const lateRef = row.insertCell();
      lateRef.innerHTML = `<span class="badge bg-secondary${(nameClasses[data[day][2]] == undefined ? '' : ` ${nameClasses[data[day][2]]}" onclick="showWorker('${data[day][2].toLowerCase()}')`)}">${(data[day][2] == undefined ? '-' : data[day][2])}</span>`;

      const pbRef = row.insertCell();
      pbRef.innerHTML = `<span class="badge bg-secondary${(nameClasses[data[day][3]] == undefined ? '' : ` ${nameClasses[data[day][3]]}" onclick="showWorker('${data[day][3].toLowerCase()}')`)}">${(data[day][3] == undefined ? '-' : data[day][3])}</span>`;

      const nightRef = row.insertCell();
      nightRef.innerHTML = `<span class="badge bg-secondary${(nameClasses[data[day][4]] == undefined ? '' : ` ${nameClasses[data[day][4]]}" onclick="showWorker('${data[day][4].toLowerCase()}')`)}">${(data[day][4] == undefined ? '-' : data[day][4])}</span>`;
      
      i++;
      currentTimestamp = currentTimestamp + 86400;
    }
  }
}

main();