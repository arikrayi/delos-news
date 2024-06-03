# Delos News
A news website that uses the [NYTimes API](https://api.nytimes.com) to fetch news articles.

## Getting Started
1. Clone the repository
2. Run `yarn` to install the dependencies
3. Create a `.env` file in the root directory and add the following:
    ```env
    NEXT_PUBLIC_NYTIMES_API_KEY=YOUR_API_KEY
    ```
    Replace `YOUR_API_KEY` with your NYTimes API key which you can get [here](https://developer.nytimes.com/get-started)
4. Run `yarn dev` to start the development server and navigate to `http://localhost:3000` (or the port specified in the terminal) to view the website
5. Or you can view the deployed website [here](https://delos-news-three.vercel.app)

## Pages
- `/` - Home page - Displays the news articles available to buy
- `my-articles` - My Articles page - Displays the articles that the user has bought
- `get-lucky` - Get Lucky page - A lucky draw page where the user can win a free coins