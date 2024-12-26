package com.encaps.sample;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;

import java.util.*;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
//@DataJpaTest
class SampleServiceTest {

    @Mock
//    @Autowired
    SampleRepository repo;

    SampleService service;

    @BeforeEach
    void setUp() {
        service = new SampleService(repo);
    }

    @Test
    void save() {

        String title = "I am Entity";

        Mockito.doReturn(
                new SampleEntity(1, title)
        ).when(repo).save(any(SampleEntity.class));

        service.create(title);

        verify(repo, times(1))
                .save(any(SampleEntity.class));

        doReturn(
                List.of(new SampleEntity(1, title))
        ).when(repo).findAll();

        var list = repo.findAll();
        System.out.println(list);
        assertTrue(list.size() > 0);

    }

    @Test
    void getAll() {
    }

    @Test
    public void testIntObjectIsEqualToIntPrimitive() {
        String s = "10";
        Integer iObj = Integer.valueOf(s);
        int iPrim = Integer.parseInt(s);
        assertTrue( iObj.equals(iPrim));
    }
}
