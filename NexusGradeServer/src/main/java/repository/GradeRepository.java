package repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import model.Grade;
import utils.JPAUtil;

import java.util.List;

public class GradeRepository {
    @PersistenceContext
    private EntityManager em;

    public GradeRepository()
    {
        this.em = JPAUtil.getEntityManager();
    }
    public Grade findById(int id) {
        return em.find(Grade.class, id);
    }

    public List<Grade> findAll() {
        return em.createQuery("SELECT g FROM Grade g", Grade.class).getResultList();
    }

    public void save(Grade grade) {
        em.persist(grade);
    }

    public void update(Grade grade) {
        em.merge(grade);
    }

    public void delete(Grade grade) {
        em.remove(grade);
    }
}