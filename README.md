# Ans:1 JavaScript Variables: var, let, const

In JavaScript, there are three ways to declare variables: `var`, `let`, and `const`.  
Here is a quick summary of their differences:

## 1. var
Function-scoped, can be re-declared & updated, hoisted.
## 2. let
Block-scoped, can be updated but cannot be re-declared in same scope.
## 3. const
block-scoped, cannot be updated or re-declared.

---

# Ans:2 the difference between map(), forEach(), and filter()
## 1. forEach()
Loops through an array, executes a function for each element, does not return a new array.
# 2. map()
Loops through an array, applies a function, and returns a new array with transformed values.
# 3. filter()
Loops through an array and returns a new array with only the elements that meet a condition.

---
# Ans:3Arrow Functions (ES6)

Arrow functions are a shorter syntax for writing functions in JavaScript.  
They were introduced in ES6 and make your code cleaner and more concise.

### Key Points
- Use the `=>` syntax  
- Do **not** have their own `this`, they inherit from the surrounding scope  
- Cannot be used as constructors  
- Ideal for small or inline functions

 ---
# Ans:4 Destructuring Assignment (ES6)

Destructuring assignment allows  to **extract values from arrays or objects** and assign them to variables in a concise way.  
This makes your code cleaner and easier to read.
### 1. Array Destructuring




# Ans:5 Template Literals (ES6)

Template literals are a way to create strings in JavaScript using **backticks (`` ` ``)** instead of quotes.  
They allow **interpolation**, **multi-line strings**, and **expressions** directly inside the string
### 1. String Interpolation

```js
const name = "Alice";
const age = 25;
const greeting = `Hello, my name is ${name} and I am ${age} years old.`;
console.log(greeting);







