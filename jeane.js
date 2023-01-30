function formatArray(peopleArray) {
        let formattedArray = [];
       for (let i = 0; i < peopleArray.length; i++) {
          let person = peopleArray[i].split(', ');
            let firstName = person[0].split(' ')[0];
           let secondName = person[0].split(' ')[1];
           let age = person[1];
          let gender = person[2];
          let female =person[3];
            formattedArray.push({firstName, secondName, age, gender});
         
    
       }
          return formattedArray;
    }
    let people = ["Patrick wyne, 30, male", "Jane doe, 25, female", "Mike Smith, 35, male","Dodos deck, 21, male"];
let formattedPeople = formatArray(people);
console.log(formattedPeople);