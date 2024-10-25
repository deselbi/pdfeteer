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

		// Set the viewport to a higher resolution
		// see: https://pptr.dev/api/puppeteer.viewport
		await page.setViewport({
			width: 3024,
			height: 1964,
			deviceScaleFactor: 2, // Increase scale factor for higher detail
		});

		await page.setContent(html, { waitUntil: 'networkidle0' });
		/*
				see: https://pptr.dev/api/puppeteer.page.pdf
				const pdf = await page.pdf({
					path: 'full-options.pdf',           // Output file path
					format: 'A4',                       // Paper format (overrides width and height)
					width: '8.5in',                     // Custom page width (ignored if format is set)
					height: '11in',                     // Custom page height (ignored if format is set)
					scale: 0.75,                        // Scale the webpage content (0.1 to 2.0)
					displayHeaderFooter: true,          // Show header and footer
					headerTemplate: `<div style="font-size:10px; text-align:center; width:100%;">Header - Title of the PDF</div>`,
					footerTemplate: `<div style="font-size:10px; text-align:center; width:100%;">
												Page <span class="pageNumber"></span> of <span class="totalPages"></span>
											</div>`,           // Custom footer content with page numbers
					printBackground: true,              // Print background graphics (CSS background colors/images)
					landscape: true,                    // Print in landscape orientation
					pageRanges: '1-3',                  // Specify page range to print (e.g., '1-3', '2', '3-5')
					margin: {                           // Custom margins for the PDF
						top: '1in',
						bottom: '1in',
						left: '0.5in',
						right: '0.5in'
					},
					preferCSSPageSize: true,            // Whether to use CSS-defined @page size
					omitBackground: false,              // Whether to omit background (false = print it)
					timeout: 30000                      // Timeout for rendering the PDF (in milliseconds)

				});
		*/

		// Default options
		let defaultOptions = {
			printBackground: true,
			preferCSSPageSize: true,
			scale: 1,
			width: '8.26in',                     // Custom page width (ignored if format is set)
			height: '11.69in'                    // Custom page height (ignored if format is set)
		};

		// Query string options
		let queryOptions = req.query;

		// Convert boolean parameters
		const booleanParams = ['preferCSSPageSize', 'displayHeaderFooter', 'printBackground', 'landscape', 'omitBackground'];
		booleanParams.forEach(param => {
			if (queryOptions[param] !== undefined) {
				queryOptions[param] = queryOptions[param] === 'true';
			}
		});
		// Convert integer parameters
		const integerParams = ['timeout'];
		integerParams.forEach(param => {
			if (queryOptions[param] !== undefined) {
				queryOptions[param] = parseInt(queryOptions[param], 10);
			}
		});

		// Convert number parameters
		const numberParams = ['scale'];
		numberParams.forEach(param => {
			if (queryOptions[param] !== undefined) {
				queryOptions[param] = parseFloat(queryOptions[param]);
			}
		});

		// Merge query options with default options
		let options = {...defaultOptions, ...queryOptions};
		// Generate PDF
		console.log('options', options);
		const pdf = await page.pdf(options);

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
