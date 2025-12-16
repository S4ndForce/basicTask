package com.example.todo;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.example.todo.enums.Category;
import com.example.todo.enums.Priority;

public interface TodoRepository extends JpaRepository<TodoItem, Long> , JpaSpecificationExecutor<TodoItem> {
    /* 
    @Query(
        "SELECT t FROM TodoItem t " +
        "ORDER BY CASE " +
        "   WHEN t.priority = 'HIGH' THEN 1 " +
        "   WHEN t.priority = 'MEDIUM' THEN 2 " +
        "   ELSE 3 " +
        "END ASC"
    )
    List<TodoItem> findAllByOrderByPriorityCustom();

    

    List<TodoItem> findByDescriptionContainingIgnoreCase(String search);
    List<TodoItem> findByDescriptionContainingIgnoreCase(String search, Sort sort);
    Page<TodoItem> findByDescriptionContainingIgnoreCase(String search, Pageable pageable);


    //custom queries to database
    @Query(
        value = """
            SELECT t FROM TodoItem t
            WHERE LOWER(t.description) LIKE LOWER(CONCAT('%', :search, '%'))
            ORDER BY CASE
                WHEN t.priority = 'HIGH' THEN 1
                WHEN t.priority = 'MEDIUM' THEN 2
                ELSE 3
            END
        """,
        countQuery = """
            SELECT COUNT(t) FROM TodoItem t
            WHERE LOWER(t.description) LIKE LOWER(CONCAT('%', :search, '%'))
        """
    )
    Page<TodoItem> searchAndSortByPriority(String search, Pageable pageable);
    List<TodoItem> findByProjectId(Long projectId);

    */
    long countByCompletedTrue();
    @Query("""
            SELECT t.priority, COUNT(t)
            FROM TodoItem t
            GROUP BY t.priority
            """)
    List<Priority[]> countByPriority();

    @Query("""
            SELECT t.category, COUNT(t)
            FROM TodoItem t
            GROUP BY t.category
            """
            )
    List<Category[]> countByCategory();


    
    void deleteByCompletedTrue();
    void deleteByProjectId(Long projectId);
}
