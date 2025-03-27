package model;

import jakarta.persistence.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "subjects")
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "subjects_id_gen")
    @SequenceGenerator(name = "subjects_id_gen", sequenceName = "subjects_subjectid_seq", allocationSize = 1)
    @Column(name = "subjectid", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacherid")
    private model.Teacher teacherid;

    @OneToMany(mappedBy = "subject")
    private Set<Grade> grades = new LinkedHashSet<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public model.Teacher getTeacherid() {
        return teacherid;
    }

    public void setTeacherid(model.Teacher teacherid) {
        this.teacherid = teacherid;
    }

    public Set<Grade> getGrades() {
        return grades;
    }

    public void setGrades(Set<Grade> grades) {
        this.grades = grades;
    }

}