package org.example;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import model.Student;

import java.util.List;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {
        //TIP Press <shortcut actionId="ShowIntentionActions"/> with your caret at the highlighted text
        // to see how IntelliJ IDEA suggests fixing it.
        System.out.printf("Hello and welcome!");

        EntityManagerFactory emf = Persistence.createEntityManagerFactory("NexusGradePU");
        EntityManager em = emf.createEntityManager();

        List<Student> students = em.createQuery("FROM Student", Student.class).getResultList();
        if(students.isEmpty())
        {
            System.out.println("No students found");
        }
    }
}