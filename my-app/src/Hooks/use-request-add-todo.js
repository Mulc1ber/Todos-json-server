import { useState } from 'react';

export const useRequestAddTodo = (refreshTodos) => {
    const [isCreating, setIsCreating] = useState(false);

    const requestAddTodo = (inputTodo, setInputTodo) => {
        setIsCreating(true);

        fetch('http://localhost:3005/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
                title: inputTodo,
            }),
        })
            .then((rawResponse) => rawResponse.json())
            .then((response) => {
                console.log('Создание задачи:', response);
                refreshTodos();
            })
            .finally(() => {
                setIsCreating(false);
                setInputTodo('');
            });
    };

    return {
        isCreating,
        requestAddTodo,
    };
};
