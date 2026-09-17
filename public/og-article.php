<?php
// OG proxy — serves article Open Graph tags under rpisvr.edu.kh domain
// Every request to /article/{id} is internally rewritten here (see Cloudways Web Rules,
// which has no User-Agent condition), so bot detection happens here instead:
// - social bots get the article-specific OG tags
// - real browsers get passed straight through to the SPA shell, unchanged

// Prevent Varnish / proxy caches from storing this dynamic page
header('Cache-Control: no-store, no-cache, must-revalidate');
header('Pragma: no-cache');

$ua = $_SERVER['HTTP_USER_AGENT'] ?? '';
$isBot = preg_match('/facebookexternalhit|Facebot|Twitterbot|LinkedInBot|TelegramBot|Slackbot|WhatsApp|Pinterest|ia_archiver/i', $ua);

if (!$isBot) {
    readfile(__DIR__ . '/index.html');
    exit;
}

// Try ?id= query param first, then fall back to parsing the URI
$id = intval($_GET['id'] ?? 0);
if (!$id) {
    $uri = $_SERVER['REQUEST_URI'] ?? '';
    preg_match('/(\d+)/', $uri, $m);
    $id = intval($m[1] ?? 0);
}

$frontendBase = 'https://rpisvr.edu.kh';
$backendApi   = 'https://phplaravel-1634699-6478817.cloudwaysapps.com/api/articles/';
$storageBase  = 'https://phplaravel-1634699-6478817.cloudwaysapps.com/storage/';

if (!$id) {
    readfile(__DIR__ . '/index.html');
    exit;
}

// Fetch article data from backend API
$ch = curl_init("{$backendApi}{$id}");
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 5,
    CURLOPT_SSL_VERIFYPEER => false,
]);
$json     = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$article = ($httpCode === 200 && $json) ? json_decode($json, true) : null;

if (!$article) {
    readfile(__DIR__ . '/index.html');
    exit;
}

$title       = htmlspecialchars($article['title'] ?? '', ENT_QUOTES, 'UTF-8');
$content     = strip_tags($article['content'] ?? '');
$description = htmlspecialchars(mb_substr($content, 0, 200), ENT_QUOTES, 'UTF-8');
$url         = $frontendBase . '/article/' . $id;

if (!empty($article['thumbnail'])) {
    $image = $storageBase . $article['thumbnail'];
} elseif (!empty($article['images'][0]['image_path'])) {
    $image = $storageBase . $article['images'][0]['image_path'];
} else {
    $image = $frontendBase . '/images/PRIT.png';
}
?>
<!DOCTYPE html>
<html lang="km">
<head>
    <meta charset="utf-8">
    <title><?= $title ?></title>
    <meta property="og:type"        content="article">
    <meta property="og:title"       content="<?= $title ?>">
    <meta property="og:description" content="<?= $description ?>">
    <meta property="og:image"       content="<?= $image ?>">
    <meta property="og:site_name"   content="វិទ្យាស្ថានពហុបច្ចេកទេសភូមិភាគតេជោសែនស្វាយរៀង">
    <meta name="twitter:card"       content="summary_large_image">
    <meta name="twitter:title"      content="<?= $title ?>">
    <meta name="twitter:description" content="<?= $description ?>">
    <meta name="twitter:image"      content="<?= $image ?>">
    <meta name="description"        content="<?= $description ?>">
</head>
<body><a href="<?= $url ?>"><?= $title ?></a></body>
</html>
