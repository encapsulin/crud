package com.encaps.sample;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/sample")
@CrossOrigin(origins = "*")
public class SampleController {

    @Autowired
    SampleService service;

    static final Logger LOG = LoggerFactory.getLogger(SampleController.class);

    @GetMapping(path = {"/",""})
    ResponseEntity<List<SampleDto>> findAll() {
        var list = service.findAll()
                .stream()
                .map(e -> {
                    return SampleDto.mapEntity(e);
                })
                .collect(Collectors.toList());
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    ResponseEntity<SampleEntity> getEntity(@PathVariable Integer id) {
        return new ResponseEntity<>(service.findById(id), HttpStatus.OK);
    }

    @PostMapping("/post")
    public ResponseEntity<SampleEntity> add(@RequestBody SampleEntity e){
        SampleEntity eNew = service.save(e);
        return new ResponseEntity<>(eNew, HttpStatus.CREATED);
    }

    @PutMapping("/put")
    public ResponseEntity<SampleEntity> update(@RequestBody SampleEntity e){
        SampleEntity eNew = service.save(e);
        return new ResponseEntity<>(eNew, HttpStatus.OK);
    }

    @DeleteMapping("/del/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id){
        service.deleteById(id);
        return new ResponseEntity<>( HttpStatus.OK);
    }
}
