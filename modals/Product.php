<?php

namespace App;


use \MongoDB\BSON\ObjectId as ObjectID;
use function \MongoDB\BSON\toPHP as toPHP;
use \MongoDB\Driver\Manager as MongoManager;
use \MongoDB\Driver\BulkWrite as MongoBulkWrite;
use \MongoDB\Driver\Query as MongoQuery;
use \MongoDB\Driver\Exception;
use MongoException;

class Product
{
    private $DATABASE_PATH = '';
    private $DATABASE_NAME = '';
    private $COLLECTION_NAME = '';
    private $connectionManager = '';

    public function __construct()
    {
        $this->DATABASE_PATH='mongodb://root:mernITI39@coderm-shard-00-00-om0sg.gcp.mongodb.net:27017,
        coderm-shard-00-01-om0sg.gcp.mongodb.net:27017,
        coderm-shard-00-02-om0sg.gcp.mongodb.net:27017/OnlineCafeDatabase?ssl=true&replicaSet=CoderM-shard-0&authSource=admin&retryWrites=true';
        $this->DATABASE_NAME = 'OnlineCafeDatabase';
        $this->COLLECTION_NAME = 'Product';
        $this->connectionManager = new MongoManager($this->DATABASE_PATH);
    }
    
    // insertOne/Multi Product
    public function insertOneProduct($productArray){
        try {
            if (isset($productArray) && !empty($productArray)) {
                $bulkWriteInsert = new MongoBulkWrite;
                $inserted_id = $bulkWriteInsert->insert($productArray);
                $response = $this->connectionManager->executeBulkWrite($this->DATABASE_NAME . '.' . $this->COLLECTION_NAME, $bulkWriteInsert);
                return $inserted_id;
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
                $filter = $productId;
                $documentUpdated = ['$set' => $productArray];
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
    public function deleteOneProduct($productId)
    {
        try {
            if (isset($productId) && !empty($productId)) {
                $filter = $productId;
                $bulkWriteDeleted = new MongoBulkWrite;
                $options = ['limit' => 1];
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
                $filter = $productId;
                $options = ['limit' => $limit];
                $QueryManager = new MongoQuery($filter, $options);
                $responseCursor = $this->connectionManager->executeQuery($this->DATABASE_NAME . '.' . $this->COLLECTION_NAME, $QueryManager);
                return $responseCursor->toArray();
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
            return $responseCursor->toArray();
        } catch (MongoException $exception) {
            return $exception->getMessage();
        } catch (Exception\Exception $e) {
        }
    }
}