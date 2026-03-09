const API_URL = "https://mocki.io/v1/0c2e7c5d-9c69-4b49-8a4f-56c7a8e5a123"


function login(){

const email=document.getElementById("email").value
const password=document.getElementById("password").value

if(email && password){

localStorage.setItem("user",email)

window.location.href="dashboard.html"

}else{

alert("Please enter email and password")

}

}


async function loadJobs(){

const container=document.getElementById("jobsContainer")

if(!container) return

try{

const res=await fetch(API_URL)
const jobs=await res.json()

container.innerHTML=""

jobs.forEach(job=>{

const card=document.createElement("div")
card.className="job-card"

card.innerHTML=`

<div class="job-title">${job.title}</div>
<div class="job-company">${job.company}</div>
<div class="status ${job.status}">${job.status}</div>

`

container.appendChild(card)

})

}catch(err){

console.log(err)

}

}

loadJobs()