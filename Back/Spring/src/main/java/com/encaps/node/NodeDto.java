package com.encaps.node;

import java.util.ArrayList;
import java.util.List;

public class NodeDto {

    Long id;
    String title;
    Long parentId;
    List<NodeDto> nodes = new ArrayList<>();
    Integer role;

    public Integer getRole() {
        return role;
    }

    public void setRole(Integer role) {
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }


    public List<NodeDto> getNodes() {
        return nodes;
    }

    public void setNodes(List<NodeDto> nodes) {
        this.nodes = nodes;
    }

    public static NodeDto map(NodeEntity e) {
        var dto = new NodeDto();
        dto.setId(e.getId());
        dto.setTitle(e.getTitle());
        dto.setRole(e.getRole());
        dto.setParentId(e.getParentId());
        return dto;
    }

    @Override
    public String toString() {
        return "\nNodeEntityDto{" +
                "id=" + id +
                ", title='" + title + '\'' +
                '}';
    }

    public static NodeDto clone(NodeDto e) {
        var dto = new NodeDto();
        dto.setId(e.getId());
        dto.setTitle(e.getTitle());
        return dto;
    }
}
