package com.example.todo;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TodoRepository extends JpaRepository<TodoItem, Long> {
    //interface that returns data from the data base
    @Query(
        "SELECT t FROM TodoItem t " +
        "ORDER BY CASE " +
        "   WHEN t.priority = 'HIGH' THEN 1 " +
        "   WHEN t.priority = 'MEDIUM' THEN 2 " +
        "   ELSE 3 " +
        "END ASC"
)
List<TodoItem> findAllByOrderByPriorityCustom();

void deleteByCompletedTrue();
List<TodoItem> findByDescriptionContainingIgnoreCase(String search);
List<TodoItem> findByDescriptionContainingIgnoreCase(String search, Sort sort);

  
    //to be completed : search query, and notifcations/times to be completed
}