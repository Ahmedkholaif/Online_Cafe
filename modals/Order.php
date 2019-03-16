<?php

namespace App;

use \MongoDB\BSON\ObjectId as ObjectID;
use function \MongoDB\BSON\toPHP as toPHP;
use \MongoDB\Driver\Manager as MongoManager;
use \MongoDB\Driver\BulkWrite as MongoBulkWrite;
use \MongoDB\Driver\Query as MongoQuery;
use \MongoDB\Driver\Exception;
use MongoException;


class Order
{
    private $DATABASE_PATH = '';
    private $DATABASE_NAME = '';
    private $COLLECTION_NAME = '';
    private $connectionManager = '';

    public function __construct()
    {
        $this->DATABASE_PATH = 'mongodb://root:mernITI39@coderm-shard-00-00-om0sg.gcp.mongodb.net:27017,
        coderm-shard-00-01-om0sg.gcp.mongodb.net:27017,
        coderm-shard-00-02-om0sg.gcp.mongodb.net:27017/OnlineCafeDatabase?ssl=true&replicaSet=CoderM-shard-0&authSource=admin&retryWrites=true';
        $this->DATABASE_NAME = 'OnlineCafeDatabase';
        $this->COLLECTION_NAME = 'Order';
        $this->connectionManager = new MongoManager($this->DATABASE_PATH);
    }

    // insert One/Multi Order
    public function insertOneOrder($orderArray)
    {
        try {
            if (isset($orderArray) && !empty($orderArray)) {
                $bulkWriteInsert = new MongoBulkWrite;
                $inserted_id = $bulkWriteInsert->insert($orderArray);
                $response = $this->connectionManager->executeBulkWrite($this->DATABASE_NAME . '.' . $this->COLLECTION_NAME, $bulkWriteInsert);
                return ($inserted_id);
            } else {
                return false;
            }
        } catch (MongoException $exception) {
            return $exception->getMessage();
        }
    }

    // Update One/Multi Order
    public function updateOneOrder($orderId, $orderArray, $multi)
    {
        try {
            if (isset($orderId) && !empty($orderId) && isset($orderArray) && !empty($orderArray)) {
                $filter = $orderId;
                $documentUpdated = ['$set' => $orderArray];
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

    // delete One/Multi Order
    public function deleteOneOrder($orderId, $limit)
    {
        try {
            if (isset($orderId) && !empty($orderId) && isset($limit) && !empty($limit)) {
                $filter = $orderId;
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

    // getOne Order
    public function getOneOrder($orderId, $limit)
    {
        try {
            if (isset($orderId) && !empty($orderId) && isset($limit) && !empty($limit)) {
                $filter = $orderId;
                $options = ['limit' => $limit];
                $QueryManager = new MongoQuery($filter, $options);
                $responseCursor = $this->connectionManager->executeQuery($this->DATABASE_NAME . '.' . $this->COLLECTION_NAME, $QueryManager);
                return ($responseCursor->toArray());
            } else {
                return false;
            }
        } catch (MongoException $exception) {
            return $exception->getMessage();
        } catch (Exception\Exception $e) {
        }
    }

    // getAllUsers
    public function getAllOrders()
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
