package com.encaps.sample;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.junit.jupiter.api.Assertions.assertTrue;

@DataJpaTest
//@Disabled
class SampleRepoTest {

    @Autowired
    SampleRepository repo;

    @Test
    void test2() {
        SampleEntity tr = new SampleEntity("a1");
        repo.save(tr);
        var list  = repo.findAll();
        System.out.println(list);
        assertTrue(list.size()==1);
    }

    @Test
    void test3() {
        SampleEntity tr = new SampleEntity("a2");
        System.out.println(tr);
        repo.save(tr);
        var list  = repo.findAll();
        System.out.println(list);

        repo.deleteAll();

        System.out.println(repo.findAll());
        assertTrue(list.size()==1);
    }
}