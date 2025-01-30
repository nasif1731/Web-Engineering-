function hello() {
    console.log("Hello World");
    // let fruits=["Mango","Apple","Banana"];


}
// Creating an array using the 'new Array' constructor
let fruits = new Array("Mango", "Apple", "Banana");
// Alternative way to create an array: let fruits = ["Mango", "Apple", "Banana"];

// Accessing array elements using index
console.log(fruits[0]); // Output: Mango

// Using splice() to modify an array by removing and adding elements
// Syntax: array.splice(startIndex, deleteCount, item1, item2, ...)
fruits.splice(2, 5, "Apple", "Guava", "Raspberry", "Peach", "Grapes");
console.log(fruits); // Output: ["Mango", "Apple", "Apple", "Guava", "Raspberry", "Peach", "Grapes"]

// Using slice() to extract a portion of an array without modifying the original array
// Syntax: array.slice(startIndex, endIndex)
let fruits1 = fruits.slice(0, 2);
console.log(fruits1); // Output: ["Mango", "Apple"]

// Using indexOf() to find the index of a specific element in an array
console.log(fruits.indexOf("Banana")); // Output: -1 (Banana is not present in the array anymore)

// Using forEach() to iterate through each element in the array
fruits.forEach((value) => console.log(value.toUpperCase()));

// Using map() to create a new array by modifying each element
let htmlListItems = fruits.map((value) => "<li>" + value + "</li>");
console.log(htmlListItems); 
// Output: ["<li>Mango</li>", "<li>Apple</li>", "<li>Apple</li>", "<li>Guava</li>", "<li>Raspberry</li>", "<li>Peach</li>", "<li>Grapes</li>"]

// Using reduce() to find the maximum value in an array
let values = [1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12];
let max = values.reduce((acc, value) => (acc > value ? acc : value), 0);
console.log(max); // Output: 12

// Using reduce() to generate an HTML list from an array
let result = fruits.reduce((acc, value) => acc + "<li>" + value + "</li>", "<ul>");
console.log(result += "</ul>");
// Output: <ul><li>Mango</li><li>Apple</li> ... <li>Grapes</li></ul>

// Using reduce() to flatten a multidimensional array
let nums = [
    [1, 2, 3, 4, 5, 6, 7, 8],
    [1, 2, 3, 4, 5, 6, 7]
];
let h = nums.reduce((acc, value) => acc.concat(value, []));
console.log(h); 
// Output: [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7]

// Using Set to store unique values and perform operations
let letters = new Set();
letters.add(2);
letters.add(5);
letters.add(6);
letters.delete(2);
console.log(letters); // Output: Set {5, 6}

// String operations
let value = 3;
let msg = new String("Hello" + value); // Using String object
let msg2 = `Hello ${value}`; // Using template literals (recommended)
console.log(msg2); // Output: Hello 3

// String methods
console.log(msg2[0]); // Output: H (Accessing character at index 0)
console.log(msg2.charAt(3)); // Output: l (Character at index 3)
console.log(msg2.slice(0, 4)); // Output: Hell (Extracting substring from index 0 to 3)
console.log(msg2.slice(-1, 4)); // Output: (Invalid range, returns empty string)

// Using join() to convert an array into a string
console.log(values.join(",")); // Output: "1,2,4,5,6,7,8,9,10,11,12"

// Additional useful methods:

// Finding an element that satisfies a condition
let found = values.find((num) => num > 5);
console.log(found); // Output: 6

// Checking if some elements pass a condition
let hasEven = values.some((num) => num % 2 === 0);
console.log(hasEven); // Output: true

// Checking if all elements pass a condition
let allPositive = values.every((num) => num > 0);
console.log(allPositive); // Output: true

// Sorting an array (Ascending order by default)
fruits.sort();
console.log(fruits);

// Reversing an array
fruits.reverse();
console.log(fruits);

// Converting an array into a string using join
console.log(values.join(",")); // Output: "1,2,4,5,6,7,8,9,10,11,12"

// Filtering elements that match a condition
let evenNumbers = values.filter((num) => num % 2 === 0);
console.log(evenNumbers); // Output: [2, 4, 6, 8, 10, 12]

// Using fill() to replace array elements
let filledArray = new Array(5).fill("A");
console.log(filledArray); // Output: ["A", "A", "A", "A", "A"]

// Using pop() to remove the last element
let lastFruit = fruits.pop();
console.log(lastFruit); // Output: last element in the array
console.log(fruits); // Modified array

// Using push() to add elements at the end
fruits.push("Strawberry");
console.log(fruits); // Updated array

// Using shift() to remove the first element
let firstFruit = fruits.shift();
console.log(firstFruit); // Output: first element in the array
console.log(fruits); // Updated array

// Using unshift() to add elements at the beginning
fruits.unshift("Pineapple");
console.log(fruits); // Updated array









