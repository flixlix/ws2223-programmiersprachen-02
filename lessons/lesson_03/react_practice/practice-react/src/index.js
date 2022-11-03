import React from 'react';
import ReactDOM from 'react-dom/client';
import Car from './Car.js';
import Button from '@carbon/react';

const myFirstElement = <h1>Hello React!</h1>

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(myFirstElement);

const myelement = (
    <table>
        <tbody>
            <tr>
                <th>Name</th>
            </tr>
            <tr>
                <td>John</td>
            </tr>
            <tr>
                <td>Elsa</td>
            </tr>
        </tbody>
    </table>
);

const today = new Date();
const timeNow = today.getHours();

const variableElement = <h1>React is {timeNow} times better with JSX</h1>;


const h1Element = <h1>I love JSX!</h1>;

const bigElement = (
    <ul>
        <li>Apples</li>
        <li>Bananas</li>
        <li>Cherries</li>
    </ul>
);


/* only one element */
const oneBigDiv = (
    <div>
        {myelement}
        {variableElement}
        {h1Element}
        {bigElement}
        <p>I am a paragraph too.</p>
    </div>
);

const x = 5;
let text = "Goodbye";
if (x < 10) {
    text = "Hello";
}

const conditionElement = <h1>{text}</h1>;

const conditionELementTernaryExpressions = <h1>{(x < 10) ? x + " is smaller than 10" : x + " is not smaller than 10"}</h1>


const classElement = (
    /* class is already reserved in js, so use className instead */
    <p className='paragraph-class'>This is in a specific class</p>
)


/* Creating a React class component */
/* first letter must be upprcase */
/* class newCar extends React.Component {
    render() {
        return <h2>Hi, I am a new Car!</h2>;
    }
} */

/* Almost the same */
/* function component */
/* easier to reade, less code */
function Bike() {
    return <h2>Hi, I am a Bike!</h2>;
}


/* creating a function component with properties (props) */
function PropsComponent(props) {
    return <h2>I am a {props.size} component!</h2>;
}

/* referring components inside another component */
function Garage() {
    return (
        <>
            <p>Who lives in my Garage?</p>
            <ul>
                <li>
                    <Car brand="Ford" />
                </li>
                <li>
                    <Bike />
                </li>
            </ul>
        </>
    );
}

const fragmentElements = (
    <>
        <Button>Hello world</Button>
        {oneBigDiv}
        {myelement}
        {variableElement}
        {h1Element}
        {bigElement}
        <p>I am a paragraph too.</p>
        {/* empty elements must be closed with the "/" symbol, else there will be an error */}
        <input type="text" />
        {classElement}
        {conditionElement}
        {conditionELementTernaryExpressions}
        <Car brand="Ford" />
        <Bike />
        <PropsComponent size="very short" />
        <Garage />
    </>
);


root.render(fragmentElements);

/* root.render(myelement); */
