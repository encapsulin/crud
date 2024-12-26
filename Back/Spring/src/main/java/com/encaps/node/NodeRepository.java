package com.encaps.node;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface NodeRepository extends JpaRepository<NodeEntity, Long> {

    @Query
    List<NodeEntity> findAllByParentId(Long parentId);
}
