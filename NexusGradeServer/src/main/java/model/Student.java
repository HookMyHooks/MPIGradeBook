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
@Table(name = "students")
public class Student {
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "students_id_gen"
    )
    @SequenceGenerator(
            name = "students_id_gen",
            sequenceName = "students_studentid_seq",
            allocationSize = 1
    )
    @Column(name = "studentid", nullable = false)
    private Integer id;

    @OneToOne(fetch = FetchType.LAZY, optional = false, cascade = CascadeType.ALL)
    @JoinColumn(name = "\"userId\"", nullable = false)
    private User users;

    @Column(name = "first_name", nullable = false, length = Integer.MAX_VALUE)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = Integer.MAX_VALUE)
    private String lastName;

    @OneToMany(mappedBy = "student")
    private Set<Grade> grades = new LinkedHashSet<>();
}