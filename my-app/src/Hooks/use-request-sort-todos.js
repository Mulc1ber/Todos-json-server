import { useState } from 'react';

export const useRequestSortTodos = (refreshTodos) => {
    const [isSort, setIsSort] = useState(false);

    const requestSortTodos = () => {
        setIsSort(true);

        fetch('http://localhost:3005/todos?sortBy=title&order=asc')
            .then((rawResponse) => rawResponse.json())
            .then((response) => {
                console.log(response);
                refreshTodos();
            })
            .finally(() => {
                setIsSort(false);
            });
    };

    return {
        isSort,
        requestSortTodos,
    };
};
