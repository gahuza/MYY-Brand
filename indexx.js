const fname = document.getElementById('name')
const password = document.getElementById('password')
const form = document.getElementById('form')
const errorElement = document.getElementById('error')

form.addEventListener('submit', (e) => {
let messages = [];
if (fname.value.length ===''||fname.value.length == null) {
    messages.push('fname required')
  
}
if (password.value.length <=6 ){
    messages.push('issuffient password')
}
if (messages.length > 0) {
    e.preventDefault()
    errorElement.innerText = messages.join(', ')
}
    

})
