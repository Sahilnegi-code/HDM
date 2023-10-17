console.log("hello World")

let id = 0;

let dateExc = document.getElementById("dateExc");
let dateExcBtn = document.getElementById("dateExcBtn");

let startDate = document.getElementById("startDate");


let endDate = document.getElementById("endDate");
// let endDateBtn = document.getElementById("endDateBtn");

let leadCount = document.getElementById('leadCount');

let expectedDrr = document.getElementById("expectedDrr");
let save = document.getElementById('saveBtn');

let dateExcludedArr = [];
let information = [];

const add  = document.getElementById("Add");

add.addEventListener('click', ()=>{
  const  inputDiv = document.getElementById('inputInformation').classList; 
  console.log( inputDiv);
  if(inputDiv.contains("hide")){
    inputDiv.remove("hide");
    inputDiv.add("show");

  }
  else{
    inputDiv.remove("show")
    inputDiv.add("hide");    
  }
})


dateExcBtn.addEventListener('click' , (e)=>{
  console.log("Exc");
  e.preventDefault();
if(!dateExc.value) {
  e.preventDefault();
  return;
}
const sDate = new Date(startDate.value);
const eDate  = new Date(endDate.value);
const dExc = new Date(dateExc.value);

if( !startDate.value  ){
  alert('fill Start Dates');
  e.preventDefault();
}
else if(!endDate.value){
  alert('fill End Dates');
  e.preventDefault();
}
else if( sDate > dExc || dExc > eDate){

  alert("Exluded Date should be entered between Start date and End  Date ");
e.preventDefault();
}
else{
  console.log(dateExcludedArr,"above")
  if(dateExcludedArr.includes(dateExc.value)) {
    return ;
  }
  alert( `user has excluded this date  ${  dateExc.value }`)
  console.log(dateExcludedArr,"down" );
  dateExcludedArr.push(dateExc.value);
}
    console.log(dateExc.value);

console.log(dateExcludedArr);
})
function addInformation(){
    if( !startDate.value || !endDate.value || dateExcludedArr.lenght === 0 ||  !leadCount.value  ){

        alert(' Some Information is Missing ');

        return;
    }
      const sDate = new Date(startDate.value);
    const eDate  = new Date(endDate.value);

    if(sDate > eDate){
        alert("End Date should be greater than Start Date");
        return;
    }


    id++;
    const list = document.getElementById("list");
    const tableRow  =  document.createElement('tr');
    console.log(dateExcludedArr);           
    const str = dateExcludedArr.join(",");
    const noOfDays = countDatesBetween(startDate.value , endDate.value);
    const expectedDrrValue = leadCount.value/noOfDays;
    // const sDate = new Date(startDate.value);
    // const eDate  = new Date(endDate.value);
    console.log(sDate.getMonth());
    console.log(sDate.getFullYear());
    console.log(noOfDays);
    console.log(str);
    var currentTime = new Date(); 
    var hours = currentTime.getHours(); 
    var minutes = currentTime.getMinutes(); 
    var seconds = currentTime.getSeconds(); 
    
    var timeString = hours + ":" + minutes + ":" + seconds;
    
    tableRow.innerHTML = `
    
    <th scope="row">NA</th> 
    <td>${id}</td>
    <td>${startDate.value}</td>
    <td>${endDate.value}</td>
    <td>${ sDate.getMonth()+1   } , ${ sDate.getFullYear() } </td>
    <td>${dateExcludedArr.length}</td>
    <td>${noOfDays}</td>
    <td>${leadCount.value}</td>
    <td>${Math.floor(expectedDrrValue)}</td>
    <td> ${ startDate.value  }  ${" "} , ${  timeString}</td>
    `

    
  

    list.appendChild(tableRow);

    dataSubmission();

dateExcludedArr = [];
endDate.value = "";
startDate.value = "";
dateExc.value = "";
leadCount.value = "";
}

function  dataSubmission(){
  console.log("Done");
  const xhr = new XMLHttpRequest();
xhr.onload = function (){
  const serverResponse = document.getElementsByClassName("serverResponse");
  serverResponse.innerHTML = this.value;

}

xhr.open("POST", "dom.php");
xhr.setRequestHeader("Content-type" ,"application/x-www-form-urlencoded");
xhr.send("name=sahil&message=how");

}

save.addEventListener('click',(e)=>{   
  e.preventDefault();
     addInformation();
})

 function countDatesBetween(startDate, endDate) {
    // Convert the start and end dates to Date objects
    console.log(startDate);
    console.log(endDate);  
    startDate = new Date(startDate);
    endDate = new Date(endDate);
  
    // Calculate the time difference in milliseconds
    const timeDifference = endDate - startDate;
  console.log(timeDifference);
    // Convert the time difference to days
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
  console.log(dateExcludedArr.length);
    // Add 1 to include both the start and end dates
    return daysDifference + 1-dateExcludedArr.length;
  }
   
  // Example usage:
