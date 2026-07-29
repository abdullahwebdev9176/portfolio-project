# Next.js Interview Preparation Guide (Roman Urdu) 🚀

Yeh guide aap ko Next.js ke interview questions ki tayari mein madad karne ke liye banayi gayi hai. Is mein Next.js ke modern features (khususan App Router, Rendering Strategies, aur Optimization) ko Roman Urdu explanations aur code snippets ke sath explain kiya gaya hai.

---

## Table of Contents
1. [Basic Concepts (Bunyaadi Sawaalat)](#1-basic-concepts-bunyaadi-sawaalat)
2. [Rendering Strategies (SSR, SSG, ISR, CSR)](#2-rendering-strategies-ssr-ssg-isr-csr)
3. [App Router & Server/Client Components](#3-app-router--serverclient-components)
4. [Data Fetching & Optimization (Performance & SEO)](#4-data-fetching--optimization-performance--seo)
5. [Common Practical Questions & Scenarios](#5-common-practical-questions--scenarios)

---

## 1. Basic Concepts (Bunyaadi Sawaalat)

### Q1. Next.js kya hai aur yeh React se kaise alag hai?
* **React**: React UI banane ki aik **client-side JavaScript library** hai. React default par CSR (Client-Side Rendering) karti hai, jis ka matlab hai ke browser khali HTML download karta hai aur phir JavaScript ke zariye page build karta hai. Is se SEO aur pehli dafa page load hone ki speed slow ho sakti hai.
* **Next.js**: Next.js React par mabni aik **production-ready framework** hai jo Vercel ne banaya hai. Yeh server-side rendering, routing, optimisations, aur automatic code-splitting out-of-the-box deta hai.
* **Farq**: React mein routing, optimization, aur build configurations khud karni parti hain, jabke Next.js yeh sab pehle se configured deta hai aur SEO-friendly websites banane mein madad karta hai.

---

### Q2. App Router aur Pages Router mein kya farq hai?
Next.js mein routing ke do tareeqe hain:
* **Pages Router (Old)**: Is mein files `pages/` directory ke andar banti hain. Routing file-system par hoti hai (e.g., `pages/about.js` -> `/about`). Yeh default client-side pe React state chalaata tha.
* **App Router (Next.js 13+)**: Yeh `app/` directory ka use karta hai. Is mein React **Server Components (RSC)** aur layouts ka concept introduce kiya gaya hai. Yeh folder structure aur `page.js` ya `layout.js` files par base karta hai (e.g., `app/about/page.js` -> `/about`).

---

## 2. Rendering Strategies (SSR, SSG, ISR, CSR)

Next.js ki sab se bari taqat is ki rendering strategies hain:

### Q3. SSR, SSG, ISR, aur CSR mein kya farq hai?

1. **SSR (Server-Side Rendering)**:
   * **Kaise hota hai?**: Har request par page HTML server par banta hai aur browser ko bheja jata hai.
   * **Kab use karein?**: Jab data bohat dynamic ho aur har user ke liye badalta ho (jaise User Dashboard, Real-time feed).
   * **App Router mein**: API fetch call ke andar `{ cache: 'no-store' }` use kar ke SSR hota hai.

2. **SSG (Static Site Generation)**:
   * **Kaise hota hai?**: Build time par hi saare pages ka HTML ban jata hai aur CDN par store ho jata hai.
   * **Kab use karein?**: Static content ke liye jo zyada change nahi hota (jaise Blog posts, Documentation, Portfolio).
   * **App Router mein**: Default fetch calls `force-cache` karti hain jo SSG ke barabar hai.

3. **ISR (Incremental Static Regeneration)**:
   * **Kaise hota hai?**: Static page ko background mein update karne ki ijazat deta hai bina poori website ko rebuild kiye. Aap aik timer set karte hain (e.g., 60 seconds), aur us time ke baad jab naya user aata hai to page background mein re-render ho jata hai.
   * **Kab use karein?**: Product pages, blogs jo change hote rehte hain lekin dynamic database checks har request par zaroori nahi.
   * **App Router mein**: `fetch('url', { next: { revalidate: 60 } })` use kar ke.

4. **CSR (Client-Side Rendering)**:
   * **Kaise hota hai?**: Page browser mein load hota hai aur client-side JavaScript api call kar ke data render karti hai.
   * **App Router mein**: `'use client'` component ke andar `useEffect` ya `SWR`/`React Query` use kar ke.

---

## 3. App Router & Server/Client Components

### Q4. Server Components aur Client Components mein kya farq hai?
App Router mein saare components by default **React Server Components (RSC)** hote hain jab tak aap file ke top par `'use client'` na likhein.

| Feature | Server Components (Default) | Client Components (`'use client'`) |
| :--- | :--- | :--- |
| **Kahan chalte hain?** | Sirf Server par run hote hain. | Browser mein chalte hain (Server par prerender hone ke baad). |
| **React Hooks** | `useState`, `useEffect`, `useRef` use nahi ho sakte. | Hooks use ho sakte hain. |
| **Browser APIs** | `window`, `document`, `localStorage` use nahi ho sakte. | Browser APIs use ho sakti hain. |
| **Performance** | Bundle size kam hota hai kyunke server code client par nahi jata. | Client bundle size barhta hai. |
| **Direct DB query** | Database aur secure server-side keys direct access ho sakti hain. | Database direct query nahi kar sakte. |

**Example:**
```jsx
// client-component.js
'use client'; // Client Component banane ke liye zaroori hai

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

---

### Q5. Next.js App Router mein Dynamic Routing kaise karte hain?
Dynamic pages banane ke liye folder ke naam ko square brackets `[slug]` mein likha jata hai.

* **Folder Path**: `app/blog/[id]/page.js`
* **URL**: `/blog/123` aur `/blog/hello-world` dono isi page ko chalayenge.
* **Parameters get karna**:
  ```jsx
  export default function BlogPost({ params }) {
    const { id } = params; // params object se dynamic ID mil jayegi
    return <h1>Blog Post ID: {id}</h1>;
  }
  ```

---

## 4. Data Fetching & Optimization (Performance & SEO)

### Q6. Next.js 13+ App Router mein data fetching kaise hoti hai?
Next.js standard `fetch` API ko extend karta hai caching aur revalidation control karne ke liye.

1. **Static Data Fetching (SSG - Cache default)**:
   ```javascript
   // Default behave: response cache ho jata hai build time par
   const res = await fetch('https://api.example.com/data');
   ```
2. **Dynamic Data Fetching (SSR - No Cache)**:
   ```javascript
   // Har request par data refresh hoga
   const res = await fetch('https://api.example.com/data', { cache: 'no-store' });
   ```
3. **Revalidating Data (ISR - Time-based)**:
   ```javascript
   // Har 10 seconds ke baad data update hoga background mein
   const res = await fetch('https://api.example.com/data', { next: { revalidate: 10 } });
   ```

---

### Q7. Next.js image optimization kaise karta hai? (`next/image`)
Normal HTML `<img>` tag render karne se page speed slow ho sakti hai. Next.js ka `<Image />` component auto-optimize karta hai:
1. **Size Optimization**: User ke screen size ke mutabiq sahi size ki image load karta hai.
2. **Format Modernization**: Images ko auto WebP ya AVIF formats mein convert karta hai jo size mein choti hoti hain.
3. **Lazy Loading**: Jo images screen ke neeche hain unhe tabhi load karta hai jab user scroll kar ke wahan pohnche (lazy load).
4. **CLS Avoidance**: Height aur width dynamically reserve rakhta hai taake layout shift na ho (Cumulative Layout Shift se bachaav).

---

## 5. Common Practical Questions & Scenarios

### Sawaal 1: Client Component ke andar React Context ko kaise use karein?
Server Components ke andar React Context directly nahi chal sakta kyunke woh server par render hote hain aur context browser/state base hota hai.

**Solution:**
Aik alag file banayein jo Provider generate kare aur us par `'use client'` likhein:
```jsx
// providers/ThemeProvider.js
'use client';
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
```
Ab isay `layout.js` (Server Component) mein wrap kar dein:
```jsx
// app/layout.js
import { ThemeProvider } from '../providers/ThemeProvider';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

---

### Sawaal 2: Next.js mein custom API endpoints (Backend) kaise banate hain?
App Router mein custom API routes ko **Route Handlers** kehte hain. Yeh `route.js` file ke zariye bante hain.

* **Folder Path**: `app/api/users/route.js`
```javascript
import { NextResponse } from 'next/server';

export async function GET(request) {
  const users = [
    { id: 1, name: 'Ali' },
    { id: 2, name: 'Bilal' }
  ];
  return NextResponse.json(users);
}

export async function POST(request) {
  const body = await request.json();
  // Database save logic here...
  return NextResponse.json({ message: 'User created', data: body }, { status: 201 });
}
```

---

### Sawaal 3: SEO ke liye dynamic metadata kaise set karte hain?
App Router mein metadata static ya dynamic ho sakta hai:

1. **Static Metadata**:
   ```javascript
   export const metadata = {
     title: 'Home Page',
     description: 'Welcome to my website',
   };
   ```
2. **Dynamic Metadata (Dynamic routes ke liye, e.g. `blog/[id]`):**
   ```javascript
   export async function generateMetadata({ params }) {
     const id = params.id;
     // Data fetch karein product/post ka
     const res = await fetch(`https://api.example.com/posts/${id}`);
     const post = await res.json();
     
     return {
       title: post.title,
       description: post.summary,
     };
   }
   ```

---

**Keep pushin'! Next.js modern framework hai aur is ki demand boht high hai. Dil chota na karein, naya interview jald hi clear hoga! 🚀💪**
