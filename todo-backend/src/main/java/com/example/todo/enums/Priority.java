package com.example.todo.enums;

public enum Priority {
    HIGH(1),
    MEDIUM(2),
    LOW(3);

    private final int order;

    Priority(int order) {
        this.order = order;
    }

    public int getOrder() {
        return order;
    }
}
