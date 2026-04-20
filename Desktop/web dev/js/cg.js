// function rotateRight(arr,k){
//     if(arr.length<k)
//         k=k%arr.length

//     let res=[]
//     for(let i=arr.length-k;i<arr.length;i++){
//         res.push(arr[i])
//     }
//     for(let i=0;i<arr.length-k;i++){
//         res.push(arr[i])
//     }
//     console.log(res)
// }
// rotateRight([1,2,3,4,5],4)




// function rotateLeft(arr,k){
//     if(arr.length)
//         k=k%arr.length

//     let res=[]

//     for(let i=k;i<arr.length;i++){
//         res.push(arr[i])
//     }
//     for(let i=0;i<k;i++){
//         res.push(arr[i])
//     }
//     console.log(res)
// }
// rotateLeft([1,2,3,4,5],2)


// function merge(arr1,arr2){
//     let i=0
//     let j=0
//     let res=[]
//     while(i<arr1.length && j<arr2.length){
//         if(arr1[i]<arr2[j]){
//             res.push(arr1[i])
//         i++
//         }

//         else{
//           res.push(arr2[j])
//           j++
//         }
//     }

//     while (i < arr1.length) {
//         res.push(arr1[i]);
//         i++;
//     }

//     while (j < arr2.length) {
//         res.push(arr2[j]);
//         j++;
//     }

//     console.log(res);
// }
// merge([1,3,5],[2,4,6])


// console.log("Program start");

// // --------------------
// // Simple function (sync)
// // --------------------
// function add(a, b) {
//   console.log("Inside add function (sync)");
//   return a + b;
// }

// const result = add(2, 3);

// if (result > 4) {
//   console.log("If block executed (sync)");
// } else {
//   console.log("Else block executed (sync)");
// }

// // --------------------
// // for loop (sync)
// // --------------------
// for (let i = 1; i <= 3; i++) {
//   console.log(`For loop iteration ${i} (sync)`);
// }

// // --------------------
// // setTimeout (async - timer queue)
// // --------------------
// setTimeout(() => {
//   console.log("setTimeout callback executed (async)");
// }, 0);

// // --------------------
// // setInterval (async - timer queue)
// // --------------------
// let count = 0;
// const intervalId = setInterval(() => {
//   count++;
//   console.log(`setInterval running (${count}) (async)`);

//   if (count === 2) {
//     clearInterval(intervalId);
//     console.log("setInterval stopped");
//   }
// }, 0);

// // --------------------
// // setImmediate (async - check phase)
// // --------------------
// setImmediate(() => {
//   console.log("setImmediate callback executed (async)");
// });

// // --------------------
// // Promise (microtask queue)
// // --------------------
// const promiseExample = new Promise((resolve) => {
//   console.log("Promise executor runs immediately (sync)");
//   resolve("Promise resolved");
// });

// promiseExample.then((message) => {
//   console.log("Promise .then() executed (microtask)");
// });

// // --------------------
// // async / await
// // --------------------
// async function asyncFunction() {
//   console.log("Inside async function (sync part)");

//   const data = await Promise.resolve("Async/Await resolved");
//   console.log("After await (async part)", data);
// }

// asyncFunction();

// console.log("Program end (sync)");


// setTimeout(() => {
//   console.log("400 sec");
// }, 400);

// for (let i = 1; i <= 3; i++) { console.log("Loop count:", i);
// }

// console.log("Program started");

// setTimeout(() => {
//   console.log("This runs after 200 seconds");
// }, 398);

// console.log("Program ended");


// function kelement(arr,k){
// let temp;
// for(let i=0;i<arr.length;i++){
//     for(let j=0;j<arr.length-1;j++){
//         if(arr[j]>arr[j+1]){
//             temp=arr[j];
//             arr[j]=arr[j+1];
//             arr[j+1]=temp;
//         }
//     }
// }
// console.log(arr)
// }
// kelement([7,10,4,,3,20,15],3)


// function bs(arr,k){
//     let left=0
//     let right=arr.length-1

//     while(left<=right){
//         let mid=Math.floor((left+right)/2)

//         if(arr[mid]>k){
//             right=mid-1
//         }

//         else if(arr[mid]<k){
//             left=mid+1
//         }
//         else{
//             console.log(mid)
//             return
//         }
//     }
//     console.log(-1)
// }
// bs([1,3,5,7,9],3)


// function locc(arr,k){
//     let left=0
//     let right=arr.length-1
//     let ans=-1;

//     while(left<=right){
//          let mid=Math.floor((left+right)/2)

//         if(arr[mid]>k){
//             right=mid-1
//         }

//         else if(arr[mid]<k){
//             left=mid+1
//         }
//         else{
//             ans=mid
//             right=mid-1;
//         }
//     }
//     return ans;
// }


// function rocc(arr,k){
//     let left=0
//     let right=arr.length-1
//     let ans=-1;

//     while(left<=right){
//          let mid=Math.floor((left+right)/2)

//         if(arr[mid]>k){
//             right=mid-1
//         }

//         else if(arr[mid]<k){
//             left=mid+1
//         }
//         else{
//            ans=mid
//            left=mid+1
//         }
//     }
//   return ans
// }

// function occ(arr,k){
//     let left=locc(arr,k)
//     if(left === -1){
//         console.log(0)
//     return
//     }
//     let right=rocc(arr,k)
//     console.log(right-left+1)
// }
// occ([1,2,3,5,7,7,7,7,7,8,9,9,10,10],7)



// function sum(arr,k){
//     for(let i=0;i<arr.length;i++){
//         for(let j=i+1;j<arr.length;j++){
//             if(arr[i]+arr[j]==k){
//                 console.log(true)
//                 return
//             }
            
//         }
//     }
//     console.log(false)
    
// }
// sum([1,2,3,4],10)



setTimeout(() => {
  console.log("Timeout completed");
}, 3000);

for (let i = 1; i <= 3; i++) {
  console.log("Loop count:", i);
}