# JavaScript Interview Preparation Guide (Roman Urdu) 🚀

Mujhe afsos hai ke aap ki job chali gai hai, lekin hosla rakhein! Yeh guide aap ko agle interview ke liye behtareen tayari karne mein madad karegi. Is mein basic se lekar advanced JS concepts ko Roman Urdu explanations aur code snippets ke sath samjhaya gaya hai.

---

## Table of Contents
1. [Basic Concepts (Bunyaadi Sawaalat)](#1-basic-concepts-bunyaadi-sawaalat)
2. [Intermediate Concepts (Darmiyani Sawaalat)](#2-intermediate-concepts-darmiyani-sawaalat)
3. [Advanced & Performance Concepts (Mushkil Sawaalat)](#3-advanced--performance-concepts-mushkil-sawaalat)
4. [Coding & Output-based Questions (Code aur Output wale Sawaalat)](#4-coding--output-based-questions-code-aur-output-wale-sawaalat)
5. [Interview Tips & Best Practices (Kuch Khaas Mashware)](#5-interview-tips--best-practices-kuch-khaas-mashware)

---

## 1. Basic Concepts (Bunyaadi Sawaalat)

### Q1. `var`, `let`, aur `const` mein kya farq hai?
| Feature | `var` | `let` | `const` |
| :--- | :--- | :--- | :--- |
| **Scope** | Function Scope | Block Scope | Block Scope |
| **Hoisting** | Hoist hota hai (aur `undefined` se initialize hota hai) | Hoist hota hai (lekin Temporal Dead Zone mein rehta hai) | Hoist hota hai (lekin Temporal Dead Zone mein rehta hai) |
| **Reassignable** | Haan (Nai value de sakte hain) | Haan (Nai value de sakte hain) | Nahi (Value change nahi ho sakti) |
| **Redeclarable** | Haan (Dobaara declare kar sakte hain) | Nahi (Dobaara declare nahi kar sakte) | Nahi (Dobaara declare nahi kar sakte) |

**Example:**
```javascript
function example() {
  if (true) {
    var x = 10; // Function scope
    let y = 20; // Block scope
    const z = 30; // Block scope
  }
  console.log(x); // 10 (Chunkay var function scope hai, to bracket ke bahar bhi chalega)
  // console.log(y); // ReferenceError: y is not defined
  // console.log(z); // ReferenceError: z is not defined
}
```

---

### Q2. Hoisting kya hoti hai?
Hoisting JavaScript ka default behavior hai jismein variables aur functions ki declarations ko code chalne se pehle un ke scope ke sab se upar (top) par move kar diya jata hai.
* **Sirf declarations hoist hoti hain**, initializations (assignments) hoist nahi hotein.
* **Function declarations** poori tarah hoist hoti hain.
* **`let` aur `const`** hoist to hote hain lekin **Temporal Dead Zone (TDZ)** mein rehte hain jab tak unki line execute na ho jaye. Is liye agar unhein declare karne se pehle access karein to `ReferenceError` aata hai.

**Example:**
```javascript
console.log(a); // Output: undefined (var hoist ho kar undefined ho gaya)
var a = 5;

// console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 10;

greet(); // Output: "Hello!" (Function poori tarah hoist ho gaya)
function greet() {
  console.log("Hello!");
}

// sayHi(); // TypeError: sayHi is not a function (Kyunke variable hoist hua hai, function assignment nahi)
var sayHi = function() {
  console.log("Hi!");
};
```

---

### Q3. Closure kya hai aur yeh kaise kaam karta hai?
Closure tab banta hai jab aik inner function apne outer (parent) function ke variables ko access kar sakta hai, hata ke outer function execute ho kar poori tarah khatam bhi ho chuka ho. JavaScript mein functions apne sath apna "Lexical Environment" (surrounding state) yaad rakhte hain.

**Example:**
```javascript
function outerFunction(outerVariable) {
  return function innerFunction(innerVariable) {
    console.log(`Outer: ${outerVariable}, Inner: ${innerVariable}`);
  };
}

const newFunction = outerFunction("bahar wala");
newFunction("andar wala"); // Output: Outer: bahar wala, Inner: andar wala
```
**Asal use case:** Data privacy (variables ko private rakhne ke liye taake bahar se koi direct change na kar sake).

---

### Q4. JavaScript mein kaunse Data Types hote hain?
JavaScript mein do tarah ke data types hote hain:
1. **Primitive Types** (Directly stack memory mein store hote hain, immutable hote hain, aur value ke zariye compare hote hain):
   * `String` (Text ke liye)
   * `Number` (Integers aur decimals ke liye)
   * `Boolean` (`true` ya `false`)
   * `Null` (Jan boojh kar khali chori gai value)
   * `Undefined` (Variable declare kiya par value nahi di)
   * `Symbol` (Unique key banane ke liye)
   * `BigInt` (Bohat bare numbers ke liye)
2. **Non-Primitive / Reference Types** (Heap memory mein store hote hain, mutable hote hain, aur reference ke zariye compare hote hain):
   * `Object` (Is mein Arrays, Functions, aur Dates bhi aate hain)

---

## 2. Intermediate Concepts (Darmiyani Sawaalat)

### Q5. `==` aur `===` mein kya farq hai?
* **`==` (Loose Equality / Double Equals)**: Yeh check karne se pehle dono values ki data type ko aapas mein match karne ke liye convert karta hai (jise **Type Coercion** kehte hain).
* **`===` (Strict Equality / Triple Equals)**: Yeh bina type convert kiye check karta hai. Dono values ka **value aur type** dono barabar hona zaroori hai.

**Example:**
```javascript
console.log(5 == '5');  // true (String '5' convert ho kar number 5 ban jata hai)
console.log(5 === '5'); // false (Kyunke aik Number hai aur dusra String)
console.log(null == undefined);  // true
console.log(null === undefined); // false
```

---

### Q6. `this` keyword kaise kaam karta hai?
`this` ki value is baat par depend karti hai ke function ko **kaise call kiya gaya hai** (ise runtime binding kehte hain):
1. **Global context:** Browser mein default tor par `this` window object ko represent karta hai.
2. **Object method:** Jab function kisi object ke andar method ke tor par call ho, to `this` us object ko refer karta hai.
3. **Constructor function:** `new` keyword ke sath call karne par `this` naye banne wale object ko refer karta hai.
4. **Arrow functions:** Arrow functions ka apna `this` nahi hota. Yeh apne bahar wale normal function (lexical scope) ke `this` ko copy karte hain.
5. **Explicit binding:** `call`, `apply`, aur `bind` ke zariye hum apni marzi ka `this` pass kar sakte hain.

**Example:**
```javascript
const obj = {
  name: "Ali",
  regularFn: function() {
    console.log(this.name); // "Ali" (Kyunke regular function ka this obj hai)
  },
  arrowFn: () => {
    console.log(this.name); // undefined (Arrow function global scope ka this le raha hai)
  }
};

obj.regularFn();
obj.arrowFn();
```

---

### Q7. `call`, `apply`, aur `bind` mein kya farq hai?
Yeh teenon methods kisi function ke `this` context ko apni marzi se set karne ke liye use hote hain:
* **`call()`**: Function ko foran execute karta hai aur arguments ko comma (`,`) se alag alag leta hai.
* **`apply()`**: Function ko foran execute karta hai aur arguments ko aik **Array** ke roop mein leta hai.
* **`bind()`**: Function ko foran chalata nahi hai balkay aik **naya function return** karta hai jise hum baad mein jab chahein call kar sakte hain.

**Example:**
```javascript
const banda = { name: "Zeeshan" };
function shabaash(tareef, nishaan) {
  console.log(`${tareef}, mera naam ${this.name} hai${nishaan}`);
}

shabaash.call(banda, "Hello", "!"); // Hello, mera naam Zeeshan hai!
shabaash.apply(banda, ["Hi", "."]); // Hi, mera naam Zeeshan hai.

const baadMeinChalao = shabaash.bind(banda, "A Salaam");
baadMeinChalao("?"); // A Salaam, mera naam Zeeshan hai?
```

---

### Q8. Promise kya hai aur iski kaunsi states hoti hain?
Promise JavaScript mein asynchronous operations (jaise API se data lana) ko handle karne ka aik tareeqa hai.
Is ki 3 main states hoti hain:
1. **Pending**: Shuruati state, jab kaam chal raha ho aur faisla na hua ho.
2. **Fulfilled**: Jab asynchronous kaam kamyabi se poora ho jaye (resolve).
3. **Rejected**: Jab kaam fail ho jaye aur koi error aa jaye (reject).

**Example:**
```javascript
const dataLao = new Promise((resolve, reject) => {
  let kamyabi = true;
  if (kamyabi) {
    resolve("Data mil gaya!");
  } else {
    reject("Kaam kharab ho gaya!");
  }
});

dataLao
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
```

---

### Q9. Event Loop kya hai? (Bohat zaroori sawaal)
JavaScript aik **single-threaded** language hai, matlab yeh ek waqt mein sirf ek hi kaam kar sakti hai. Lekin asynchrony (jaise timers aur API calls) ko handle karne ke liye Event Loop kaam aata hai.

**Event Loop ka flow:**
1. **Call Stack**: Jo code chal raha hai woh stack mein jata hai aur line-by-line execute hota hai.
2. **Web APIs**: Asynchronous kaam (jaise `setTimeout` ya fetching) Browser/Node ko de diye jaate hain.
3. **Callback Queue (Task Queue)**: Web API jab apna kaam khatam kar leti hai, to callback function ko is line mein khara kar deti hai.
4. **Microtask Queue**: Promises ke callbacks (`.then`) yahan aate hain. In ki priority Normal Callback Queue se zyada hoti hai.
5. **Event Loop**: Yeh dekhta rehta hai ke jab **Call Stack khali** ho jaye, to pehle Microtask Queue ke saare tasks ko chalaye, aur phir Callback Queue se aik aik kar ke task Stack mein bheje.

**Output Example:**
```javascript
console.log("Pehle");

setTimeout(() => {
  console.log("Timer"); // Callback Queue
}, 0);

Promise.resolve().then(() => {
  console.log("Promise"); // Microtask Queue
});

console.log("Aakhri");

// Output Order:
// Pehle
// Aakhri
// Promise
// Timer
```

---

## 3. Advanced & Performance Concepts (Mushkil Sawaalat)

### Q10. Prototype Inheritance kya hai?
JavaScript mein har object ke paas ek chuphi hui property hoti hai jise **Prototype** kehte hain. Jab aap kisi object ki aisi property ya method ko access karne ki koshish karte hain jo us mein majood nahi hai, to JS automatically us ke prototype mein check karta hai. Is tarah se bani chain ko **Prototype Chain** kehte hain.

**Example:**
```javascript
const abbaObject = {
  ameer: true,
  gaari() {
    console.log("Baraa gaadi");
  }
};

const betaObject = Object.create(abbaObject);
betaObject.khilona = true;

console.log(betaObject.ameer); // true (Baap ke object se inherit hua)
betaObject.gaari();            // "Baraa gaadi" (Baap ka method chala)
```

---

### Q11. Debouncing aur Throttling mein kya farq hai?
Dono techniques performance behtar banane ke liye functions ke execution rate ko control karti hain.

* **Debouncing**: Jab tak user lagataar event fire kar raha hai (jaise search bar mein type karna), tab tak function nahi chalega. Function tabhi chalega jab user type karna band karega aur aik specific time (jaise 300ms) guzar jayega.
* **Throttling**: Har thori dair baad (jaise har 500ms mein ek baar) function ko execute hone deta hai, chahe user kitni hi dafa click ya scroll kyun na kare (jaise scroll ya resize events).

**Debounce Implementation (Simple):**
```javascript
function debounce(func, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
```

---

### Q12. Generators kya hote hain?
Generators aese special functions hote hain jinhein beech mein **pause** kiya ja sakta hai aur baad mein wahin se **resume** kiya ja sakta hai. Inhein define karne ke liye `function*` aur value bahar bhejne/pause karne ke liye `yield` ka istemaal hota hai.

**Example:**
```javascript
function* gintiGano() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = gintiGano();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }
```

---

## 4. Coding & Output-based Questions (Code aur Output wale Sawaalat)

### Sawaal 1: Loops ke andar setTimeout aur var
**Sawaal:** Is code ka output kya hoga aur ise sahi kaise karenge?
```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}
```
**Jawaab:**
Output hoga `3, 3, 3` (ek second ke baad).
Wajah yeh hai ke `var` function scope hota hai aur poore loop ke liye aik hi `i` variable share hota hai. Jab tak 1 second hota hai, tab tak loop khatam ho chuka hota hai aur `i` ki value `3` ban chuki hoti hai.

**Solution 1 (Block Scope - let use karein):**
```javascript
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000); // Output: 0, 1, 2 (Kyunke let har baar naya scope banata hai)
}
```

---

### Sawaal 2: Object key overwriting
**Sawaal:** Is code ka output kya hoga?
```javascript
const a = {};
const b = { key: 'b' };
const c = { key: 'c' };

a[b] = 123;
a[c] = 456;

console.log(a[b]);
```
**Jawaab:**
Output hoga `456`.
JavaScript mein jab aap kisi object ko kisi doosre object ki key banate hain, to woh convert ho kar string ban jata hai. Kisi bhi standard object ki string value `"[object Object]"` hoti hai.
Is liye, `a[b]` asalat mein `a["[object Object]"] = 123` ban gaya. Aur `a[c]` ne bhi wahi key override kar ke use `456` kar diya.

---

### Sawaal 3: Deep Clone kaise banate hain?
**Sawaal:** Kisi object ki mukammal copy (deep clone) kaise banate hain taake nested items ka reference purane object se khatam ho jaye?
**Jawaab:**
* **Shallow Copy (Faqat upar se copy):** `const copy = { ...original };` (Nested objects aapas mein references share karenge).
* **Modern Standard API:** `const copy = structuredClone(original);` (Yeh modern browser aur Node.js mein deep clone karne ka default tareeqa hai).

Agar interview mein custom implementation puchi jaye:
```javascript
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item));
  }
  
  const clone = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key]);
    }
  }
  return clone;
}
```

---

## 5. Interview Tips & Best Practices (Kuch Khaas Mashware)

1. **Think Aloud (Bol kar samjhein):** Jab interviewer aap ko koi coding problem de, to chup reh kar code na likhein. Unhein bataein ke aap kya soch rahe hain aur kaise solution ki taraf barh rahe hain.
2. **Asynchronous JS par pakar mazboot karein:** 90% JavaScript interviews mein Output questions Event Loop, Promises, aur `setTimeout` par hi hote hain. In ki achi practice karein.
3. **Polyfills seekhein:** Interviewer aksar keh sakte hain ke `.map()`, `.filter()`, ya `.reduce()` ka apna custom function (polyfill) likh kar dikhaein.
4. **Ghabraein nahi:** Agar koi sawaal nahi aata, to saaf keh dein ke "Mujhe is ka abhi andaza nahi hai, lekin main seekh sakta hoon". Interviewer aap ka confidence aur problem-solving attitude dekhta hai.

**Allah behtar karega. Hosla rakhein aur dil laga kar tayari karein! Aap ko zaroor achi job milegi! 🌟**
