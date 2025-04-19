package repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import model.Student;
import utils.JPAUtil;

import java.util.List;

public class StudentRepository {
    @PersistenceContext
    private EntityManager em;

    public StudentRepository() {
        this.em = JPAUtil.getEntityManager();
    }

    public Student findById(int id) {
        return em.find(Student.class, id);
    }

    public List<Student> findAll() {
        return em.createQuery("SELECT s FROM Student s", Student.class).getResultList();
    }

    public void save(Student student) {
        em.persist(student);
    }

    public void update(Student student) {
        em.merge(student);
    }

    public void delete(Student student) {
        em.remove(student);
    }

    public Student findByUserId(int userId) {
        try {
            return em.createQuery(
                    "SELECT s FROM Student s WHERE s.users.id = :uid", Student.class)
                    .setParameter("uid", userId)
                    .getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }
}
