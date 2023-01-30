
const form2 = document.getElementById('adform')
const title = document.getElementById('text1')
const comment = document.getElementById('summernotee')

const errorElement2 = document.getElementById('errortxt')
const errorElementcont = document.getElementById('errsumme')


form2.addEventListener('submit',(e) =>{
    let messages2 = [];
    let jado = []
    
    if (title.value ===''||title.value== null){
       messages2.push('require title')
    }
    
   
    if (messages2.length > 0) {
        e.preventDefault()
        errorElement2.innerText= messages2.join(', ')
    }
   
    // if (comment.value ===''||comment.value== null){
    //     jado.push('Require content')
    //  }
     if (comment.value.length < 10){
       alert('more characters')
     }

    if (jado.length > 0) {
        e.preventDefault()
        errorElementcont.innerText= jado.join(', ')
    }
    
})