<?php

// $MONGO_URL = 'mongodb+srv://root:mernITI39@coderm-om0sg.gcp.mongodb.net/onlineCafedb?retryWrites=true';
require_once '../vendor/autoload.php';

$MONGO_URL = 'mongodb://localhost:27017/onlineCafedb';
use MongoDB\Driver\Manager as MongoManager;

class DB
{
    private $DATABASE_PATH = '';
    private $DATABASE_NAME = '';
    private $COLLECTION_NAME = '';
    private $connectionManager = '';

    public function connect()
    {
        $this->DATABASE_PATH = 'mongodb://localhost:27017';
        $this->DATABASE_NAME = 'OnlineCafeDatabase';
        // $this->COLLECTION_NAME = 'Category';
        $this->connectionManager = new MongoManager('mongodb://localhost:27017');

        return $this->connectionManager;
    }
}
// $client = new MongoDB\Client();
// new MongoDB\Driver\Manager($MONGO_URL);

// $db = $client->online;
// var_dump($client);
// var_dump($db);
// $session = $client->startSession();

// var_dump($session);
// $test = $client->test;
// $anotherApp = $client->{'another-app'};

// $db = $client->selectDatabase('test');
// // var_dump($db);

// $collection = (new MongoDB\Client())->test->users;

// var_dump($collection);

// $insertOneResult = $collection->insertOne([
//     'username' => 'admin',
//     'email' => 'admin@example.com',
//     'name' => 'Admin User',
// ]);

// printf("Inserted %d document(s)\n", $insertOneResult->getInsertedCount());

// var_dump($insertOneResult->getInsertedId());
