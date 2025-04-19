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
    @JoinColumn(name = "\"teacherId\"")
    private Teacher teacherId;

    @OneToMany(mappedBy = "subject")
    private Set<Grade> grades = new LinkedHashSet<>();
}