<?php
// OG proxy — serves article Open Graph tags under rpisvr.edu.kh domain
// URL pattern: /og/article/{id}
// Nginx rewrites this path here; PHP reads the ID from REQUEST_URI

$uri = $_SERVER['REQUEST_URI'] ?? '';
preg_match('/\/og\/article\/(\d+)/', $uri, $m);
$id = isset($m[1]) ? intval($m[1]) : 0;

$frontendBase = 'https://rpisvr.edu.kh';
$backendApi   = 'https://phplaravel-1634699-6478817.cloudwaysapps.com/api/articles/';
$storageBase  = 'https://phplaravel-1634699-6478817.cloudwaysapps.com/storage/';

if (!$id) {
    header("Location: {$frontendBase}");
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
    header("Location: {$frontendBase}");
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
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:url"         content="<?= $url ?>">
    <meta property="og:site_name"   content="វិទ្យាស្ថានបច្ចេកទេសសស្វាយរៀង">
    <meta name="description"        content="<?= $description ?>">
    <script>window.location.replace('<?= addslashes($url) ?>');</script>
</head>
<body><a href="<?= $url ?>"><?= $title ?></a></body>
</html>
