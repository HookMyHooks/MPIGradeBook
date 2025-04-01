package repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import model.Subject;

import java.util.List;

public class SubjectRepository {
    @PersistenceContext
    private EntityManager em;

    public Subject findById(int id) {
        return em.find(Subject.class, id);
    }

    public List<Subject> findAll() {
        return em.createQuery("SELECT s FROM Subject s", Subject.class).getResultList();
    }

    public void save(Subject subject) {
        em.persist(subject);
    }

    public void update(Subject subject) {
        em.merge(subject);
    }

    public void delete(Subject subject) {
        em.remove(subject);
    }
}