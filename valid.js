const fname = document.getElementById('fname')
const lname = document.getElementById('lname')
const email = document.getElementById('email')
const tel = document.getElementById('tel')
const password = document.getElementById('password')
const confpass = document.getElementById('confpass')
const form1 = document.getElementById('form1')
const form2 = document.getElementById('form2')
const errorElement = document.getElementById('error')
const errorElement1 = document.getElementById('error1')
const errorElement2 = document.getElementById('error1')
const errorElementlname = document.getElementById('errorlname')
const errorElementemail = document.getElementById('erroremail')
const errorElementpass =document.getElementById('errorpass')
const errorElementconfirm = document.getElementById('errorcomf')

form1.addEventListener('submit', (e) => {
let messages = [];
let messages1 = [];
let messlname = [];
let messemail = []
let messpass = []
let messconfirm =[]

if (fname.value ===''||fname.value== null) {
    messages.push('Fname required')
  
}

if (email.value ===''||email.value== /^([\w-\.]+@(?!gmail.com))$/){
    messemail.push(' Email required')
}

if (lname.value ===''||lname.value==null){
    messlname.push('lastname required')
}
if (tel.value.length !==10 ){
    messages1.push('Telephone must be 10 characters')
}
if (password.value.length <8){
    messpass.push('Strong password required')
}


if (messages.length > 0) {
    e.preventDefault()
    errorElement.innerText = messages.join(', ')
}
if (messages1.length > 0) {
    e.preventDefault()
    
    errorElement2.innerText= messages1.join(', ')
}
if (messlname.length >0){
    e.preventDefault()
    
    errorElementlname.innerText= messlname.join(', ')
}
if (messemail.length >0){
    e.preventDefault()
    
    errorElementemail.innerText= messemail.join(', ')
}
if (messpass.length >0){
    e.preventDefault()
    
    errorElementpass.innerText= messpass.join(', ')
}
if (messconfirm .length >0){
    e.preventDefault()
    
    errorElementconfirm.innerText= messconfirm .join(', ')
}
    

})