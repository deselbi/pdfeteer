const puppeteer = require('puppeteer');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/render', async (req, res) => {
	const { html } = req.body;

	if (!html) {
		return res.status(400).send('HTML content is required');
	}

	try {
		const browser = await puppeteer.launch({
			args: ['--no-sandbox', '--disable-setuid-sandbox']
		});
		const page = await browser.newPage();
		await page.setContent(html, { waitUntil: 'networkidle0' });
		const pdf = await page.pdf({ format: 'A4' });

		await browser.close();

		res.contentType("application/pdf");
		res.send(pdf);
	} catch (error) {
		res.status(500).send(error.toString());
	}
});

app.listen(port, () => {
	console.log(`Puppeteer server listening at http://localhost:${port}`);
});
