package com.encaps.sample;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.junit.jupiter.api.Assertions.assertTrue;

//@ExtendWith(MockitoExtension.class)
@DataJpaTest
class SampleServiceIntegrationTest {

    @Autowired
    SampleRepository repo;

    SampleService service;

    @BeforeEach
    void setUp() {
        service = new SampleService(repo);
    }

    @Test
    void save() {

        String title = "I am Entity";

//        doReturn(
//                new TestEntity(1, "title")
//        ).when(repo).save(any(TestEntity.class));

        service.create(title);

//        verify(repo, times(1))
//                .save(any(TestEntity.class));

//        doReturn(
//                List.of(new TestEntity(1, "title"))
//        ).when(repo).findAll();

        var list = repo.findAll();
        System.out.println(list);
        assertTrue(list.size() > 0);

    }

    @Test
    void getAll() {
    }
}