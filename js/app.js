const BACKEND = "https://ai-auto-uploader.onrender.com/"

let freeUploads = localStorage.getItem("freeUploads") || 0

// BUY PLAN
async function buyPlan(amount){

const res = await fetch(`${BACKEND}/payment/create`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body: JSON.stringify({amount})
})

const data = await res.json()

alert("Payment Intent Created. Integrate Stripe Checkout next.")
}

// UPLOAD LOGIC
async function uploadVideo(){

const file = document.getElementById("videoFile").files[0]
const platform = document.getElementById("platform").value

if(!file){
alert("Select file first")
return
}

// Free logic
if(freeUploads < 2){

freeUploads++
localStorage.setItem("freeUploads", freeUploads)

document.getElementById("uploadMessage").innerText =
"Free Short Upload Used: " + freeUploads + "/2"

}else{

alert("Free limit over. Please buy a plan.")
window.location.href = "index.html"
return
}

const res = await fetch(`${BACKEND}/upload/`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body: JSON.stringify({platform})
})

const data = await res.json()

document.getElementById("uploadMessage").innerText = data.status
}

// USER DASHBOARD
async function loadDashboard(){

const res = await fetch(`${BACKEND}/user/dashboard`)
const data = await res.json()

document.getElementById("dashboardData").innerText =
JSON.stringify(data,null,2)
}

// ADMIN
async function loadAdmin(){

const res = await fetch(`${BACKEND}/admin/stats`)
const data = await res.json()

document.getElementById("adminData").innerText =
JSON.stringify(data,null,2)
}
