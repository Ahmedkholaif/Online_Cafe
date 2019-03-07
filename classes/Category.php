<?php

// namespace main;

require '../vendor/autoload.php';

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
        self::$connection = new \MongoClient(self::$DATABASE_PATH);
        self::$onlineCafeDatabase = self::$connection->selectDatabase(self::$DATABASE_NAME);
        self::$categoryCollection = self::$onlineCafeDatabase->selectCollection(self::$COLLECTION_NAME);
    }

    // insert category - category collection
    public static function insertCategory($categoryName)
    {
        return json_decode(self::$categoryCollection->insert(array(
            'categoryName' => $categoryName,
        )));
    }

    // delete category - category collection
    public static function deleteCategory($categoryName)
    {
        return json_decode(self::$categoryCollection->remove(array(
            'categoryName' => $categoryName,
        )));
    }

    // update category
    public static function updateCategory($newCategoryName)
    {
        $categotyUpdated = self::$categoryCollection->update($newCategoryName->toArray());

        return json_decode($categotyUpdated->toArray());
    }

    // getOne category
    public static function selectOneCategory($categoryName)
    {
        $categoryFound = self::$categoryCollection->findOne($categoryName);

        return json_decode($categoryFound->toArray());
    }

    // getAll Category
    public static function selectAllCategory()
    {
        $categoryCursor = self::$categoryCollection->find();
        ////////////////////////////////////////////////////////////////////
        // test this method
        return json_decode($categoryCursor->toArray());
        ////////////////////////////////////////////////////////////////////
        //------------------------------------------------------------------
        ////////////////////////////////////////////////////////////////////
        // another method to test
        return json_decode($categoryCursor->toArray());
        ////////////////////////////////////////////////////////////////////
        // method using foreach
        $categoryArrayData;
        foreach ($categoryCursor as $category) {
            $newCategory = array(
                '_id' => $category['_id'],
                'categoryName' => $category['categoryName'],
            );
            $categoryArrayData += $newCategory;
        }

        return json_decode($categoryArrayData->toArray());
    }
}
