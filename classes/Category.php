<?php

namespace App;

use \MongoDB\BSON\ObjectId as ObjectID;
use function \MongoDB\BSON\toPHP as toPHP;
use \MongoDB\Driver\Manager as MongoManager;
use \MongoDB\Driver\BulkWrite as MongoBulkWrite;
use \MongoDB\Driver\Query as MongoQuery;
use \MongoDB\Driver\Exception;
use MongoException;

class Category
{
    private $DATABASE_PATH = '';
    private $DATABASE_NAME = '';
    private $COLLECTION_NAME = '';
    private $connectionManager = '';

    public function __construct()
    {
        $this->DATABASE_PATH = 'mongodb://localhost:27017';
        $this->DATABASE_NAME = 'OnlineCafeDatabase';
        $this->COLLECTION_NAME = 'Category';
        $this->connectionManager = new MongoManager('mongodb://localhost:27017');
    }

    // insert category document
    public function insertOneCategory($categoryName)
    {
        try {
            if (isset($categoryName) && !empty($categoryName)) {
                $bulkWriteInsert = new MongoBulkWrite;
                $inserted_id = $bulkWriteInsert->insert(["categoryName" => $categoryName]);
                $response = $this->connectionManager->executeBulkWrite($this->DATABASE_NAME . '.' . $this->COLLECTION_NAME, $bulkWriteInsert);
                return var_dump($inserted_id);
            } else {
                return false;
            }
        } catch (MongoException $exception) {
            return $exception->getMessage();
        }
    }

    // delete category document
    public function deleteOneCategory($categoryId)
    {
        try {
            if (isset($categoryId) && !empty($categoryId)) {
                $filter = ['_id' => new ObjectID($categoryId)];
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

    // delete multiple by category Name
    public function deleteAllCategory($categoryName, $limit)
    {

        try {
            if (isset($categoryName) && !empty($categoryName) && isset($limit) && !empty($limit)) {
                $filter = ['categoryName' => $categoryName];
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

    // update category document or
    public function updateOneCategory($oldCategoryName, $newCategoryName, $multi)
    {
        try {
            if (isset($oldCategoryName) && !empty($oldCategoryName) && isset($newCategoryName) && !empty($newCategoryName)) {
                $filter = ['categoryName' => $oldCategoryName];
                $documentUpdated = ['$set' => ['categoryName' => $newCategoryName]];
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

    // getOne Category by categoryID
    public function getOneCategory($categoryId, $limit)
    {
        try {
            if (isset($categoryId) && !empty($categoryId) && isset($limit) && !empty($limit)) {
                $filter = ['_id' => new ObjectID($categoryId)];
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

    // getMulti Category by Name
    public function getAllCategory($categoryName, $limit)
    {
        try {
            $QueryManager = new MongoQuery([]);
            $responseCursor = $this->connectionManager->executeQuery($this->DATABASE_NAME . '.' . $this->COLLECTION_NAME, $QueryManager);
            return json_encode($responseCursor->toArray());
        } catch (MongoException $exception) {
            return $exception->getMessage();
        } catch (Exception\Exception $e) {
        }
    }
}