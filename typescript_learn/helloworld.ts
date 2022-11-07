let message: string = "Hello World";

const secondMessage = "THis is a second message";
const sayHello = () => console.log(secondMessage);

message = "Hello World 2";
sayHello();
console.log(message);
