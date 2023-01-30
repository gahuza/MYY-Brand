
  function convertObject(arr) {
    let males = [];
    let females = [];
    arr.forEach((welcome) => {
      let person = welcome.split(" ");
      let firstname, secondname, age, gender;
      [firstname, secondname, age, gender] = person;
      let personObj = {};
      personObj[firstname] =JSON.stringify( {
        "second-name": secondname,
        age: age,
      });
      gender == "male" ? males.push(personObj) : females.push(personObj);
    });
    return { females,males };
  }
  let welcome = [
    "Patrick wyne, 30, male",
    "lil wyne, 32, male",
    "Eric mimi, 21, female",
    "Dodos deck, 21, male",
    "Alian Dwine, 22, male",
    "Patrick wyne, 33, male",
    "Patrick wyne, 10, male",
    "Patrick wyne, 40, male",
  ];
  console.log(convertObject(welcome));