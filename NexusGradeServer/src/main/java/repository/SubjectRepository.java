package repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import model.Subject;
import utils.JPAUtil;

import java.util.List;

public class SubjectRepository {
    @PersistenceContext
    private EntityManager em;

    public SubjectRepository() {this.em = JPAUtil.getEntityManager();}
    public Subject findById(int id) {
        return em.find(Subject.class, id);
    }

    public List<Subject> findAll() {
        return em.createQuery("SELECT s FROM Subject s", Subject.class).getResultList();
    }

    public void save(Subject subject) {
        em.getTransaction().begin();
        em.persist(subject);
        em.getTransaction().commit();
    }

    public void update(Subject subject) {
        em.getTransaction().begin();
        em.merge(subject);
        em.getTransaction().commit();
    }

    public void deleteById(int id) {
        em.getTransaction().begin();
        Subject subject = em.find(Subject.class, id);
        if (subject != null) {
            em.remove(subject);
        }
        em.getTransaction().commit();
    }
}