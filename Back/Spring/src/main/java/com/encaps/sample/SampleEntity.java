package com.encaps.sample;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
public class SampleEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Integer id;

    String title;

    public SampleEntity() {
    }

    public SampleEntity(String title) {
        this.id = null;
        this.title = title;
    }

    public SampleEntity(int id, String title) {
        this(title);
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SampleEntity that = (SampleEntity) o;
        return id.equals(that.id) && title.equals(that.title);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title);
    }

    @Override
    public String toString() {
        return "SampleEntity{" +
                "id=" + id +
                ", title='" + title + '\'' +
                '}';
    }

}
