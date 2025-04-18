package repository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import model.Student;
import model.User;
import resource.UserResource;
import utils.JPAUtil;

import java.util.List;
public class UserRepository {
    @PersistenceContext
    private EntityManager em;

    public UserRepository()
    {
        this.em = JPAUtil.getEntityManager();
    }


    public User findById(int id) {
        return em.find(User.class, id);
    }

    public List<User> findAll() {
        return em.createQuery("SELECT u FROM User u", User.class).getResultList();
    }


    public User findByEmail(String email) {
        try {
            return em.createQuery("SELECT u FROM User u WHERE u.email = :email", User.class)
                    .setParameter("email", email).getSingleResult();
        }catch (NoResultException e) {
            return null;
        }
    }
    public void save(User user) {
        em.getTransaction().begin();
        em.persist(user);
        em.getTransaction().commit(); // ← ensure the data is committed
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