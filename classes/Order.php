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
        $this->DATABASE_PATH = 'mongodb://localhost:27017';
        $this->DATABASE_NAME = 'OnlineCafeDatabase';
        $this->COLLECTION_NAME = 'Order';
        $this->connectionManager = new MongoManager('mongodb://localhost:27017');
    }

    // insert One/Multi Order
    public function insertOneOrder($orderArray)
    {
        try {
            if (isset($orderArray) && !empty($orderArray)) {
                $bulkWriteInsert = new MongoBulkWrite;
                $inserted_id = $bulkWriteInsert->insert([
                    "userFullName" => $orderArray["userFullName"],
                    "notes" => $orderArray["notes"],
                    "orderTotal" => $orderArray["orderTotal"],
                    "orderStatus" => $orderArray["orderStatus"],
                    "dateStamp" => $orderArray["dateStamp"],
                    "roomName" => $orderArray["roomName"],
                    "orderBody" => $orderArray["orderBody"]
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

    // Update One/Multi Order
    public function updateOneOrder($orderId, $orderArray, $multi)
    {
        try {
            if (isset($orderId) && !empty($orderId) && isset($orderArray) && !empty($orderArray)) {
                $filter = ["_id" => $orderId];
                $documentUpdated = ['$set' => [
                    "userFullName" => $orderArray["userFullName"],
                    "notes" => $orderArray["notes"],
                    "orderTotal" => $orderArray["orderTotal"],
                    "orderStatus" => $orderArray["orderStatus"],
                    "dateStamp" => $orderArray["dateStamp"],
                    "roomName" => $orderArray["roomName"],
                    "orderBody" => $orderArray["orderBody"]
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

    // delete One/Multi Order
    public function deleteOneOrder($orderId, $limit)
    {
        try {
            if (isset($orderId) && !empty($orderId) && isset($limit) && !empty($limit)) {
                $filter = ['_id' => $orderId];
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
                $filter = ['_id' => new ObjectID($orderId)];
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

    // getAllUsers
    public function getAllOrders()
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
