// let fruits=["apple"]
// console.log(fruits[1])
// fruits.push("peach")
// console.log(fruits)
// fruits.pop()
// console.log(fruits)

let ar=["Taheer",18,25,true]
console.log(ar.indexOf(25))
console.log(ar.includes("Taheer"))


// let healthyfood=['salad','fruits','sprouts']
// let junkfood=['burger','softdrinks','pizza']
// let food=healthyfood.concat(junkfood)
// console.log(food)
// let food2=junkfood.concat(healthyfood)
// console.log(food2)

// let str="My name is Taheer"
// let arr=str.split(" ")
// console.log(arr)
// arr.reverse()
// console.log(arr)

// let str2="Hello"
// let splitarray=str2.split("")
// console.log(splitarray)
// console.log(splitarray.join())

// let fruits=["apple","banana","kiwi"]
// fruits.splice(1,1)
// console.log(fruits)
// fruits.splice(1,0,"grapes","peach")
// console.log(fruits)
// fruits.splice(2,2,"guava","orange")
// console.log(fruits)



let arr=[10,20,30,40,50,60,70]
let newarr=arr.slice(1,5)
console.log(newarr)

let str = "hello";
let reversed = str.split('') // Split string into array of chars
                 .reverse() // Reverse the array
                 .join(''); // Join back into a string

console.log(reversed); // "olleh"


let sentence = "I love JavaScript";
let reversedWords = sentence.split(' ') // split by spaces
                            .reverse() // reverse array of words
                            .join(' '); // join back with spaces

console.log(reversedWords); // "JavaScript love I"
