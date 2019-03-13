<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

// require '../classes/Category.php';

// require '../vendor/autoload.php';

// $Cat = new Category();

// var_dump($Cat);
// require '../config/db.php';
require '../classes/Category.php';
// $Cat = $onlineCafedb->
// var_dump($Cat);

$Cat->insert(array(
    'categoryName' => 'categoryName88',
));
$Cat->insert(array(
    'categoryName' => 'categoryName77',
));

$app->get('/api/categories', function (Request $req, Response $res) {
    // echo 'categories';
    $cat = new \App\Category();
    var_dump($cat->insertOneCategory('hghgghghg'));
    // $categories = array(0 => ['categoryName' => 'database1', 'id' => '1'],
    //                 1 => ['categoryName' => 'database2', 'id' => '2'],
    //                 2 => ['categoryName' => 'database3', 'id' => '3'],
    //             );
    // print_r($categories);
    // $categories = json_encode($categories);
    // print_r($categories);

    // $res->cat = $categories;
    // $res->getBody()->write($categories);
});

//Create new category
$app->post('/api/categories', function (Request $req, Response $res) {
    $body = json_decode($req->getBody());

    // $body = json_encode($body);
    $categoryName = $body->categoryName;

    $categoryName = json_encode($categoryName);
    // header('{"msg":"Success"}');
    // echo '{'.$body.'}';
    echo ' [{"category":'.$categoryName.'}]';
});
// update category
$app->put('/api/categories/{name}', function (Request $req, Response $res) {
});
// delete category
$app->delete('/api/categories/{name}', function (Request $req, Response $res) {
});
