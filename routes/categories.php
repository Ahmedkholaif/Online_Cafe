<?php

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

$app->get('/api/categories', function (Request $req, Response $res) {
   
    $categories = array(0 => ['categoryName' => 'database1', 'id' => '1'],
                    1 => ['categoryName' => 'database2', 'id' => '2'],
                    2 => ['categoryName' => 'database3', 'id' => '3']
                );
    echo json_encode($categories);
});

//Create new category
$app->post('/api/categories', function (Request $req, Response $res) {
    $body = json_decode($req->getBody());

    // $body = json_encode($body);
    $categoryName = $body->categoryName;

    $categoryName = json_encode($categoryName);
    // header('{"msg":"Success"}');
    // echo '{'.$body.'}';
    var_dump( $req );
    // echo $req
    echo ' [{"category":'.$categoryName.'}]';
});
// update category
$app->put('/api/categories/{name}', function (Request $req, Response $res) {
    
    $name = $req->getAttribute('name');
    var_dump( $req );
    echo '[{"name":'.$name.'}]';
    
});
// delete category
$app->delete('/api/categories/{name}', function (Request $req, Response $res) {

    $name = $req->getAttribute('name');
    var_dump( $req );
    echo '[{"name":'.$name.'}]';
});
