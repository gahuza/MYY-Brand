
function validation() {
    let form = document.getElementById('form1')
    let email = document.getElementById('email').value
    let text = document.getElementById('erroremail')
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/
    let name = document.getElementById('fname')
    let txtt = document.getElementById('error')
    let messa = document.getElementById('mess')
    let txttt = document.getElementById('errormess')
    let subject = document.getElementById('subject')
    let okelo = document.getElementById('errortxt')
    let tel = document.getElementById('tel');
    let error1 = document.getElementById('error11');
  
    if (email.match(pattern)) {
      form.classList.add('valid')
      form.classList.remove('invalid')
      text.innerHTML = ""
      text.style.color = '#ff0000'
    } else {
      form.classList.remove('valid')
      form.classList.add('invalid')
      text.innerHTML = "Please Enter Valid Email Address"
      text.style.color = '#ff0000'
    }
  
    if (email == '') {
      form.classList.remove('valid')
      form.classList.remove('invalid')
      text.innerHTML = ""
      text.style.color = '#00ff00'
    }
    if ( name.value.length <3){
        txtt.innerHTML ="Name required"
        text.style.color = '#ff0000'
    }
    else{
        txtt.innerHTML =""
        text.style.color = '#00ff00'
    }
    if ( messa.value.length <20){
        txttt.innerHTML ="Message must be more 20 characters"
        
    }
    else{
        txttt.innerHTML =""
    }

    if (subject.value.length <10){
        okelo.innerHTML ="your comment must contain atleast 10 characters."
        okelo.style.color = '#ff0000'
    }
    else{
        okelo.innerHTML =""
    }
    if (tel.value.length <10){
      error1.innerHTML ="your phone must contain 10 characters."
     error1.style.color = '#ff0000'
  }
  else{
    error1.innerHTML =""
  }
  }
  