const form2 = document.getElementById('form1')
const lname = document.getElementById('fname')
const comment= document.getElementById('subject')

const errorElement2 = document.getElementById('errorname')
const errorElementcont = document.getElementById('errortxt')
const errorElementname = document.getElementById('')



form2.addEventListener('submit',(e) =>{
 
   let messages2 = [];
   let jado = []
   
   if (lname.value ===''||lname.value== null){
  messages2.push('Names required')
   }
   
  
   if (messages2.length > 0) {
       e.preventDefault()
       errorElement2.innerText= messages2.join(', ')
   }
   if (comment.value===''||comment.value==null){
    jado.push('Require more characters')
   }
   
   if (jado.length > 0) {
       e.preventDefault()
       errorElementcont.innerText= jado.join(', ')
   }
   
    
})