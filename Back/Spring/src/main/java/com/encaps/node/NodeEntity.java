package com.encaps.node;

import jakarta.persistence.*;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbPartitionKey;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "Node")
@DynamoDbBean
public class NodeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String descr;
    private Long parentId;
    private Integer sortPosition;
    private Boolean isHidden;
    private LocalDateTime createdOn;
    private LocalDateTime updatedOn;
    private String img;
    private Integer role;

    public NodeEntity() {
        this.id = System.currentTimeMillis();
        this.parentId = 0L;
    }

    public NodeEntity(String title) {
        this();
        this.title = title;
    }

    public NodeEntity(String title, long  parentId) {
        this(title);
        this.parentId = parentId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        NodeEntity that = (NodeEntity) o;
        return id.equals(that.id) && title.equals(that.title);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title);
    }

    @Override
    public String toString() {
        return "Entity{" +
                "id=" + id +
                ", title='" + title + '\'' +
                '}';
    }

    public void setId(Long id) {
        this.id = id;
    }

    @DynamoDbPartitionKey
    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescr() {
        return descr;
    }

    public void setDescr(String descr) {
        this.descr = descr;
    }

    public Long getParentId() {
        return parentId;
    }

    public NodeEntity setParentId(Long parentId) {
        this.parentId = parentId;
        return this;
    }

    public Integer getSortPosition() {
        return sortPosition;
    }

    public void setSortPosition(Integer sortPosition) {
        this.sortPosition = sortPosition;
    }

    public Boolean getHidden() {
        return isHidden;
    }

    public void setHidden(Boolean hidden) {
        isHidden = hidden;
    }

    public LocalDateTime getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(LocalDateTime createdOn) {
        this.createdOn = createdOn;
    }

    public LocalDateTime getUpdatedOn() {
        return updatedOn;
    }

    public void setUpdatedOn(LocalDateTime updatedOn) {
        this.updatedOn = updatedOn;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    @PrePersist
    public void prePersist() {
        createdOn = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        updatedOn = LocalDateTime.now();
    }

    public Integer getRole() {
        return role;
    }

    public NodeEntity setRole(Integer role) {
        this.role = role;
        return this;
    }
}
