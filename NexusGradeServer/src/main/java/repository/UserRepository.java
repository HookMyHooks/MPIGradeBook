package repository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import model.Student;
import model.User;

import java.util.List;
public class UserRepository {
    @PersistenceContext
    private EntityManager em;

    public User findById(int id) {
        return em.find(User.class, id);
    }

    public List<User> findAll() {
        return em.createQuery("SELECT u FROM User u", User.class).getResultList();
    }

    public void save(User user) {
        em.persist(user);
    }

    public void update(User user) {
        em.merge(user);
    }

    public void delete(User user) {
        em.remove(user);
    }

    public boolean isStudent(int userId) {
        return this.findById(userId) != null;
    }
    public boolean isTeacher(int userId) {
        return this.findById(userId) != null;
    }


    public User findByUsername(String username) {
        try {
            return em.createQuery("SELECT u FROM User u WHERE u.username = :username", User.class)
                    .setParameter("username", username)
                    .getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

}