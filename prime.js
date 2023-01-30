function isPrime(num) {
   for (i = 2; i < num; i++) {
     if (num % i == 0) {
       return false;
     }
   }
   return true;
 }
 function sort(arr) {
   for (let i = 0; i <= arr.length; i++) {
     for (let j = 0; j <= arr.length; j++) {
       if (isPrime(arr[j])) {
         arr.splice(j, 1);
       }
       if (arr[i] > arr[j]) {
         let temp = arr[i];
         arr[i] = arr[j];
         arr[j] = temp;
       }
     }
   }
   return arr;
 }