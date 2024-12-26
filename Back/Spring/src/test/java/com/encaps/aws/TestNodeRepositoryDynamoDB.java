package com.encaps.aws;


import com.encaps.aws.dynamodb.DynamoDB;
import com.encaps.node.NodeRepositoryDynamoDB;
import com.encaps.node.NodeEntity;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.TableSchema;
import software.amazon.awssdk.services.dynamodb.model.DynamoDbException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static software.amazon.awssdk.enhanced.dynamodb.mapper.StaticAttributeTags.primaryPartitionKey;

@SpringBootTest(classes = {NodeEntity.class, NodeRepositoryDynamoDB.class})
public class TestNodeRepositoryDynamoDB {

    @Autowired
    NodeRepositoryDynamoDB repo;

    @Test
    void test() {

    }

    @Test
    void testSaveEnhanced(){
        var node = new NodeEntity("ROOT");
        node.setParentId(1L);
        node.setDescr("descr");
        node.setRole(1);
        System.out.println(node);
        repo.save(node);
    }

    @Test
    void test2SaveTree(){
        var node1 = new NodeEntity("ROOT");
        repo.save(node1);

        var node2 = new NodeEntity("Child Dir",node1.getId());
        node2.setDescr("descr");
        repo.save(node2);

        var node3 = new NodeEntity("child doc").setParentId(node2.getId());
        repo.save(node3);
    }

    @Test
    void testGet(){
        var node = new NodeEntity("ROOT");
        System.out.println(node);
        repo.save(node);

        NodeEntity entity = repo.findById(node.getId()).get();
        System.out.println(entity);
        assertEquals(node.getTitle(), entity.getTitle());
    }

    @Test
    void testFindAll(){
        var list = repo.findAll();
        System.out.println(list);
    }

    @Test
    void findAllByParentId(){
        var list = repo.findAllByParentId(0L);
        System.out.println(list);
    }

    @Test
    void deleteById(){
        repo.deleteById(1681938210234L);
    }

    @Test
    void testFindBy(){
        var list = repo.findBy("role",1);
        System.out.println(list);
        assertTrue(list.size()>0);

        list = repo.findBy("title","sql");
        System.out.println(list);
        assertTrue(list.size()>0);
    }

    @Test
    void testFindByTitleAndParent(){


    }
}
