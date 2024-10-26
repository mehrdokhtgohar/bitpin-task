# Bitpin Task

This is a two-page React application based on the provided task, built with `Vite`, `TypeScript`, and `Sass` for styling. It provides an overview of a list of cryptocurrencies in two different base currencies, with detailed `buy`, `sell`, and `trade` information for each market. The tabs feature is implemented using `Material UI` for responsive design. Additionally, the app supports light and dark `themes`, data refreshes every 3 seconds on the Market Detail page, and offers multilingual support through `i18n` and `useTranslation`.

## Features

1.  Crypto List Page
    Displays a list of cryptocurrencies with two base currencies.
2.  Market Detail Page
    Consists of three main tabs: Buy, Sell, and Trade. Each tab displays specific information:

    ` Buy and Sell Tabs`:

    - Shows the total price being bought or sold.
    - Displays an average weighted price for transactions.
    - Users can enter a percentage to view:
    - Total amount to pay.
    - Average price.
    - Sum of remaining items.

3.  Swipable Tabs
    - Tabs can be swiped for easier navigation using react-swipeable.
4.  Light and Dark Mode

    - Supports both light and dark modes for a better user experience in various lighting conditions.

5.  Trade Tab:
    - Presents comprehensive market details.
    - Data automatically refreshes every 3 seconds for real-time updates on market data.

## Tech Stack

`React`: Core UI framework.
`Vite`: Optimized build tool.
`Sass`: Styling solution for modular and maintainable CSS.
`React Query`: API data fetching, caching, and periodic refreshing.
`React Swipeable`: Enables swipe functionality for the tabs.

## Installation

1. Clone the repository:

```javascript
git clone https://github.com/mehrdokhtgohar/bitpin-task.git
cd bitpin-task
```

2. Install dependencies:

```javascript
yarn install
```

3. Start the development server:

```javascript
yarn run dev
```

## Project Structure

```plaintext
bitpin-task/
├── src/
│   ├── api/
│   │   ├── hooks/
│   │   └── types/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   ├── translations/
│   │   └── locales/
│   │       └── fa.json
│   ├── utils/
│   └── main.tsx
├── index.html
├── package.json
└── vite.config.ts

```

## Usage

Once the server is running, navigate to http://localhost:5173 to view the application. You can switch between light and dark mode via the theme toggle, swipe between tabs for each market's details, and observe real-time updates every 3 seconds in the Market Detail page.
