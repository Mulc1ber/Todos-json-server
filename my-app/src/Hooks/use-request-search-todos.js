export const useRequestSearchTodos = (refreshTodos, updateListTodos) => {
    const requestSearchTodos = (searchValue) => {
        if (!searchValue) {
            updateListTodos([]);
            return;
        }

        fetch(`http://localhost:3005/todos?title_like=${searchValue}`)
            .then((rawResponse) => rawResponse.json())
            .then((response) => {
                console.log('response SEARCH: ', response, response.length === 0);
                if (response.length === 0) {
                    console.log('Ничего не найдено');
                    updateListTodos([]);
                    return;
                }

                updateListTodos(response);
                // refreshTodos();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return {
        requestSearchTodos,
    };
};
