const express = require('express');
const bodyParser = require('body-parser');
const { parse } = require('@postlight/parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/parse', async (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    let newsDetails = await getNewsDetails(url);

    // If we got a response but we couldn't parse the title, try again with a different user agent
    // in case we're getting blocked
    if(newsDetails != null && newsDetails.title == null) {
        await sleep(5);
        newsDetails = await getNewsDetails(url);
    }
    if (newsDetails === null) {
        return res.status(500).json({ error: 'Failed to parse the URL' });
    } else {
        res.json(newsDetails);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const getNewsDetails = async (url) => {
    const userAgentCollection = [
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Linux; Android 13; SM-G991U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:123.0) Gecko/20100101 Firefox/123.0",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Version/17.0 Safari/537.36",
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/537.36"
    ]

    const randomUserAgent = userAgentCollection[Math.floor(Math.random() * userAgentCollection.length)];

    try {
        const result = await parse(url, {
            headers: {
            'User-Agent': randomUserAgent,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Referrer': 'https://www.google.com',
            'Connection': 'keep-alive',
            }});
        return result;
    } catch (error) {
        console.error('Error parsing URL:', error);
        return null;
    }
}

const sleep = (seconds) => {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}