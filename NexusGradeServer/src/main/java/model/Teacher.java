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
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "teachers_id_gen"
    )
    @SequenceGenerator(
            name = "teachers_id_gen",
            sequenceName = "\"teachers_teacherId_seq\"",
            allocationSize = 1
    )
    @Column(name = "\"teacherId\"", nullable = false)
    private Integer id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "\"userId\"", nullable = false)
    private User users;

    @Column(name = "firstname", nullable = false, length = Integer.MAX_VALUE)
    private String firstName;

    @Column(name = "lastname", nullable = false, length = Integer.MAX_VALUE)
    private String lastName;

    @OneToMany(mappedBy = "teacherId")
    private Set<Subject> subjects = new LinkedHashSet<>();
}