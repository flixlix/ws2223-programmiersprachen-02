var message = "Hello World";
var secondMessage = "THis is a second message";
var sayHello = function () { return console.log(secondMessage); };
message = "Hello World 2";
sayHello();
console.log(message);
