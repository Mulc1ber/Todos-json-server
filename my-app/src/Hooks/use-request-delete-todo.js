import { useState } from 'react';

export const useRequestDeleteTodo = (refreshTodos) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const requestDeteleTodo = (id) => {
        setIsDeleting(true);
        console.log('id button', id);
        fetch(`http://localhost:3005/todos/${id}`, {
            method: 'DELETE',
        })
            .then((rawResponse) => rawResponse.json())
            .then((response) => {
                console.log('Удаление задачи:', response);
                refreshTodos();
            })
            .finally(() => {
                setIsDeleting(false);
            });
    };

    return {
        isDeleting,
        requestDeteleTodo,
    };
};
