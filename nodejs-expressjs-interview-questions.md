# Node.js & Express.js Interview Preparation Guide (Roman Urdu) 🚀

Yeh guide aap ko Node.js aur Express.js ke backend interview questions ki tayari mein madad karne ke liye banayi gayi hai. Is mein basic concepts se lekar middleware pipelines aur database optimization ko Roman Urdu explanations aur code snippets ke sath cover kiya gaya hai.

---

## Table of Contents
1. [Node.js Bunyaadi Concepts (Core Node.js)](#1-nodejs-bunyaadi-concepts-core-nodejs)
2. [Express.js Concepts & Middleware](#2-expressjs-concepts--middleware)
3. [Error Handling & Asynchronous Programming](#3-error-handling--asynchronous-programming)
4. [Security & Authentication (JWT, CORS, etc.)](#4-security--authentication-jwt-cors-etc)
5. [Practical Scenario-based Sawaalat](#5-practical-scenario-based-sawaalat)

---

## 1. Node.js Bunyaadi Concepts (Core Node.js)

### Q1. Node.js kya hai aur yeh itna popular kyun hai?
Node.js koi programming language nahi hai, balkay yeh aik **runtime environment** hai jo JavaScript ko browser ke bahar (server-side par) chalane ki ijazat deta hai.
* **V8 Engine**: Google Chrome ka banaya hua engine jo JS code ko fast machine code mein badalta hai.
* **Non-Blocking I/O**: Node.js asynchronous aur non-blocking I/O operations perform karta hai.
* **Single-Threaded Event Loop**: Single thread hone ke bawajood Node.js hazaron simultaneous requests ko handle kar sakta hai.

---

### Q2. Node.js single-threaded hai to concurrent requests ko kaise handle karta hai?
Yeh Node.js ka sab se mashhoor question hai. Node.js single thread par chalta hai lekin background tasks (jaise database queries, file reading, aur network requests) ko **Libuv library** ke zariye handles karta hai.
1. **Request aati hai**: Request Event Loop par aati hai.
2. **Asynchronous Task**: Agar task I/O intensive hai (e.g. database se data lana ya file read karna), to Event Loop use background thread pool (Libuv's Thread Pool) ya OS kernel ko saunp deta hai.
3. **Execution**: Event Loop aazad ho jata hai doosri request lene ke liye (Non-blocking).
4. **Callback**: Jab background task poora hota hai, to uska callback message/task queue mein aata hai aur call stack khali hote hi execute ho jata hai.

---

### Q3. CommonJS (CJS) aur ES Modules (ESM) mein kya farq hai?
Node.js mein do module systems use hote hain:
* **CommonJS (CJS)**: Purana aur default system.
  * System file: `require()` aur `module.exports`.
  * Execution: Synchronous hoti hai.
  ```javascript
  const fs = require('fs');
  module.exports = myFunction;
  ```
* **ES Modules (ESM)**: Modern JavaScript standard.
  * System file: `import` aur `export`.
  * Execution: Asynchronous hoti hai (is ke liye `package.json` mein `"type": "module"` set karna parta hai).
  ```javascript
  import fs from 'fs';
  export default myFunction;
  ```

---

## 2. Express.js Concepts & Middleware

### Q4. Express.js kya hai aur Middleware kya hote hain?
Express.js Node.js ke liye aik minimal aur flexible **web application framework** hai jo routing aur middleware functionality faraham karta hai.

**Middleware kya hai?**
Middleware aese functions hote hain jin ke paas request object (`req`), response object (`res`), aur application ke next middleware function (`next`) ka access hota hai. Yeh request aur response ke cycles ke darmiyan kaam karte hain.

**Middleware ka flow:**
```text
Client Request  --->  [ Middleware 1 ]  --->  [ Middleware 2 ]  --->  Route Handler (Response)
```

**Simple Middleware Example:**
```javascript
const express = require('express');
const app = express();

// Custom Middleware
const requestLogger = (req, res, next) => {
  console.log(`${req.method} request received for ${req.url}`);
  next(); // Agle middleware ya route handler par bhejne ke liye zaroori hai
};

app.use(requestLogger); // Global use
```

---

### Q5. Middlewares ki kaunsi types hoti hain?
1. **Application-level Middleware**: Jo pure application par apply hon (`app.use()`).
2. **Router-level Middleware**: Jo specific routers par apply hon (`router.use()`).
3. **Built-in Middleware**: Express ke apne built-in functions, jaise `express.json()` (JSON requests parse karne ke liye) aur `express.static()` (CSS/images static serve karne ke liye).
4. **Error-handling Middleware**: Errors ko catch karne ke liye (`err` parameter ke sath).
5. **Third-party Middleware**: Bahar se install kiye jaane wale libraries (jaise `cors`, `morgan`, `helmet`).

---

## 3. Error Handling & Asynchronous Programming

### Q6. Express.js mein Global Error Handler kaise banate hain?
Express mein standard error handling middleware mein 4 parameters hote hain: `(err, req, res, next)`. Agar route handler mein koi error aaye, to hum `next(error)` call karte hain aur control direct is middleware par chala jata hai.

**Example:**
```javascript
// App routes
app.get('/data', async (req, res, next) => {
  try {
    const data = await databaseQuery();
    res.send(data);
  } catch (error) {
    next(error); // Error global handler ko pass kiya
  }
});

// Global Error Handler (Hamesha saare routes ke aakhir mein define karein)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Server par koi masla aa gaya hai!'
  });
});
```

---

### Q7. Uncaught Exception aur Unhandled Rejection mein kya farq hai?
* **Uncaught Exception**: Jab synchronous code mein koi aesa error aaye jo `try-catch` mein handle na kiya gaya ho.
* **Unhandled Rejection**: Jab koi Promise reject ho jaye aur hum ne `.catch()` ya `try-catch` na lagaya ho.

**Inhe handle karne ka tareeqa:**
```javascript
// Sync errors catch karne ke liye
process.on('uncaughtException', (err) => {
  console.error('Bara Khatra! Uncaught Exception:', err);
  process.exit(1); // App crash hone se pehle safe exit karein aur PM2 auto-restart kar dega
});

// Async Promise errors catch karne ke liye
process.on('unhandledRejection', (reason, promise) => {
  console.error('Promise reject hua par handle nahi kiya:', reason);
});
```

---

## 4. Security & Authentication (JWT, CORS, etc.)

### Q8. JWT (JSON Web Token) kya hai aur yeh kaise kaam karta hai?
JWT authentication aur state-less sessions ke liye aik compact aur self-contained secure token format hai.
* **Strucutre**: Yeh teen hisson par mushtamil hota hai, jinhein dots (`.`) se alag kiya jata hai: **Header.Payload.Signature**.
* **Flow**:
  1. User login credentials bhejta hai.
  2. Server database check kar ke token sign karta hai (using secret key) aur user ko token bhej deta hai.
  3. Client us token ko headers mein (e.g., `Authorization: Bearer <token>`) save rakhta hai.
  4. Agli request par server bina database check kiye token verify kar ke request process kar deta hai.

**Verification Middleware Example:**
```javascript
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) return res.status(401).json({ message: 'Token missing!' });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid Token!' });
    req.user = user;
    next();
  });
};
```

---

### Q9. CORS (Cross-Origin Resource Sharing) kya hai aur isay kaise handle karte hain?
CORS browser ka aik security mechanism hai jo do mukhtalif domains (origins) ke darmiyan request-sharing ko control karta hai.
* **Masla**: Agar frontend `http://localhost:3000` par hai aur backend `http://localhost:5000` par chal raha hai, to browser default security block kar dega jise CORS error kehte hain.
* **Hal**: Backend par explicit headers set karne parte hain. Express mein `cors` package use hota hai.

```javascript
const cors = require('cors');

// Sab origins ko allow karne ke liye
app.use(cors());

// Specific domain allow karne ke liye (Acha tareeqa)
app.use(cors({
  origin: 'https://mytrustedfrontend.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
```

---

## 5. Practical Scenario-based Sawaalat

### Sawaal 1: Node.js application ko production mein scale kaise karte hain?
Node.js single-threaded hai to yeh CPU ke sirf aik core ko use karta hai. CPU ke baqi cores ko use karne ke do behtareen tareeqe hain:
1. **Cluster Module**: Node.js ka built-in module jo multiple instances (forks) create karta hai jo aik hi port ko share karte hain.
2. **PM2 (Process Manager)**: Production process manager jo automatically app ko cluster mode mein chalata hai, load balance karta hai, aur app crash hone par automatic restart karta hai.
   ```bash
   # PM2 command to scale on all available CPU cores
   pm2 start app.js -i max
   ```

---

### Sawaal 2: Event Emitters kya hain?
Node.js event-driven architecture par chalta hai. **EventEmitter** class events create karne, listen karne, aur fire (emit) karne ke liye use hoti hai.

**Example:**
```javascript
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

// Event Listener register karna
myEmitter.on('login', (username) => {
  console.log(`${username} ne login kar liya hai!`);
});

// Event fire (emit) karna
myEmitter.emit('login', 'Muhammad Abdullah');
```

---

### Sawaal 3: Stream aur Buffer kya hote hain?
Bohat bare files aur data payloads ke sath deal karne ke liye use hote hain:
* **Buffer**: Memory mein temporarily data store karne ki jagah hoti hai jab data aik jagah se doosri jagah transfer ho raha ho.
* **Stream**: Data ko chote chote chunks mein read/write karne ka tareeqa hai bina poori file ko memory mein load kiye. (E.g. video streaming, massive file reading).
  ```javascript
  const fs = require('fs');
  // File ko chunks mein read karna
  const readStream = fs.createReadStream('./largeFile.txt');
  readStream.on('data', (chunk) => {
    console.log('Naya chunk mila:', chunk.length);
  });
  ```

---

**Mashallah, aap ki tayari boht behtar direction mein ja rahi hai. Backend development mein system design aur optimization sab se important hote hain. Datt kar tayari karein, kamyabi aap ka intezaar kar rahi hai! 🚀💪**
