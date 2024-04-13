'''
test the models in the inventory
'''
from django.test import TestCase
from inventory.models import Category, Product, Sales, BaseModel, Purchase
from uuid import UUID
from django.db import IntegrityError
import datetime as dt
from unittest.mock import patch, MagicMock
from django.utils import timezone


class InventoryModelTest(TestCase):
    '''
    testing the models of the inventory model
    '''
    def setUp(self):
        self.phone = Category.objects.create(
                                             name='Phone',
                                             description='All phones'
                                             )
        self.spark = Product.objects.create(
                                            name='spark 3',
                                            quantity=20,
                                            buying_price=300,
                                            selling_price=500,
                                            category=self.phone)
        self.add_stock = Purchase.objects.create(product=self.spark,
                                                 quantity=5,
                                                 buying_price=350)
        self.sell_stock = Sales.objects.create(
                                                product=self.spark,
                                                quantity=5,
                                                selling_price=450,
                                                total=1000)

    def test_basemodel_inherited(self):
        '''
        test that the basemode is iherited
        '''
        self.assertTrue(issubclass(Category, BaseModel))
        self.assertTrue(issubclass(Product, BaseModel))
        self.assertTrue(issubclass(Purchase, BaseModel))
        self.assertTrue(issubclass(Sales, BaseModel))

    def test_id_is_UUID(self):
        '''
        test that the id is inherited from base model is the primary key
        '''
        self.assertEqual(type(self.phone.id), UUID)
        self.assertEqual(self.phone.id, self.phone.pk)
        self.assertEqual(type(self.spark.id), UUID)
        self.assertEqual(self.spark.id, self.spark.pk)
        self.assertEqual(type(self.add_stock.id), UUID)
        self.assertEqual(self.add_stock.id, self.add_stock.pk)
        self.assertEqual(type(self.sell_stock.id), UUID)
        self.assertEqual(self.sell_stock.id, self.sell_stock.pk)

    def testq_created_at_and_updated_at_category(self):
        '''
        test the updated at and created at of Category
        model is passed frm the base model
        '''
        self.assertAlmostEqual(
                                self.phone.created_at,
                                self.phone.updated_at,
                                delta=dt.timedelta(seconds=1)
                                )
        self.assertIsNotNone(self.phone.created_at)
        self.assertIsNotNone(self.phone.updated_at)
        self.assertEqual(type(self.phone.created_at), dt.datetime)
        self.assertEqual(type(self.phone.updated_at), dt.datetime)

        self.phone.name = 'phones'
        self.phone.save()

        self.assertNotEqual(self.phone.created_at, self.phone.updated_at)
        self.assertLessEqual(self.phone.created_at, self.phone.updated_at)

    def testq_created_at_and_updated_at_Product(self):
        '''
        test the product modele created and updated
        '''
        self.assertAlmostEqual(
                               self.spark.created_at,
                               self.spark.updated_at,
                               delta=dt.timedelta(seconds=1)
                               )
        self.assertIsNotNone(self.spark.created_at)
        self.assertIsNotNone(self.spark.updated_at)
        self.assertEqual(type(self.spark.created_at), dt.datetime)
        self.assertEqual(type(self.spark.updated_at), dt.datetime)

        self.spark.name = 'spark 3.1'
        self.spark.save()
        self.assertNotEqual(self.spark.created_at, self.spark.updated_at)
        self.assertLessEqual(self.spark.created_at, self.spark.updated_at)

    def testq_created_at_and_updated_at_Purchase(self):
        '''
        test the created and updated at for purchase model
        '''
        self.assertAlmostEqual(
                               self.add_stock.created_at,
                               self.add_stock.updated_at,
                               delta=dt.timedelta(seconds=1)
                               )
        self.assertIsNotNone(self.add_stock.created_at)
        self.assertIsNotNone(self.add_stock.updated_at)
        self.assertEqual(type(self.add_stock.created_at), dt.datetime)
        self.assertEqual(type(self.add_stock.updated_at), dt.datetime)

    def testq_created_at_and_updated_at_Sales(self):
        '''
        test the created at updated at for Sales Model
        '''
        self.assertAlmostEqual(
                               self.sell_stock.created_at,
                               self.sell_stock.updated_at,
                               delta=dt.timedelta(seconds=1)
                               )
        self.assertIsNotNone(self.sell_stock.created_at)
        self.assertIsNotNone(self.sell_stock.updated_at)
        self.assertEqual(type(self.sell_stock.created_at), dt.datetime)
        self.assertEqual(type(self.sell_stock.updated_at), dt.datetime)

    def test_CategoryModel(self):
        '''
        test the category model
        '''
        self.assertEqual(self.phone.name, 'Phone')
        # test the unique attribute of name
        with self.assertRaises(IntegrityError):
            dPhone = Category.objects.create(
                                             name='Phone',
                                             description='All phones'
                                             )
        # test the max_length attribute of name
        self.assertEqual(self.phone._meta.get_field('name').max_length, 100)
        self.assertEqual(self.phone.description, 'All phones')
        self.assertEqual(str(self.phone), 'Phone')
        self.assertEqual(self.phone._meta.verbose_name_plural, 'Categories')
        self.assertEqual(self.phone.category_image, None)


