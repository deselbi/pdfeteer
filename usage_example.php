<?php

$htmlContent = '<h1>Hello, World!</h1>';

$ch = curl_init('http://localhost:3000/render');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(['html' => $htmlContent]));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
curl_close($ch);

if ($response === false) {
	echo 'Error rendering PDF';
} else {
	header('Content-Type: application/pdf');
	echo $response;
}
