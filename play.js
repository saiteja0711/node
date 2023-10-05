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
// const array = ['apple', 'oranges' , ' ', 'mango', ' ' , 'lemon'];
// const editedArray= array.map(fruits=>{
//     if(fruits===' ')
//     {
//         return 'empty string'
//     }
//     else{
//         return fruits;
//     }
// })
// console.log(editedArray);
console.log('a');

console.log('b');

const print=async()=>{
    const print1=new Promise((res,rej)=>{
        setTimeout(() => res('c'), 3000) 
    });
    const print2=new Promise((res,rej)=>{
        setTimeout(() => res('d'), 0) 
    });
 const first=await print1;
 console.log(first);
 const second=await print2;
 console.log(second);
 console.log('e');
}
print();


