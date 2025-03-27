package model;

import jakarta.persistence.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "teachers")
public class Teacher {
    @Id
    @Column(name = "teacherid", nullable = false)
    private Integer id;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "teacherid", nullable = false)
    private model.User users;

    @Column(name = "first_name", nullable = false, length = Integer.MAX_VALUE)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = Integer.MAX_VALUE)
    private String lastName;

    @OneToMany(mappedBy = "teacherid")
    private Set<Subject> subjects = new LinkedHashSet<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public model.User getUsers() {
        return users;
    }

    public void setUsers(model.User users) {
        this.users = users;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Set<Subject> getSubjects() {
        return subjects;
    }

    public void setSubjects(Set<Subject> subjects) {
        this.subjects = subjects;
    }

}