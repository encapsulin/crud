package com.encaps.api;
//
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//@SpringBootTest
class ApiServiceTest {
//
//    @Autowired
//    ApiService service;
//
//    @Autowired
//    CategoryService serviceC;
//
//    @Autowired
//    ItemService serviceI;
//
//    @Autowired
//    CategoryRepository repoC;
//
//    CategoryEntity categR1;
//    CategoryEntity categR1C1;
//    CategoryEntity categR1C1C1;
//    CategoryEntity categR1C2;
//    CategoryEntity categR2;
//
//    ItemEntity item1categR1;
//    ItemEntity item1categR1C1;
//    ItemEntity item1categR1C1C1;
//    ItemEntity item1categR1C2;
//    ItemEntity item2categR1C2;
//
//    @BeforeEach
//    void setUp() {
//        serviceC.deleteAll();
//        categR1 = serviceC.save("Root1", null);
//        categR1C1 = serviceC.save("Root1/Child1", categR1);
//        categR1C1C1 = serviceC.save("Root1/Child1/Child1", categR1C1);
//        categR1C2 = serviceC.save("Root1/Child2", categR1);
//        categR2 = serviceC.save("Root2", null);
//
//        serviceI.deleteAll();
//        item1categR1 = serviceI.create("Item1 for categR1", categR1.getId());
//        item1categR1C1 = serviceI.create("Item1 for categR1C1", categR1C1.getId());
//        item1categR1C1C1 = serviceI.create("Item1 for categR1C1C1", categR1C1C1.getId());
//        item1categR1C2 = serviceI.create("Item1 for categR1C2", categR1C2.getId());
//        item2categR1C2 = serviceI.create("Item2 for categR1C2", categR1C2.getId());
//    }
//
//    @Test
//    void findItemsFromParticularCategory() {
//        serviceI.deleteAll();
//        var item1categR1 = serviceI.create("Item1 for categR1", 1);
//        var item2categR1 = serviceI.create("Item2 for categR1", 1);
//
//        var list = serviceI.findAllByCategoryId(1);
//        assertEquals(2, list.size());
//
//        var items = service.findItemsFromCategoryAndAllNestedSubcategories(1);
//        assertEquals(2, items.size());
//    }
//
//    @Test
//    void findItemsFromCategoryAndAllNestedSubcategories() {
//        var list = service.findItemsFromCategoryAndAllNestedSubcategories(null);
//        assertEquals(5, list.size());
//
//        list = service.findItemsFromCategoryAndAllNestedSubcategories(categR1.getId());
//        assertEquals(5, list.size());
//
//        list = service.findItemsFromCategoryAndAllNestedSubcategories(categR2.getId());
//        assertEquals(0, list.size());
//    }
//
//    @Test
//    void findCategoryChildrenPlain() {
//        var list = service.findCategoryChildrenPlain(null);
//        assertEquals(5,list.size());
//
//        list = service.findCategoryChildrenPlain(categR2.getId());
//        assertEquals(0,list.size());
//    }
//
//
//    @Test
//    void countItemsForCategs() {
//        var list = service.findCategoryChildrenTree(null);
//        service.countItemsForCategs(list);
//
//        // One Item in Category R1
//        assertEquals(1,list.get(0).getItems());
//
//        // Zero Item in Category R2
//        assertEquals(0,list.get(1).getItems());
//    }
}
