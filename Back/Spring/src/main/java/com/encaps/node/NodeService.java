package com.encaps.node;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class NodeService {

//    NodeRepository repo1;

    @Autowired
    NodeRepositoryDynamoDB repo;

//    @Autowired
//    public NodeService(NodeRepository repo) {
//        this.repo = repo;
//    }


    public NodeService() {

    }

    @Bean(name = "cmdRunnerNode")
    CommandLineRunner commandLineRunner() {
        return args -> {
//            System.out.println(Arrays.toString(args));
        };
    }

    public void testTreePopulate() {
        var p1 = this.save(new NodeEntity("PARENT1").setRole(1));
        this.save(new NodeEntity("child1.1", p1.getId()).setRole(2));

        var p11 = this.save(new NodeEntity("PARENT1.1", p1.getId()).setRole(1));
        this.save(new NodeEntity("child1.1.1", p11.getId()).setRole(2));
        this.save(new NodeEntity("child1.1.2", p11.getId()).setRole(2));

        var p2 = this.save(new NodeEntity("PARENT2").setRole(1));
        this.save(new NodeEntity("child2.1", p2.getId()).setRole(2));
        this.save(new NodeEntity("child2.2", p2.getId()).setRole(2));
        this.save(new NodeEntity("child2.3", p2.getId()).setRole(2));
    }

    public NodeEntity create(String title, Long categId) {
        NodeEntity item = new NodeEntity();
        item.setTitle(title);
        item.setParentId(categId);
        return this.save(item);
    }

    public List<NodeEntity> findAllByParentId(Long id) {
        if (id == null || id == 0)
            return repo.findAll();

        return repo.findAllByParentId(id);
    }

    public NodeEntity findById(Long id) {
        var item = repo.findById(id);
        return item.orElseThrow(() -> new IllegalArgumentException("Not found"));
    }

    public List<NodeEntity> findAll() {
        return repo.findAll();
    }

    NodeEntity save(NodeEntity e) {
        if (e.getParentId() < 1)
            e.setParentId(null);
        //return repo.save(e);
        return repo.save(e);
    }

    void deleteById(Long id) {
        repo.deleteById(id);
    }

    public List<NodeDto> findCategsTreeForRoot(Long categId) {
        //TODO remove after optimization
        repo.findAll();
        return findAllRecursiveByParentId(categId);
    }

    private List<NodeDto> findAllRecursiveByParentId(Long parentId) {
        var listDto = new ArrayList<NodeDto>();

        if (parentId == null) parentId = 0L;
        List<NodeEntity> list = repo.findAllByParentId(parentId);

        for (NodeEntity e : list) {
            NodeDto dto = NodeDto.map(e);

            dto.setNodes(findAllRecursiveByParentId(dto.getId()));
            listDto.add(dto);
        }

        return listDto;
    }

    void getNodeParentsRecurs(Long categId, List<NodeEntity> listSrc, List<NodeEntity> listDst) {
        var categThis = listSrc.stream()
                .filter(c -> c.getId().equals(categId)).findFirst();

        if (categThis.isEmpty())
            return;

        var categParent = listSrc.stream()
                .filter(c -> c.getId().equals(categThis.get().getParentId())).findFirst();

        if (categParent.isEmpty())
            return;

        listDst.add(categParent.get());

        getNodeParentsRecurs(categParent.get().getId(), listSrc, listDst);
    }

    public void deleteAll() {
        repo.deleteAll();
    }

    public List<NodeDto> transformTreeToPlainList(List<NodeDto> list) {
        var listPlain = new ArrayList<NodeDto>();
        traverseTree(list, listPlain);
        listPlain.forEach(e -> e.setNodes(List.of()));
        return listPlain;
    }

    void traverseTree(List<NodeDto> listSrc, List<NodeDto> listDst) {
        for (NodeDto categ : listSrc) {
            listDst.add(categ);
            traverseTree(categ.getNodes(), listDst);
        }
    }

    public NodeEntity post(NodeEntity entity_) {
        Long id = entity_.getId();
        NodeEntity entity = new NodeEntity();
        if (id != null && id > 0)
            entity = this.findById(id);

        entity.setTitle(entity_.getTitle());
        entity.setRole(entity_.getRole());
        entity.setParentId(entity_.getParentId());
        return this.save(entity);
    }

    public NodeEntity patch(NodeEntity entity_) {
        NodeEntity entity = this.findById(entity_.getId());
        entity.setTitle(entity_.getTitle());
        entity.setRole(entity_.getRole());
        entity.setParentId(entity_.getParentId());
        return this.save(entity);
    }

    // TODO
//    public List<NodeEntity> getNodeParents(Long categId) {
//        var listParents = new ArrayList<NodeEntity>();
//        var listPlain = repo.findAll();
//        getNodeParentsRecurs(categId, listPlain, listParents);
//        Collections.reverse(listParents);
//        return listParents;
//    }

    public List<NodeDto> findByTitleAndParent(String title, Long parentId) {
        var listNodes = findCategsTreeForRoot(parentId);
        listNodes = transformTreeToPlainList(listNodes);
        var listNodesIds = listNodes.stream()
                .map(n -> n.getId())
                .collect(Collectors.toList());

        var list = repo.findAll().stream()
                .filter(n -> listNodesIds.contains(n.getId()))
                .filter(n -> n.getTitle().contains(title))
                .map(n-> NodeDto.map(n))
                .collect(Collectors.toList());
        return list;
    }
}
