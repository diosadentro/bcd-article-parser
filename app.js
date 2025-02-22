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

    try {
        const result = await parse(url, {
            headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Referrer': 'https://www.google.com',
            'Connection': 'keep-alive',
            }});

        res.json(result);
    } catch (error) {
        console.error('Error parsing URL:', error);
        res.status(500).json({ error: 'Failed to parse the URL' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});