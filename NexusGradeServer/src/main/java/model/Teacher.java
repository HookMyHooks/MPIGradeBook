package model;

import jakarta.persistence.*;

import java.util.LinkedHashSet;
import java.util.Set;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@NoArgsConstructor

@Getter
@Setter
@Entity
@Table(name = "teachers")
public class Teacher {
    @Id
    @Column(name = "\"teacherId\"", nullable = false)
    private Integer id;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "\"teacherId\"", nullable = false)
    private model.User users;

    @Column(name = "firstname", nullable = false, length = Integer.MAX_VALUE)
    private String firstName;

    @Column(name = "lastname", nullable = false, length = Integer.MAX_VALUE)
    private String lastName;

    @OneToMany(mappedBy = "teacherId")
    private Set<Subject> subjects = new LinkedHashSet<>();
}