<?php

namespace application;
require_once __DIR__ . "../vendor/autoload.php";


class Category
{
    private static $DATABASE_PATH = 'mongodb://localhost:27017';
    private static $DATABASE_NAME = 'OnlineCafeDatabase';
    private static $COLLECTION_NAME = 'Category';
    private static $connection;
    private static $onlineCafeDatabase;
    private static $categoryCollection;

    public function __construct()
    {
        self::$connection = new MongoClient(self::$DATABASE_PATH);
        self::$onlineCafeDatabase = self::$connection->selectDatabase(self::$DATABASE_NAME);
        self::$categoryCollection = self::$onlineCafeDatabase->selectCollection(self::$COLLECTION_NAME);
    }


    // insert category - category collection
    public static function insertCategory($categoryName)
    {
        return json_encode(self::$categoryCollection->insert(array(
            'categoryName' => $categoryName
        )));
    }


    // delete category - category collection
    public static function deleteCategory($categoryName)
    {
        return json_encode(self::$categoryCollection->remove(array(
            'categoryName' => $categoryName
        )));
    }

    // update category
    public static function updateCategory($newCategoryName)
    {
        $categotyUpdated = self::$categoryCollection->update($newCategoryName->toArray());
        return json_encode($categotyUpdated->toArray());
    }

    // getOne category
    public static function selectOneCategory($categoryName)
    {
        $categoryFound = self::$categoryCollection->findOne($categoryName);
        return json_encode($categoryFound->toArray());
    }

    // getAll Category
    public static function selectAllCategory()
    {
        $categoryCursor = self::$categoryCollection->find();
        return json_encode($categoryCursor->toArray());
    }
}