package com.encaps.sample;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SampleService {

    SampleRepository repo;

    @Autowired
    public SampleService(SampleRepository repo) {
        this.repo = repo;
    }

    @Bean(name = "cmdRunnerSample")
    CommandLineRunner commandLineRunner() {
        return args -> {
//            System.out.println(Arrays.toString(args));
            var entityParent = new SampleEntity("I am Root Entity ");
            repo.save(entityParent);
            int i = 1;
            while (i++ < 1) {
                var entityChild = new SampleEntity("I am super puper Sample Entity " + i);
//                entityChild.setParent(entityParent);
//                entityParent.getChildren().add(entityChild);
                repo.save(entityChild);
            }
        };
    }

    SampleEntity create(String s) {
        SampleEntity teIn = new SampleEntity(s);
        return repo.save(teIn);
    }

    List<SampleEntity> findAll() {
        return repo.findAll();
    }

    public SampleEntity findById(Integer id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("id not found"));
    }

    SampleEntity save(SampleEntity e) {
        return repo.save(e);
    }

    void deleteById(Integer id) {
        repo.deleteById(id);
    }

}
