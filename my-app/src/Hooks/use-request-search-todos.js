import { useState } from 'react';

export const useRequestSearchTodos = (refreshTodos, updateListTodos) => {
    const [isSearching, setIsSearching] = useState(false);

    const requestSearchTodos = (searchValue) => {
        if (!searchValue) {
            console.log('Пустое значение в поле "ПОИСК"');
            updateListTodos([]);
            return;
        }

        setIsSearching(true);
        fetch(`http://localhost:3005/todos?title_like=${searchValue}`)
            .then((rawResponse) => rawResponse.json())
            .then((response) => {
                console.log(response);
                updateListTodos(response);
                refreshTodos();
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsSearching(false);
            });
    };

    return {
        isSearching,
        requestSearchTodos,
    };
};
