<?php

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

// Get All products
$app->get('/api/products', function (Request $req, Response $res) {
    // echo 'products';
    // $res->getBody()->write('Hello there');
    $products = array(
        0 => ['productName' => 'database1', 'id' => '4', 'categoryName' => 'Hard', 'price' => '120', 'isAvailable' => true],
                    1 => ['productName' => 'database2', 'id' => '5', 'categoryName' => 'Soft', 'price' => '120', 'isAvailable' => false,
                ],
                );

    echo json_encode($products);
    // echo '{"products":'.$products.'}';
});

//Create new product
$app->post('/api/products', function (Request $req, Response $res) {
    $body = json_decode($req->getBody());

    // $body = json_encode($body);
    $product = $body->product;

    // $categoryName = json_encode($categoryName);
    // header('{"msg":"Success"}');
    // echo '{'.$body.'}';
    // var_dump( $req );
    // echo $req
    echo json_encode($product);
    // $res->getBody()->write('Hello there');
});
// update product
$app->put('/api/products/{name}', function (Request $req, Response $res) {
    $productName = $req->getAttribute('name'); //
    
    // $res->getBody()->write('Hello there');
});
// delete product
$app->delete('/api/products/{name}', function (Request $req, Response $res) {
    
    $productName = $req->getAttribute('name'); //
    // var_dump( $req );
    echo json_encode($productName);

});
