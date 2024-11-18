const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post('/api/news-summary', async (req, res) => {
    try {
        const { keyword } = req.body;
        console.log('Request keyword:', keyword);

        const response = await axios.post('https://7h3wocckd7.execute-api.ap-south-1.amazonaws.com/news_summary', {
            category: keyword.toLowerCase()
        });

        const data = response.data.body ? JSON.parse(response.data.body) : response.data;
        
        console.log('AWS API Response:', data);
        
        res.json(data);
    } catch (error) {
        console.error('API Error Details:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        res.status(500).json({ error: 'Error fetching news summary' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 