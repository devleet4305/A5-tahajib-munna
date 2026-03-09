const API="https://phi-lab-server.vercel.app/api/v1/lab/issues"

function login(){

let u=document.getElementById("username").value
let p=document.getElementById("password").value

if(u==="admin" && p==="admin123"){

document.getElementById("loginPage").classList.add("hidden")
document.getElementById("mainPage").classList.remove("hidden")

loadIssues()

}else{

alert("Wrong credentials")

}

}

async function loadIssues(){

const res=await fetch(API)
const data=await res.json()

displayIssues(data.data)

document.getElementById("issueCount").innerText=data.data.length+" Issues"

}

function displayIssues(issues){

const container=document.getElementById("issuesContainer")
container.innerHTML=""

issues.forEach(issue=>{

let card=document.createElement("div")

card.className="card "+issue.status

card.innerHTML=`

<h4>${issue.title}</h4>
<p>${issue.description}</p>
<p>#${issue.id} by ${issue.author}</p>
<p>${issue.createdAt}</p>

`

card.onclick=()=>openModal(issue)

container.appendChild(card)

})

}

function changeTab(type){

document.querySelectorAll(".tabs button").forEach(btn=>btn.classList.remove("active"))

document.getElementById(type+"Tab").classList.add("active")

filterIssues(type)

}

async function filterIssues(type){

const res=await fetch(API)
const data=await res.json()

let issues=data.data

if(type==="open") issues=issues.filter(i=>i.status==="open")
if(type==="closed") issues=issues.filter(i=>i.status==="closed")

displayIssues(issues)

document.getElementById("issueCount").innerText=issues.length+" Issues"

}

async function searchIssue(){

let text=document.getElementById("searchInput").value

const res=await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`)

const data=await res.json()

displayIssues(data.data)

}

function openModal(issue){

document.getElementById("modal").classList.remove("hidden")

document.getElementById("modalTitle").innerText=issue.title
document.getElementById("modalDesc").innerText=issue.description
document.getElementById("modalAuthor").innerText=issue.author
document.getElementById("modalPriority").innerText=issue.priority
document.getElementById("modalStatus").innerText=issue.status
document.getElementById("modalDate").innerText=issue.createdAt

}

function closeModal(){

document.getElementById("modal").classList.add("hidden")

}