<?php

namespace application;

require_once __DIR__ . "../vendor/autoload.php";

use MongoDB\Driver\Manager;
use MongoDB\Driver\Command;
use MongoDB\Driver\BulkWrite;
use MongoDB\Driver\Exception;
use MongoDB\Driver\WriteConcern;
use MongoDB\Driver\Query;

class Room
{
    private static $DATABASE_PATH = 'mongodb://localhost:27017';
    private static $DATABASE_NAME = 'OnlineCafeDatabase';
    private static $COLLECTION_NAME = 'Room';
    private static $connectionManager;
    private static $bulkOperationManager;
    private static $operationResult;
    private static $writeConcern;
    private static $queryManager;

    public function __construct()
    {
        self::$connectionManager = new MongoDB\Driver\Manager(self::$DATABASE_PATH);
        self::$bulkOperationManager = new MongoDB\Driver\BulkWrite;
        self::$writeConcern = new MongoDB\Driver\WriteConcern(MongoDB\Driver\WriteConcern::MAJORITY, 1000);
    }

    // set schema validation on collection
    public static function setSchemaValidation()
    {

    }

    // create Room collection
    public static function createRoomCollection()
    {
    }

    // drop Room collection
    public static function dropRoomCollection()
    {
    }

    // get all categories
    public static function getAllRooms()
    {
        try {
                self::$queryManager = new MongoDB\Driver\Query();
                self::$operationResult = self::$connectionManager->executeQuery(self::$DATABASE_NAME . '.' . self::$COLLECTION_NAME, self::$bulkOperationManager, self::$writeConcern);
                return self::$operationResult;
        } catch (MongoDB\Driver\Exception\Exception $exception) {
            return $exception->getMessage();
        }
    }

    // get one Room
    public static function getOneRoom($roomName)
    {
        try {
            if (isset($roomName) && !empty($roomName)) {
                $filter = ["roomName" => $roomName];
                $options = ['limit' => 1];
                self::$queryManager = new MongoDB\Driver\Query($filter, $options);
                self::$operationResult = self::$connectionManager->executeQuery(self::$DATABASE_NAME . '.' . self::$COLLECTION_NAME, self::$bulkOperationManager, self::$writeConcern);
                return self::$operationResult;
            } else {
                return false;
            }
        } catch (MongoDB\Driver\Exception\Exception $exception) {
            return $exception->getMessage();
        }
    }

    // insert categories group documents
    public static function insertCategoriesDocuments($multiRoomNameArray)
    {
        try {
            if (isset($multiRoomNameArray) && !empty($multiRoomNameArray) && sizeof($multiRoomNameArray) > 0) {
                foreach ($multiRoomNameArray as $RoomName) {
                    self::$bulkOperationManager->insert(["roomName" => $RoomName]);
                }
                self::$operationResult = self::$connectionManager->executeBulkWrite(self::$DATABASE_NAME . '.' . self::$COLLECTION_NAME, self::$bulkOperationManager, self::$writeConcern);
                var_dump(self::$operationResult);
                return true;
            } else {
                return false;
            }
        } catch (MongoDB\Driver\Exception\BulkWriteException $exception) {
            return $exception;
        }
    }

    // insert one Room
    public static function insertRoomDocument($RoomName)
    {
        try {
            if (isset($RoomName) && !empty($RoomName)) {
                self::$bulkOperationManager->insert(["roomName" => $RoomName]);
                self::$operationResult = self::$connectionManager->executeBulkWrite(self::$DATABASE_NAME . '.' . self::$COLLECTION_NAME, self::$bulkOperationManager, self::$writeConcern);
                var_dump(self::$operationResult);
                return true;
            } else {
                return false;
            }
        } catch (MongoDB\Driver\BulkWriteException $exception) {
            return $exception->getMessage();
        }
    }

    // delete Room documents
    public static function deleteRoomDocuments($RoomName, $isAll)
    {
        try {
            if (isset($RoomName) && !empty($RoomName)) {
                $filter = ['roomName' => $RoomName];
                if ($isAll == false) {
                    $options = ['limit' => 1];
                    self::$bulkOperationManager->delete($filter, $options);
                } else {
                    self::$bulkOperationManager->delete($filter);
                }
                self::$operationResult = self::$connectionManager->executeBulkWrite(self::$DATABASE_NAME . '.' . self::$COLLECTION_NAME, self::$bulkOperationManager, self::$writeConcern);
            } else {
                return false;
            }
        } catch (MongoDB\Driver\BulkWriteException $exception) {
            return $exception->getMessage();
        }
    }

    // update one Room
    public static function updateOneRoom($old_RoomName, $new_RoomName, $isAll)
    {
        try {
            if (isset($old_RoomName) && !empty($old_RoomName) && isset($new_RoomName)
                && !empty($new_RoomName) && $old_RoomName != $new_RoomName) {
                $options = ['multi' => $isAll, 'upsert' => false];
                $filter = ['roomName' => $old_RoomName];
                $update = ['$set' => ['roomName' => $new_RoomName]];
                self::$bulkOperationManager->update($filter, $update, $options);
                self::$operationResult = self::$connectionManager->executeBulkWrite(self::$DATABASE_NAME . '.' . self::$COLLECTION_NAME, self::$bulkOperationManager, self::$writeConcern);
            } else {
                return false;
            }
        } catch (MongoDB\Driver\BulkWriteException $exception) {
            return $exception->getMessage();
        }
    }
}

///// todos
/// todo: setSchemaCollection : ()
/// todo: createCollection : ()
/// todo: dropCollection : ()
/////
/// Build Room - New
/// Build Room - New
/// Build Room - Legacy
/// Build Room - Legacy
/// Test Classes
/// But a Schema - Validation

