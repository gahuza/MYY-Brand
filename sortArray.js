
function sortAndRemovePrimes(arr) {
   // Helper function to check if a number is prime
   function isPrime(num) {
       if (num < 2) return false;
       for (let i = 2; i <= Math.sqrt(num); i++) {
           if (num % i === 0) return false;
       }
       return true;
   }
   // Sort the array in descending order
   for (let i = 0; i < arr.length; i++) {
       for (let j = i + 1; j < arr.length; j++) {
           if (arr[i] < arr[j]) {
               let temp = arr[i];
               arr[i] = arr[j];
               arr[j] = temp;
           }
       }
   }
   // Remove any prime numbers from the array
   for (let i = 0; i < arr.length; i++) {
       if (isPrime(arr[i])) {
           arr.splice(i, 1);
           i--;
       }
   }
   return arr.sort();
}