<?php

namespace App;

use \MongoDB\BSON\ObjectId as ObjectID;
use function \MongoDB\BSON\toPHP as toPHP;
use \MongoDB\Driver\Manager as MongoManager;
use \MongoDB\Driver\BulkWrite as MongoBulkWrite;
use \MongoDB\Driver\Query as MongoQuery;
use \MongoDB\Driver\Exception;
use MongoException;

class User
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
        $this->COLLECTION_NAME = 'User';
        $this->connectionManager = new MongoManager($this->DATABASE_PATH);
    }

    // insert One User
    public function insertOneUser($userArray)
    {
        try {
            if (isset($userArray) && !empty($userArray)) {
                $bulkWriteInsert = new MongoBulkWrite;
                $inserted_id = $bulkWriteInsert->insert([
                    "fullName" => $userArray["fullName"],
                    "email" => $userArray["email"],
                    "password" => password_hash($userArray["password"],PASSWORD_DEFAULT),
                    "image" => $userArray["image"],
                    "defaultRoom" => $userArray["defaultRoom"],
                    "phone" => $userArray["phone"],
                    "isAdmin" => $userArray["isAdmin"]
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

    // update One/Multi User
    public function updateOneUser($userId, $userArray, $multi)
    {
        try {
            if (isset($userId) && !empty($userId) && isset($userArray) && !empty($userArray)) {
                $filter = ["_id" => $userId];
                $documentUpdated = ['$set' => [
                    "fullName" => $userArray["fullName"],
                    "email" => $userArray["email"],
                    "password" => $userArray["password"],
                    "image" => $userArray["image"],
                    "defaultRoom" => $userArray["defaultRoom"],
                    "phone" => $userArray["phone"],
                    "isAdmin" => $userArray["isAdmin"]
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

    // delete One/Multi User
    public function deleteOneUser($userId, $limit)
    {
        try {
            if (isset($userId) && !empty($userId) && isset($limit) && !empty($limit)) {
                $filter = ['_id' => $userId];
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

    // getOne User
    public function getOneUser($userId, $limit)
    {
        try {
            if (isset($userId) && !empty($userId) && isset($limit) && !empty($limit)) {
                $filter = ['_id' => new ObjectID($userId)];
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

    // get user for login
    public function getOneUserLogin($email, $password)
    {
        try {
            if (isset($email) && !empty($email) && isset($password) && !empty($password)) {
                $filter = ['email' => $email, 'password' => $password];
                $options = ['limit' => 1];
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
    public function getAllUser()
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

// TODO: User Password
// TODO: Validation Utilities - Email .....

// TODO: User Email - Class

// TODO: Deploy Back-End Application
// TODO: Test Application
// TODO: Schema Validation
// TODO: SLIM/FRAMEWORK

// TODO: Slim/Authentication
// TODO: Slim/Session Management
// TODO: User Logout
// TODO: 404 Page
