// import { useState } from 'react';

export const useRequestSortTodos = (refreshTodos, updateListTodos) => {
    const requestSortTodos = (sortTodos) => {
        // false - id; true - title
        if (sortTodos) {
            updateListTodos([]);
            return;
        }

        fetch('http://localhost:3005/todos?_sort=title')
            .then((rawResponse) => rawResponse.json())
            .then((response) => {
                console.log('Сортировка задач:', response);
                updateListTodos(response);
                refreshTodos();
            });
    };

    return {
        requestSortTodos,
    };
};
