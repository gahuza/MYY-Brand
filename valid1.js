
const form1 = document.getElementById('form1')
const form2 = document.getElementById('form1')
const email1 = document.getElementById('email')
const password1 = document.getElementById('password')

const errorElement2 = document.getElementById('error1')
const errorElementpass = document.getElementById('errorpasswrd')


form2.addEventListener('submit',(e) =>{
    let messages2 = [];
    let message = []
    
   
    if (password1.value ===''|| password1==null){
        message.push('Password required')
    }
    if (password1.value.length <6 && password1.value.length>0){
        message.push('Incorect password')
    } 
   
    if (message.length > 0) {
        e.preventDefault()
        
        errorElementpass.innerText= message.join(', ')
    }
})