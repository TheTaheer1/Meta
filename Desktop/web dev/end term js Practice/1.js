// /* 
// =========================================================
// ✅ ASYNCHRONOUS JAVASCRIPT – 5 PRACTICE QUESTION SETS (TWISTED)
// =========================================================

// 📌 Instructions:
// - Solve each function inside the given stub ONLY.
// - Do NOT change the test cases.
// - Use the mentioned async method (callback / promise / async-await).
// */


/* 
=========================================================
✅ QUESTION 1 (Callback) : Delivery Status Update
=========================================================

🟢 Title: Send Delivery Status Using Callback

📝 Problem:
You are building a delivery tracking system.
After a delay of 900ms, confirm if trackingId is valid.

✅ Requirements:
1) Function: sendDeliveryStatus(trackingId, callback)
2) Use setTimeout(900ms)
3) trackingId must be a STRING and must start with "TRK-"
   else callback("Invalid tracking ID", null)
4) On success callback(null, { trackingId, status: "Delivered" })

---------------------------------------------------------
*/

// function sendDeliveryStatus(trackingId, callback) {
//   // TODO: Implement here
//   setTimeout(function(){
//     if(typeof trackingId !== 'string' || !trackingId.startsWith('TRK-')){
//       callback('Invalid tracking ID',null)
//       return
//     }
//     callback(null,{ trackingId, status: "Delivered" })
//   },900)
// }


// // ✅ Function Calls / Test Cases (DO NOT CHANGE)
// sendDeliveryStatus("TRK-7821", console.log);
// sendDeliveryStatus("7821", console.log);
// sendDeliveryStatus(12345, console.log);



/* 
=========================================================
✅ QUESTION 2 (setTimeout) : Exam Reminder Scheduler
=========================================================

🟢 Title: Schedule Exam Reminder Message

📝 Problem:
You want to show an exam reminder message after some delay.

✅ Requirements:
1) Function: examReminder(message, delaySeconds)
2) If delaySeconds is NOT a number OR delaySeconds <= 0
   print: "Invalid reminder delay"
3) Else print the message after delaySeconds * 1000 ms

---------------------------------------------------------
*/

// function examReminder(message, delaySeconds) {
//   // TODO: Implement here
//   if(delaySeconds<=0 || typeof delaySeconds !== 'number'){
//     console.error('Invalid reminder delay')
//     return
//   }
//   setTimeout(function(){
//     console.log(message)
//   },delaySeconds*1000)
// }


// ✅ Function Calls / Test Cases (DO NOT CHANGE)
// examReminder("Revise Async/Await section!", 2);
// examReminder("Practice Promises now!", 0);
// examReminder("Mock test time!", "3");



/* 
=========================================================
✅ QUESTION 3 (Promise) : Generate Ticket Number
=========================================================

🟢 Title: Generate Support Ticket Number

📝 Problem:
A customer support system generates a ticket number asynchronously.

✅ Requirements:
1) Function: generateTicket(codeLength)
2) Use Promise + setTimeout(450ms)
3) codeLength must be exactly 5 (number)
   else reject("Ticket code length must be 5")
4) On success resolve a string like: "TCK-48392"
   (5 digits random)

---------------------------------------------------------
*/

// function generateTicket(codeLength) {
//   // TODO: Implement here
//   return new Promise(function(resolve,reject){
//     setTimeout(function(){
//       if(codeLength !== 5){
//         reject('Ticket code length must be 5')
//         return
//       }
//       const ans=Math.floor(10000+Math.random()*90000)
//       resolve(`TCK-${ans}`)
//     },450)
//   })
// }


// // ✅ Function Calls / Test Cases (DO NOT CHANGE)
// generateTicket(5).then(console.log).catch(console.error);
// generateTicket(6).then(console.log).catch(console.error);
// generateTicket("5").then(console.log).catch(console.error);



/* 
=========================================================
✅ QUESTION 4 (Promise Chaining) : Login Flow Chain
=========================================================

🟢 Title: Login → Fetch Dashboard → Save Session

📝 Problem:
A website has 3 steps that must run one after another.

✅ Requirements:
1) loginUser(username) → resolves "User <username> logged in"
2) fetchDashboard(message) → resolves "<message> → Dashboard loaded"
3) saveSession(message) → resolves "<message> → Session saved"
4) Use promise chaining at the end (do not use async/await)

---------------------------------------------------------
*/

// function loginUser(username) {
//   // TODO: Implement here
//   return Promise.resolve(`User ${username} -> logged in`)
// }

// function fetchDashboard(message) {
//   // TODO: Implement here
//   return Promise.resolve(`${message} -> Dashboard loaded`)
// }

// function saveSession(message) {
//   // TODO: Implement here
//   return Promise.resolve(`${message} -> Session saved`)
// }


// // ✅ Function Calls / Test Cases (DO NOT CHANGE)
// loginUser("taheer")
//   .then(fetchDashboard)
//   .then(saveSession)
//   .then(console.log)
//   .catch(console.error);



/* 
=========================================================
✅ QUESTION 5 (async/await) : Read Two Files Serially (TWIST)
=========================================================

🟢 Title: Read Logs in Order Using async/await

📝 Problem:
You have a helper function fetchByPromise(fileName)
that returns a promise containing file content.
You must read two files ONE BY ONE (serially).

✅ Requirements:
1) Function: readLogsSerial(fileA, fileB, outputArr)
2) Read fileA first using await fetchByPromise(fileA)
3) Then read fileB using await fetchByPromise(fileB)
4) Push content of fileA then fileB into outputArr
5) At the end push: "Logs Completed"

⚠️ Important: DO NOT use Promise.all

---------------------------------------------------------
*/

// ✅ Given helper (DO NOT CHANGE)
function fetchByPromise(fileName) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!fileName || typeof fileName !== "string") {
        reject("Invalid file name");
      } else {
        resolve(`CONTENT_OF_${fileName}`);
      }
    }, 300);
  });
}

async function readLogsSerial(fileA, fileB, outputArr) {
  // TODO: Implement here
  await fetchByPromise(fileA).then(function(ans1){
    outputArr.push(ans1)
  })

  await fetchByPromise(fileB).then(function(ans2){
    outputArr.push(ans2)
  })
  outputArr.push('Logs Completed')
}


// ✅ Function Calls / Test Cases (DO NOT CHANGE)
let out = [];
readLogsSerial("server.log", "errors.log", out)
  .then(() => console.log(out))
  .catch(err => console.error("Error:", err));

let out2 = [];
readLogsSerial("", "errors.log", out2)
  .then(() => console.log(out2))
  .catch(err => console.error("Error:", err));

/* 
=========================================================
✅ END OF PRACTICE SET
=========================================================
*/
