package repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import model.Grade;
import utils.JPAUtil;

import java.util.List;

public class GradeRepository {
    @PersistenceContext
    private EntityManager em;

    public GradeRepository() {
        this.em = JPAUtil.getEntityManager();
    }

    public Grade findById(int id) {
        return em.find(Grade.class, id);
    }

    public List<Grade> findAll() {
        return em.createQuery("SELECT g FROM Grade g", Grade.class).getResultList();
    }

    public void save(Grade grade) {
        em.getTransaction().begin();
        em.persist(grade);
        em.getTransaction().commit();
    }

    public void update(Grade grade) {
        em.getTransaction().begin();
        em.merge(grade);
        em.getTransaction().commit();
    }

    public void deleteById(int id) {
        em.getTransaction().begin();
        Grade grade = em.find(Grade.class, id);
        if (grade != null) {
            em.remove(grade);
        }
        em.getTransaction().commit();
    }
}