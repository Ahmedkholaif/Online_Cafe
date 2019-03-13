<?php

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

require('vendor/autoload.php');
require('modals/User.php');

try {
    $application = new \Slim\App();

    $application->run();

} catch (Exception $exception) {
    echo $exception->getMessage();
}