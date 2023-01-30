function format(peopleArray) {
  let formattedArray = [];
  for (let i = 0; i < peopleArray.length; i++) {
      let person = peopleArray[i].split(', ');
      let firstName = person[0].split(' ')[0];
      let secondName = person[0].split(' ')[1];
      let age = person[1];
      let gender = person[2];
      // formattedArray.push(`${gender[0]}: {second name: ${secondName[1]}, age:${person[1]}}`);
       formattedArray.push({firstName, secondName, age, gender});
      //let outPut = `${name[0]}: {second name: ${name[1]}, age:${data[1]}}`;
  }
  return formattedArray;
}
let people = ["Patrick wyne, 30, male", "Jane doe, 25, female", "Mike Smith, 35, male"];
let formattedPeople = format(people);
console.log(formattedPeople);
