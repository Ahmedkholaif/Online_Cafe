<?php

require '../vendor/autoload.php';
// require_once '../config/db.php';

// use Psr\Http\Message\ServerRequestInterface as Request;
// use Psr\Http\Message\ResponseInterface as Response;

$client = new MongoDB\Client();

var_dump($client);
$collection = $client->demo->beers;

// var_dump($collection);
// var_dump(['name' => 'Hinterland', 'brewery' => 'BrewDog']);
$result = $collection->insertOne(['name' => 'Hinterland', 'brewery' => 'BrewDog']);

var_dump($result);
echo "Inserted with Object ID '{$result->getInsertedId()}'";

// require '../classes/Category.php';
// $app = new \Slim\App();

// $app->get('/hello/{name}', function (Request $request, Response $response) {
//     $name = $request->getAttribute('name');

//     $response->getBody()->write("hello, $name");

//     return $response;
// });

// $app->get('/', function (Request $req, Response $res) {
//     echo 'Login API';
// });

// //users routes
// require '../routes/users.php';
// //products routes
// require '../routes/products.php';
// //orders routes
// require '../routes/orders.php';
// //categories routes
// require '../routes/categories.php';

// $app->run();
