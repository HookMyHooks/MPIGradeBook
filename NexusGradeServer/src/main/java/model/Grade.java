package model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "grades")
public class Grade {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "grades_id_gen")
    @SequenceGenerator(name = "grades_id_gen", sequenceName = "grades_gradeid_seq", allocationSize = 1)
    @Column(name = "gradeid", nullable = false)
    private Integer id;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @Column(name = "value", nullable = false)
    private Integer value;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "\"subjectId\"", nullable = false)
    private model.Subject subject;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "\"studentId\"", nullable = false)
    private model.Student student;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Integer getValue() {
        return value;
    }

    public void setValue(Integer value) {
        this.value = value;
    }

    public model.Subject getSubject() {
        return subject;
    }

    public void setSubject(model.Subject subject) {
        this.subject = subject;
    }

    public model.Student getStudent() {
        return student;
    }

    public void setStudent(model.Student student) {
        this.student = student;
    }

}