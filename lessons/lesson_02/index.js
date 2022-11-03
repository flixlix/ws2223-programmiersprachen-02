/* console.log("Hello World!");

const users = [
    {
        id: 1,
        name: "Michie",
        age: 12,
        country: "USA",
    },
    {
        id: 2,
        name: "Simon",
        age: 21,
        country: "USA",
    },
    {
        id: 3,
        name: "Peter",
        age: 25,
        country: "Germany",
    },
    {
        id: 4,
        name: "Jeanny",
        age: 18,
        country: "Russia",
    }
]


// for-loop
for (let i = 0; i < users.length; i++) {
    if (users[i].age >= 21) {
        console.log(users[i].name, "is old enough to drink and is", users[i].age, "years old");
    } else {
        console.log(users[i].name, "is not old enough to drink and is", users[i].age, "years old");
    }

    users[i].age >= 18
        ? console.log(users[i].name, "is an adult")
        : console.log(users[i].name, "is not an adult")
}


// arrow function - single function
users.forEach((user) => {
    user.age >= 18
        ? console.log(user.name, "is an adult")
        : console.log(user.name, "is not an adult");
});


// arrow function - call other function
users.forEach(callbackFn);
function callbackFn(user) {
    user.age >= 18
        ? console.log(user.name, "is an adult")
        : console.log(user.name, "is not an adult");
};


// filter function
function filterTooYoungUsers(user) {
    console.log(user.name, "is older than 18", user.age > 18);
    if (user.age >= 16 && user.country === "Germany") {
        return true;
    } else if (user.age >= 21 && user.country === "USA") {
        return true;
    }
    switch (user.country) {
        case "USA":
            if (user.age >= 16) {
                return true;
            }
            break;
        case "Germany":
            if (user.age >= 16) {
                return true;
            }
            break;
        case "Russia":
            if (user.age >= 18) {
                return true;
            }
            break;
    }
    return false;
}

const oldEnoughUsers = users.filter(filterTooYoungUsers);

const newOldEnoughUsers = users.filter((user) =>
    user.age >= 16 && user.country === "Germany" || user.age >= 21 && user.country === "USA" || user.age >= 18 && user.country === "Russia"
);

const shortOldEnoughUsers = users.filter((user) => {
    if(user.country === "Germany") return user.age >= 16;
    if(user.country === "USA") return user.age >= 21;
    if(user.country === "Russia") return user.age >= 18;
});

console.log("These users from different countries are old enough:",oldEnoughUsers);
console.log(newOldEnoughUsers);
console.log(shortOldEnoughUsers);



const axios = require('axios').default;

// Make a request for a user with a given ID
axios.get('/user?ID=12345')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });

// Optionally the request above could also be done as
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {
    // always executed
  });

// Want to use async/await? Add the `async` keyword to your outer function/method.
async function getUser() {
  try {
    const response = await axios.get('/user?ID=12345');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
} */

const axios = require("axios");
/* 
axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
    console.log(response.data)
}).catch((error) => {
    console.log(error)
}).finally(() => {
    console.log("Finally")
}) */

/* async function fetchData() {

    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        // console.log(response.data);
        const users = response.data;

        const emails = users.map((user) => user.email);
        console.log("emails", emails, "emails")
    }
    catch {
        console.log(error);
    }
}

fetchData(); */


async function fetchDataTodos() {

    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');

        /* console.log(response.data); */
        const todos = response.data;

        /* create array of todos that are completed */
        const completedTodos = todos.filter((todo) =>
            todo.completed
        );

        /* create array of todos that are not completed */
        const uncompletedTodos = todos.filter((todo) =>
            !todo.completed
        );

        /* create array of todos belonging to userId number 4 */
        const todosUserFour = todos.filter((todo) =>
            todo.userId === 4
        )

        /* create array of completed todos belonging to userId 3 */
        /* there are two variants, both variants return the same array */

        /* this variant filters out the array that already filtered all completed todos */
        const completedTodosUserThreeVariantOne = completedTodos.filter((todo) =>
            todo.userId === 3
        )
        /* this variant filters out the original array and uses two conditions */
        const completedTodosUserThreeVariantTwo = todos.filter((todo) =>
            todo.userId === 3 && todo.completed
        )


        /* console.log("completed todos", completedTodos, "completed todos");
        console.log("uncompleted todos", uncompletedTodos, "uncompleted todos");
        console.log("Todos of user id 4", todosUserFour, "Todos of user id 4");
        console.log("Completed Todos of user id 3", completedTodosUserThreeVariantOne, "Completed Todos of user id 3");
        console.log("Amount of completed todos", completedTodos.length);
        console.log("Amount of uncompleted todos", uncompletedTodos.length);
        console.log("Amount of todos assigned to userId 4", todosUserFour.length);
        console.log("Amount of completed todos assigned to userId 3", completedTodosUserThreeVariantOne.length); */
    }
    catch {
        console.log(error);
    }
}

/* fetchDataTodos(); */

async function fetchLocalData() {
    try {
        const response = await axios.get('http://127.0.0.1:5555/lessons/lesson_02/todos.json');
        /* console.log(response.data); */
        const todos = response.data;


        const completedTodosWithMap = todos.map((todo) => {
            if(todo.completed) return todo
        }
        );
        /* create array of todos that are completed */
        const completedTodos = todos.filter((todo) =>
            todo.completed
        );

        /* create array of todos that are not completed */
        const uncompletedTodos = todos.filter((todo) =>
            !todo.completed
        );

        /* create array of todos belonging to userId number 4 */
        const todosUserFour = todos.filter((todo) =>
            todo.userId === 4
        )

        /* create array of completed todos belonging to userId 3 */
        /* there are two variants, both variants return the same array */

        /* this variant filters out the array that already filtered all completed todos */
        const completedTodosUserFourVariantOne = completedTodos.filter((todo) =>
            todo.userId === 4
        )
        /* this variant filters out the original array and uses two conditions */
        const completedTodosUserFourVariantTwo = todos.filter((todo) =>
            todo.userId === 4 && todo.completed
        )
        console.log("completed todos", completedTodosWithMap, "completed todos");
        console.log("completed todos", completedTodos, "completed todos");
        console.log("uncompleted todos", uncompletedTodos, "uncompleted todos");
        console.log("Todos of user id 4", todosUserFour, "Todos of user id 4");
        console.log("Completed Todos of user id 3", completedTodosUserFourVariantOne, "Completed Todos of user id 3");
        console.log("Amount of completed todos", completedTodos.length);
        console.log("Amount of uncompleted todos", uncompletedTodos.length);
        console.log("Amount of todos assigned to userId 4", todosUserFour.length);
        console.log("Amount of completed todos assigned to userId 4", completedTodosUserFourVariantTwo.length);
    }
    catch (error) {
        console.log(error)
    }
    finally {
        console.log("Task completed")
    }
}

fetchLocalData();