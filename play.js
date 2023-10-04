// const productOfNumbers=(a,b)=>a*b;
// console.log(productOfNumbers(5,8));
// const Student={
//     name: 'raju',
//     age:25,
//     greet(){
//         console.log('Hi I am '+this.name);
//     }

// };
// Student.greet();
const array = ['apple', 'oranges' , ' ', 'mango', ' ' , 'lemon'];
const editedArray= array.map(fruits=>{
    if(fruits===' ')
    {
        return 'empty string'
    }
    else{
        return fruits;
    }
})
console.log(editedArray);
