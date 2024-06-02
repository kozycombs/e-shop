<h3 align="center">E-Shop App</h3>

<br />
<br />

<!-- TABLE OF CONTENTS -->
<details>
    <summary>Table of Contents</summary>
    <ol>
        <li>
            <a href="#about-e-shop">About E-Shop</a>
            <ul>
                <li><a href="#created-with">Created With</a></li>
                <li><a href="#api-integration">Api Integration</a></li>
            </ul>
        </li>
        <li>
            <a href="#getting-started">Getting Started</a>
            <ul>
                <li><a href="#prerequisites">Prerequisites</a></li>
                <li><a href="#installation">Installation</a></li>
                <li><a href="#run-the-app">Run the app</a></li>
                <li><a href="#how-to-test">How to test</a></li>
            </ul>
        </li>
        <li><a href="#design-decision">Design decision</a></li>
        <li><a href="#project-architecture">Project Architecture</a></li>
        <li><a href="#application-structure">Application Structure</a></li>
        <li><a href="#possible-improvements">Possible Improvements</a></li>
        <li><a href="#license">License</a></li>
    </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About E-Shop

E-Shop is a simple ecommerce web application where customers can buy a range of items.

Our range of products are specially sourced to ensure quality is at the forefront of what we sell.

To use this web application, a customer can browse the list of products displayed on the home page.

When they select a product, they will be redirect to the product detail page where they can select a quantity and add to the product to their shopping cart.

The shopping cart page shows a summary of the items added to the shopping cart and a cart total, If there are no items in the shopping cart a message will be displayed to the customer accordingly.

The customer can click on the Place your order button to confirm their order.

### Created with

This project was created with the stack below:

- Nodejs
- NPM
- HTML
- CSS
- Javascript
- React
- React Redux
- Redux toolkit
- Typescript
- Material UI
- TailwindCSS
- Jest
- React Testing Library
- ESLint
- Git
- Visual studio code

### API Integration

This web app integrates with a REST API from https://fakestoreapi.com for development purposes.

## Getting Started

To run this project locally on your machine please follow the instructions below

### Prerequisites

- node from version 18
- npm

```sh
  npm install npm@latest -g
```

### Installation

Clone the repo

```sh
git clone https://github.com/kozycombs/e-shop.git
```

Install NPM packages

```sh
   npm install
```

### Run the app

Start the development server

```sh
   npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Run unit tests

```sh
   npm run test
```

## Design Decision

The design decision made is purely user focused to create a clean and simple responsive design which will enable customers to easily access each product, add to their shopping cart, review their cart and checkout on any viewport. Material UI was used as it provides ready to use components that are customisable to suit the project and have been fully tested for accessibility.

## Project Architecture

For this project a monolithic architecture is used due to the size of the application and the timeframe to complete the application.
A micro frontend architecture could be considered for future improvement and as the application grows.
This will require creating separate React applications for each feature of the ecommerce application e.g

- Product catalog and search functionlity,
- Shopping cart and checkout functionality including payment gateway,
- User authentication, account and order management functionality etc.

## Application structure

```
Project
├── node_modules
├── public
├── src
│   ├── components: Reusable components across all parts of the application.
│   ├── constants: Constant variables defined in a single location to be used across the application for easy future modifications.
│   ├── hooks: Reusable pure functions which has access to reacts life cycle events. Used to share logic where and ordinary function will not suffice.
│   ├── interface: For static type checking
│   ├── scenes: Represent the pages for each routes in the application
│   ├── store: Redux store for global state management, saving data in memory for reuse across the application.
│   ├── App.css
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── index.tsx
│   ├── logo.svg
│   ├── react-app-env.d.ts
│   ├── setupTests.ts
├── .gitignore
├── .eslint.config.mjs
├── package-lock.json
├── package.json
├── README.md
├── tailwind.config.js
├── tsconfig.json
```

## Possible Improvements

The features listed below will further improve on the user experience on this application.

- Search functionality to quickly find the products they want
- Product filter functionality to narrow down their search which will also improve on the time time it take to find what the customer wants.
- Add pagination functionality to product list page
- Add a more comprehensive menu system with categories
- Add Featured products to the home page to advertise new range of products and possibly seasonal products
- Add authentication, account and order management functionality
- Add more functionality to the shopping cart page to update and remove items from the cart and persist the shopping cart data.
- Add payment gateway to collect payment and complete the order
- Expand on the UI to make it more visually appealing
- Add more unit and integration tests cases

## License

This project is licensed under the MIT License - see the
[LICENSE.md](LICENSE.md) file for details
