<?php

namespace App;


use \MongoDB\BSON\ObjectId as ObjectID;
use function \MongoDB\BSON\toPHP as toPHP;
use \MongoDB\Driver\Manager as MongoManager;
use \MongoDB\Driver\BulkWrite as MongoBulkWrite;
use \MongoDB\Driver\Query as MongoQuery;
use \MongoDB\Driver\Exception;
use MongoException;

class Products
{
    private $DATABASE_PATH = '';
    private $DATABASE_NAME = '';
    private $COLLECTION_NAME = '';
    private $connectionManager = '';

    public function __construct()
    {
        $this->DATABASE_PATH = 'mongodb://localhost:27017';
        $this->DATABASE_NAME = 'OnlineCafeDatabase';
        $this->COLLECTION_NAME = 'Product';
        $this->connectionManager = new MongoManager('mongodb://localhost:27017');
    }
    
    // insertOne/Multi Product
    public function insertOneProduct($productArray){
        try {
            if (isset($productArray) && !empty($productArray)) {
                $bulkWriteInsert = new MongoBulkWrite;
                $inserted_id = $bulkWriteInsert->insert([
                    "productName" => $productArray["productName"],
                    "price" => $productArray["price"],
                    "categoryName" => $productArray["categoryName"],
                    "image" => $productArray["image"],
                    "isAvailable" => $productArray["isAvailable"]
                ]);
                $response = $this->connectionManager->executeBulkWrite($this->DATABASE_NAME . '.' . $this->COLLECTION_NAME, $bulkWriteInsert);
                return json_encode($inserted_id);
            } else {
                return false;
            }
        } catch (MongoException $exception) {
            return $exception->getMessage();
        }
    }

    // update One/Multi Product
    public function updateOneProduct($productId, $productArray, $multi)
    {
        try {
            if (isset($productId) && !empty($productId) && isset($productArray) && !empty($productArray)) {
                $filter = ["_id" => $productId];
                $documentUpdated = ['$set' => [
                    "productName" => $productArray["productName"],
                    "price" => $productArray["price"],
                    "categoryName" => $productArray["categoryName"],
                    "image" => $productArray["image"],
                    "isAvailable" => $productArray["isAvailable"]
                ]];
                $options = ['multi' => $multi, 'upsert' => $multi];
                $bulkWriteUpdated = new MongoBulkWrite;
                $bulkWriteUpdated->update($filter, $documentUpdated, $options);
                $response = $this->connectionManager->executeBulkWrite($this->DATABASE_NAME . '.' . $this->COLLECTION_NAME, $bulkWriteUpdated);
                return $response->isAcknowledged();
            } else {
                return false;
            }
        } catch (MongoException $exception) {
            return $exception->getMessage();
        }

    }
    
    // delete One/Multi Product
    public function deleteOneProduct($productId, $limit)
    {
        try {
            if (isset($productId) && !empty($productId) && isset($limit) && !empty($limit)) {
                $filter = ['_id' => $productId];
                $bulkWriteDeleted = new MongoBulkWrite;
                $options = ['limit' => $limit];
                $bulkWriteDeleted->delete($filter, $options);
                $response = $this->connectionManager->executeBulkWrite($this->DATABASE_NAME . '.' . $this->COLLECTION_NAME, $bulkWriteDeleted);
                return $response->isAcknowledged();
            } else {
                return false;
            }
        } catch (MongoException $exception) {
            return $exception->getMessage();
        }

    }
    
    // get One  Product
    public function getOneProduct($productId, $limit)
    {
        try {
            if (isset($productId) && !empty($productId) && isset($limit) && !empty($limit)) {
                $filter = ['_id' => new ObjectID($productId)];
                $options = ['limit' => $limit];
                $QueryManager = new MongoQuery($filter, $options);
                $responseCursor = $this->connectionManager->executeQuery($this->DATABASE_NAME . '.' . $this->COLLECTION_NAME, $QueryManager);
                return json_encode($responseCursor->toArray());
            } else {
                return false;
            }
        } catch (MongoException $exception) {
            return $exception->getMessage();
        } catch (Exception\Exception $e) {
        }
    }

    // get All products
    public function getAllProduct()
    {
        try {
            $QueryManager = new MongoQuery([]);
            $responseCursor = $this->connectionManager->executeQuery($this->DATABASE_NAME . '.' . $this->COLLECTION_NAME, $QueryManager);
            return json_encode($responseCursor->toArray());
        } catch (MongoException $exception) {
            return $exception->getMessage();
        }
    }
}