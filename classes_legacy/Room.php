<?php

namespace application;


class Room
{
    private static $DATABASE_PATH = 'mongodb://localhost:27017';
    private static $DATABASE_NAME = 'OnlineCafeDatabase';
    private static $COLLECTION_NAME = 'Room';
    private static $connection;
    private static $onlineCafeDatabase;
    private static $roomCollection;

    public function __construct()
    {
        self::$connection = new MongoClient(self::$DATABASE_PATH);
        self::$onlineCafeDatabase = self::$connection->selectDatabase(self::$DATABASE_NAME);
        self::$roomCollection = self::$onlineCafeDatabase->selectCollection(self::$COLLECTION_NAME);
    }


    // insert category - category collection
    public static function insertRoom($roomName)
    {
        return json_encode(self::$roomCollection->insert(array(
            'roomName' => $roomName
        )));
    }


    // delete room - room collection
    public static function deleteRoom($roomName)
    {
        return json_encode(self::$roomCollection->remove(array(
            'roomName' => $roomName
        )));
    }

    // update room
    public static function updateRoom($newRoomName)
    {
        $roomUpdated = self::$roomCollection->update($newRoomName->toArray());
        return json_encode($roomUpdated->toArray());
    }

    // getOne room
    public static function selectOneRoom($roomName)
    {
        $roomFound = self::$roomCollection->findOne($roomName);
        return json_encode($roomFound->toArray());
    }

    // getAll Room
    public static function selectAllRoom()
    {
        $roomCursor = self::$roomCollection->find();
        return json_encode($roomCursor->toArray());
    }
}