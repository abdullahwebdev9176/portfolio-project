# React Interview Preparation Guide (Roman Urdu) 🚀

Yeh guide aap ko React ke interview questions ki tayari mein madad karne ke liye banayi gayi hai. Is mein basic se lekar advanced concepts ko Roman Urdu explanations aur clean code snippets ke sath explain kiya gaya hai.

---

## Table of Contents
1. [Basic Concepts (Bunyaadi Sawaalat)](#1-basic-concepts-bunyaadi-sawaalat)
2. [React Hooks (Sab se Important Hooks)](#2-react-hooks-sab-se-important-hooks)
3. [Advanced Concepts (Mushkil aur Architecture Sawaalat)](#3-advanced-concepts-mushkil-aur-architecture-sawaalat)
4. [Common Coding / Scenario-based Sawaalat](#4-common-coding--scenario-based-sawaalat)
5. [React Performance & Optimization Tips](#5-react-performance--optimization-tips)

---

## 1. Basic Concepts (Bunyaadi Sawaalat)

### Q1. React kya hai aur yeh baqi frameworks se kaise alag hai?
React Facebook ki banayi hui aik open-source JavaScript library hai jo **User Interfaces (UIs)** banane ke liye use hoti hai (khususan Single Page Applications - SPAs ke liye).
* **Library vs Framework**: Angular ya Vue ke mukable React aik **library** hai framework nahi. Matlab yeh sirf View layer ko control karti hai, routing ya state-management ke liye hume teesri party ki libraries (jaise React Router ya Redux) use karni parti hain.
* **Component-Based**: React mein har cheez aik chota aur reusable piece hoti hai jise Component kehte hain.
* **Virtual DOM**: React page ko reload kiye bina website ko fast update karne ke liye Virtual DOM ka use karti hai.

---

### Q2. Virtual DOM kya hai aur yeh kaise kaam karta hai?
Real DOM (Document Object Model) ko direct update karna kafi slow hota hai kyunke browser ko poora page re-render karna parta hai. React is problem ko **Virtual DOM** se hal karti hai:
1. **Copy banana**: Jab bhi state ya props change hote hain, React poore UI ki aik copy memory mein banata hai jise Virtual DOM kehte hain.
2. **Reconciliation (Diffing)**: React purane Virtual DOM ko naye Virtual DOM se compare karta hai taake pata lag sake ke kahan tabdeeli aayi hai. Is algorithm ko **Diffing Algorithm** kehte hain.
3. **Batch Update (Patching)**: React sirf aur sirf us specific change ko Real DOM mein update karta hai, jis se performance boht fast ho jati hai.

---

### Q3. State aur Props mein kya farq hai?
| Feature | Props (Properties) | State |
| :--- | :--- | :--- |
| **Kya hai?** | Data jo parent component se child ko pass kiya jaye. | Component ka apna internal data storage. |
| **Mutability** | Immutable (Read-only, child isko change nahi kar sakta). | Mutable (Component isko component ke andar hi change kar sakta hai). |
| **Pass/Use** | Component ke bahar se pass hote hain. | Component ke andar hi create aur manage hoti hai. |
| **Trigger Re-render** | Haan, jab props change hon to component re-render hota hai. | Haan, jab state change ho to component re-render hota hai. |

**Example:**
```jsx
// Props Example
function ChildComponent(props) {
  return <h1>Hello, {props.name}!</h1>; // props.name read-only hai
}

// State Example
import { useState } from 'react';
function Counter() {
  const [count, setCount] = useState(0); // State create ki
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

---

### Q4. JSX kya hai? Kya browser isay direct samajh sakta hai?
JSX ka matlab hai **JavaScript XML**. Yeh hume JavaScript ke andar HTML likhne ki ijazat deta hai.
* **Direct browser execution**: Browser JSX ko nahi samajh sakta.
* **Babel (Compiler)**: Build process ke dauran **Babel** JSX ko normal JavaScript (`React.createElement(...)` calls) mein convert karta hai jise browser aasan se samajh leta hai.

---

## 2. React Hooks (Sab se Important Hooks)

React Hooks class components likhe bina functional components mein state aur lifecycle features use karne ki ijazat dete hain.

### Q5. `useEffect` kya hai aur iski dependency array kaise kaam karti hai?
`useEffect` functional components mein side-effects (jaise data fetch karna, subscription set karna, ya DOM ko manually change karna) perform karne ke liye use hota hai.

**Syntax aur dependency array ke 3 main scenarios:**
1. **Dependency array na dena:**
   ```javascript
   useEffect(() => {
     console.log("Yeh har re-render par chalega!");
   });
   ```
2. **Khali dependency array (`[]`):**
   ```javascript
   useEffect(() => {
     console.log("Yeh sirf pehli dafa chalega (Component Did Mount)!");
   }, []);
   ```
3. **Variables ke sath dependency array (`[count]`):**
   ```javascript
   useEffect(() => {
     console.log("Yeh tabhi chalega jab count change hoga!");
   }, [count]);
   ```

**Cleanup Function (Component Will Unmount):**
Agar aap ne event listener ya subscription lagaya hai, to memory leak se bachne ke liye use clear karna zaroori hai.
```javascript
useEffect(() => {
  const handleResize = () => console.log(window.innerWidth);
  window.addEventListener('resize', handleResize);

  // Cleanup function
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
```

---

### Q6. `useMemo` aur `useCallback` mein kya farq hai?
Dono hooks performance behtar karne aur re-renders ko bachane ke liye use hote hain (Memoization).
* **`useMemo`**: Kisi expensive calculation ke **result (value)** ko cache karta hai.
* **`useCallback`**: Kisi **function definition (reference)** ko cache karta hai, taake child components bina wajah re-render na hon jab unhe parent se functions pass kiye ja rahe hon.

**Example:**
```javascript
import { useMemo, useCallback } from 'react';

// useMemo: Cache value
const computedValue = useMemo(() => {
  return complexCalculation(number);
}, [number]);

// useCallback: Cache function reference
const handleClick = useCallback(() => {
  console.log("Button clicked!");
}, []);
```

---

### Q7. `useRef` kya hai aur iske main use cases kya hain?
`useRef` aik aesa hook hai jo render cycles ke darmiyan kisi mutable value ko persist (yaad) rakhta hai bina kisi re-render ko trigger kiye.
**Main Use Cases:**
1. **DOM elements ko directly access karna** (jaise search box ko focus karna, media playback play/pause karna).
2. **Previous state ki value yaad rakhna**.
3. **Timer references store karna** (`setInterval` ya `setTimeout` ki ID).

**Example (Focus Input):**
```jsx
import { useRef } from 'react';

function SearchInput() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus(); // DOM node ko direct focus kiya
  };

  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Box</button>
    </>
  );
}
```

---

## 3. Advanced Concepts (Mushkil aur Architecture Sawaalat)

### Q8. Props Drilling kya hai aur is se kaise bacha jaye?
Props Drilling tab hoti hai jab hume data ko tree hierarchy mein boht deep bhejna paray. Hamein darmiyan wale saare components mein se data pass karna parta hai, chahe un components ko us data ki zaroorat ho ya na ho.

**Solution:**
1. **Context API**: React ka in-built feature jo dynamic global state banane aur providers/consumers ke zariye direct deep elements ko pass karne ki ijazat deta hai.
2. **Redux / Zustand**: Global state management libraries ka use kar ke state ko global store mein rakhna.
3. **Component Composition**: Child component ko parent mein hi declare kar ke direct props pass kar dena.

---

### Q9. Context API aur Redux mein kya farq hai aur kab kaunsa choose karein?
* **Context API**:
  * React ke sath built-in aata hai (koi extra package install nahi karna parta).
  * Low-frequency updates ke liye behtareen hai (jaise Theme toggle, User profile/auth data).
  * *Masla*: Jab bhi context value change hoti hai, us provider ke under ke saare consumers re-render ho jate hain (agar theek se optimize na kiya jaye).
* **Redux / Zustand**:
  * Ek heavy State Management tool hai.
  * High-frequency dynamic states aur bare complex applications ke liye behtar hai.
  * DevTools aur state trace karne ke features deta hai.

---

### Q10. React Keys kya hain aur in ka array map mein hona kyun zaroori hai?
React ko arrays rendering ke dauran har list item ki unique pehchan ke liye `key` ki zaroorat hoti hai.
* **Kyun zaroori hai?**: Jab array mein koi tabdeeli aati hai (jaise insert, delete, ya reorder), to React keys ke zariye foran pehchan leta hai ke kaun sa element tabdeel hua hai.
* **Index as a key warning**: Array index (`index`) ko key ke tor par tabhi use karein jab list change na honi ho. Agar elements insert/delete ho rahe hon, to index as a key performance issues aur UI bugs la sakta hai (kyunke element delete hone par index shift ho jata hai).

---

## 4. Common Coding / Scenario-based Sawaalat

### Sawaal 1: useEffect mein Infinite Loop
**Sawaal:** Is code mein kya galti hai? Yeh page ko crash kyun kar deta hai aur isay kaise theek karenge?
```javascript
import { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count + 1);
  }); // dependency array miss hai

  return <div>{count}</div>;
}
```
**Jawaab:**
1. **Wajah**: `useEffect` bina dependency array ke har render ke baad chalta hai. Jab component render hota hai, state update hoti hai. State update hone se component dobara render hota hai, jis se `useEffect` dobara chalta hai aur aik infinite loop ban jata hai aur browser crash ho jata hai.
2. **Hal**: Agar hum chahte hain ke count sirf pehli dafa initialize ho to dependency array empty `[]` rakhein, ya koi conditions lagayein.
```javascript
useEffect(() => {
  // logic...
}, []); // dependency array add ki
```

---

### Sawaal 2: Batching aur React State Update Delay
**Sawaal:** Is code ka output kya hoga aur console mein counter value button click par kya dikhegi?
```javascript
const [count, setCount] = useState(0);

const handleIncrement = () => {
  setCount(count + 1);
  console.log(count); // console mein kya show hoga?
};
```
**Jawaab:**
Console mein purani value (`0`) show hogi, `1` nahi.
* **Reason**: State updates asynchronous hoti hain. React immediate variable update nahi karta balkay next render cycle par new value reflect hoti hai.
* **Batching**: React multiple state updates ko aik hi event handler mein batch (ikatha) kar ke chalta hai taake bar bar re-render na hona paray.
* **Sahi value get karne ka tareeqa**: Functional update ya `useEffect` ka use karein.
  ```javascript
  setCount(prevCount => prevCount + 1);
  ```

---

### Sawaal 3: State Object dynamic update
**Sawaal:** Agar mere paas aik user object hai state mein, aur mujhe sirf `age` change karni hai to main kaise karunga?
```javascript
const [user, setUser] = useState({ name: 'Ali', age: 25 });
```
**Galat Tareeqa:** `setUser({ age: 26 })` (Is se `name` delete ho jayega).
**Sahi Tareeqa (Spread Operator):**
```javascript
setUser(prevUser => ({
  ...prevUser, // Purana saara data copy kiya
  age: 26      // Sirf age override ki
}));
```

---

## 5. React Performance & Optimization Tips

1. **`React.memo`**: functional components ko wrap karne ke liye taake agar props change na hon to component re-render na ho.
2. **Lazy Loading (`React.lazy` + `Suspense`)**: Poore app ka bundle size kam karne ke liye routes ya component code ko split karna.
   ```javascript
   const BigComponent = React.lazy(() => import('./BigComponent'));
   ```
3. **Inline functions se bachna**: Render ke andar inline arrow functions likhne se parhez karein (jaise `onClick={() => doSomething()}`), kyunke har render par naya function instance banta hai. Behtar hai `useCallback` ya direct function pass karna.

---

**All the best! Aap ki technical React skills boht jald aap ko aik behtareen job dilwayengi! 🚀**
