package repository;
import jakarta.persistence.EntityManager;
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
}