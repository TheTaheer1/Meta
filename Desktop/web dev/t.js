// function printname(cb){
//     console.log('Taheer')
// cb()
// }
// function printlastname(){
//     console.log('Hatia')
// }
// printname(printlastname)





// let RadiusArr = [2, 4, 8, 10]
// // calculateArea = []
// // calculateCircumference = []
// // calculateDiameter => ans =  [4, 8, 16, 20]

// function calculateArea(arr){
//   let area = []
//   for(let i = 0; i < arr.length; i++){
//     area.push(3.14 * arr[i] * arr[i])
//   }
//   return area
// }
// function calculateCircumference(arr){
//   let cir = []
//   for(let i = 0; i < arr.length; i++){
//     cir.push(2 * 3.14 * arr[i])
//   }
//   return cir
// }
// function calculateDiameter(arr){
//   let dia = []
//   for(let i = 0; i < arr.length; i++){
//     dia.push(2* arr[i] )
//   }
//   return dia
// }
// console.log(RadiusArr)
// console.log(calculateArea(RadiusArr))
// console.log(calculateCircumference(RadiusArr))
// console.log(calculateDiameter(RadiusArr))


// let radiusarr=[2,4,8,10]
// function circlearea(r){
//     return 3.14*r*r
// }
// function circlecir(r){
//     return 2*3.14*r
// }
// function circledi(r){
//     return 2*r
// }
// function calcircledetail(arr,cb){
//     let ans=[]
//     for(let i=0;i<arr.length;i++){
//       ans.push(cb(arr[i]))
//     }
//       return ans
// }
// console.log(calcircledetail(radiusarr,circlearea))
// console.log(calcircledetail(radiusarr,circlecir))
// console.log(calcircledetail(radiusarr,circledi))


// let arr=[1,2,3,4,5,6]
// function sq(ar){
//     let ans=[]
//     for(let i=0;i<ar.length;i++){
//         ans.push(ar[i]*ar[i])
//     }
//     return ans
// }
// console.log(sq(arr))


let ar = [1, 2, 3, 4, 5, 6]
let ansarr = ar.map(function (num) {
    return num * 2
})
console.log(ansarr)

let radius = [2, 6, 8]
let ans = radius.map(function (num) {
    return 3.14 * num * num
})
console.log(ans)

let arr=[1,2,3,4,5,6,7,8,9,10]
let evenans=arr.filter(function(num){
    return num%2==0
})
console.log(evenans)

let arr1=[1,2,3,4,5,6,7,8,8,10]
let evenans1=arr1.map(function(num){
    if (num%2 == 0){
    return 'Even'
  }else{
    return 'Odd'
  }
})
console.log(evenans1)

let arr2=[1,2,3,4]
// function sum(arr){
//     sum=0;
//     for(let i=0;i<arr.length;i++){
//         sum +=arr[i]
//     }
//     return sum
// }
// console.log(sum(arr2))
let any=arr2.reduce(function(res,curr){
    res +=curr
    return res
},0)
console.log(any)

let f=[1,2,3,4,5,6,-2,3]
function gz(z){
    let ans=[]
    for(let i=0;i<z.length;i++){
        if(z[i]>0){
            ans.push(z[i])
        }
        
    }
    return ans
}
console.log(gz(f))

const person = {
  name: "J",
  age: 30,
  greet: function() {
    console.log("Hello, " + person.name);
  }
};
person.greet()


console.log(square(5)); // 25

function square(x) {
  return x * x;
}

// var numbers = [1, 2, 3, 4];
// var sum = numbers.reduce(function(accumulator, current) {
//   return accumulator + current;
// }, 0);
// console.log(sum); // 10


var products = [
  { name: "Shirt", price: 20 },
  { name: "Pants", price: 30 },
  { name: "Hat", price: 10 }
];

// Get names of products that cost more than $15
var expensiveProducts = products
  .filter(function(product) {
    return product.price > 15;
  })
  .map(function(product) {
    return product.name;
  });

console.log(expensiveProducts); // ["Shirt", "Pants"]


function blockScopeTest() {
  var count = 5;
  let blockCount;
  if (true) {
    let count = 10;
    blockCount = count;
  }
  return [blockCount, count];
}
console.log(blockScopeTest()); // [10, 5]

function getAdultNames(users) {
  return users.filter(function(user) {
    return user.age >= 18;
  }).map(function(user) {
    return user.name;
  });
}
console.log(getAdultNames([
  { name: "Alice", age: 22 },
  { name: "Bob", age: 17 },
  { name: "Charlie", age: 19 }
])); // ["Alice", "Charlie"]

const original = { name: "Ali", age: 25 };
const copy = shallowCopy(original);

console.log(copy); 
// { name: "Ali", age: 25 }
function shallowCopy(obj) {
  return { ...obj };
}

const car = {
  make: "Toyota",
  model: "Camry",
  year: 2023,
  startEngine: function() {
    console.log("Engine started");
  }
};

// Accessing
console.log(car.make);         // Toyota
console.log(car["model"]);     // Camry

// Dynamic access
const prop = "year";
console.log(car[prop]);        // 2023

// Adding property
car.color = "blue";

// Updating property
car.year = 2024;

// Deleting property
delete car.color;

// Calling method
car.startEngine();             // Engine started

var fruits = ["Apple", "grapes"];
fruits.forEach(function(fruit) {
  console.log(fruit);
});
// Output:
// Apple
// Banana

function oddSquares(arr) {
  let m= arr.filter(function(num) {
    return num % 2 !== 0;
  }).map(function(num) {
    return num * num;
  });
  return m;
}
console.log(oddSquares([1, 2, 3, 4, 5])); // [1, 9, 25]


function topStudent(students) {
  return students.reduce(function (highest, current) {
    if (current.marks > highest.marks) {
      return current;
    } else {
      return highest;
    }
  }).name;
}
console.log(topStudent([
  { name: "Alice", marks: 85 },
  { name: "Bob", marks: 92 },
  { name: "Charlie", marks: 88 }
])); // "Bob"