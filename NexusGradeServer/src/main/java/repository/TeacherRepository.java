package repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import model.Teacher;
import utils.JPAUtil;

import java.util.List;

public class TeacherRepository {
    @PersistenceContext
    private EntityManager em;

    public TeacherRepository() {
        this.em = JPAUtil.getEntityManager();
    }

    public Teacher findById(int id) {
        return em.find(Teacher.class, id);
    }

    public List<Teacher> findAll() {
        return em.createQuery("SELECT t FROM Teacher t", Teacher.class).getResultList();
    }

    public void save(Teacher teacher) {
        em.persist(teacher);
    }

    public void update(Teacher teacher) {
        em.merge(teacher);
    }

    public void delete(Teacher teacher) {
        em.remove(teacher);
    }

    public Teacher findByUserId(int userId) {
        try {
            return em.createQuery(
                    "SELECT t FROM Teacher t WHERE t.users.id = :uid", Teacher.class)
                    .setParameter("uid", userId)
                    .getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }
}