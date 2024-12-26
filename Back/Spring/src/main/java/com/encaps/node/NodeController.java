package com.encaps.node;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/nodes")
@CrossOrigin(origins = "*")
public class NodeController {

    @Autowired
    NodeService service;

    static final Logger LOG = LoggerFactory.getLogger(NodeController.class);

    @GetMapping()
    ResponseEntity<List<NodeEntity>> listAll() {
        return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    ResponseEntity<NodeEntity> findById(@PathVariable Long id) {
        return new ResponseEntity<>(service.findById(id), HttpStatus.OK);
    }

    @PostMapping("/post")
    ResponseEntity<NodeEntity> post(@RequestBody NodeEntity entity) {
        return new ResponseEntity<>(service.post(entity), HttpStatus.CREATED);
    }

    @PatchMapping("/patch")
    ResponseEntity<NodeEntity> patch(@RequestBody NodeEntity entity) {
        LOG.info("patch({})", entity.getId());
        return new ResponseEntity<>(service.patch(entity), HttpStatus.OK);
    }

    @DeleteMapping("/del/{id}")
    ResponseEntity<String> delete(@PathVariable Long id) {
        LOG.info("delete({})", id);
        //throw new RuntimeException("del");
        service.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(path = {"/byParent/{id}"})
    Object itemsForCateg(@PathVariable Long id) {
        return service.findAllByParentId(id);
    }

    ///////////////////////////////////////////////////
    @GetMapping(path = {"/tree"})
    List<NodeDto> list(@RequestParam(required = false) String hidden) {
        return service.findCategsTreeForRoot(null);
    }

    @GetMapping(path = "/search")
    List<NodeDto> search(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) Long id) {
        return service.findByTitleAndParent(title, id);
    }

    @GetMapping("/")
    List<NodeDto> findAll() {
        return service.findAll().stream()
                .map(n -> NodeDto.map(n))
                .collect(Collectors.toList());
    }
}
