package com.example.todo;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TodoRepository extends JpaRepository<TodoItem, Long> {
    
  @Query("SELECT t FROM TodoItem t ORDER BY CASE t.priority " +
           "WHEN 'HIGH' THEN 3 " +
           "WHEN 'MEDIUM' THEN 2 " +
           "WHEN 'LOW' THEN 1 " +
           "END DESC")
    List<TodoItem> findAllByOrderByPriorityCustom();


}