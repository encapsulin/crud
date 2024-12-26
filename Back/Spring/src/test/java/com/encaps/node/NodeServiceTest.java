package com.encaps.node;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(classes = {NodeService.class, NodeRepositoryDynamoDB.class})
class NodeServiceTest {

    @Test
    void create() {
    }

    @Test
    void findAllByParentId() {
    }

    @Test
    void findById() {
    }

    @Test
    void findAll() {
    }

    @Test
    void save() {
    }

    @Test
    void deleteById() {
    }

    @Test
    void getNodeParents() {
    }

    @Test
    void getNodeParentsRecurs() {
    }

    @Test
    void deleteAll() {
    }

    @Test
    void transformTreeToPlainList() {
    }

    @Test
    void post() {
    }

    @Test
    void patch() {
    }

//    @Autowired
//    NodeRepository repo;

    @Autowired
    NodeService service;

    NodeEntity categR1;
    NodeEntity categR1C1;
    NodeEntity categR1C1C1;
    NodeEntity categR1C2;
    NodeEntity categR2;

//    @BeforeEach
//    void setUp() {
//        repo.deleteAll();
//        categR1 = service.create("Root1", null);
//        categR1C1 = service.create("Root1/Child1", categR1.getId());
//        categR1C1C1 = service.create("Root1/Child1/Child1", categR1C1.getId());
//        categR1C2 = service.create("Root1/Child2", categR1.getId());
//        categR2 = service.create("Root2", null);
//    }
    
//    @Test
//    @Disabled //  Could not determine recommended JdbcType for `com.encaps.categs.items.NodeEntity`
//    void test1() {
//        NodeEntity entity = new NodeEntity();
//        entity.setTitle("Some Title");
//        entity.setDescr("Some Magic Description");
//        repo.save(entity);
//        var list = repo.findAll();
//        assertTrue(entity.getId() > 0);
//    }

//    @Test
//    void testFindAllByNodeId() {
//        repo.deleteAll();
//        var item1categR1 = service.create("Node1 for categR1", 1L);
//        var item2categR1 = service.create("Node2 for categR1", 1L);
//        var list = service.findAllByParentId(1L);
//        assertTrue(list.size() == 2);
//    }

//    @Test
//    void testGetCategoryParents() {
        // Root1/Child1/Child1
//        var categId = categR1C1C1.getId();
//        var listParents = service.getCategoryParents(categId);
//        assertEquals(2, listParents.size());
//        assertEquals("Root1", listParents.get(0).getTitle());
//        assertEquals("Root1/Child1", listParents.get(1).getTitle());
//    }

//    @Test
//    void testCategoryChildrenRecurs() {
//        var listRecurs = service.findCategsTreeForRoot(null);
//
//        // Two root elements: Root1 & Root2
//        assertEquals(2, listRecurs.size());
//        var r1 = listRecurs.get(0);
//        var r2 = listRecurs.get(1);
//
//        // Root1 has 2 Children
//        assertEquals(2, r1.getChildren().size());
//        var r1c1 = r1.getChildren().get(0);
//        var r1c2 = r1.getChildren().get(1);
//
//        // Child of Root1 also has 1 Child
//        assertEquals(1, r1c1.getChildren().size());
//
//        // Child 2 of Root1 has no children
//        assertEquals(0, r1c2.getChildren().size());
//
//        // Root2 has no children
//        assertEquals(0, r2.getChildren().size());
//    }

    // TODO
    @Test
    void testGetCategoryChildrenFlat() {
        var listTree = service.findCategsTreeForRoot(categR1.getId());
        var listPlain = service.transformTreeToPlainList(listTree);

        // 3 Children for Root1
        assertEquals(3, listPlain.size());

        // and no subcategs for nested categs
//        assertEquals(0,listPlain.get(0).getChildren().size());
    }

    @Test
    void findCategsTreeForRoot() {
        var list = service.findCategsTreeForRoot(null);
        assertTrue(list.size() >0);
    }

    @Test
    void testTree() {
        service.testTreePopulate();
    }

    @Test
    void findByTitleAndParent(){
        var list = service.findByTitleAndParent("a", 0L);
        System.out.println(list);
        assertTrue(list.size()>0);
    }

}