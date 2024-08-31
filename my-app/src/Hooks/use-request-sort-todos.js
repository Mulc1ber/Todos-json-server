export const useRequestSortTodos = (refreshTodos) => {
    const requestSortTodos = (sortTodos, setListTodos) => {
        if (sortTodos) {
            refreshTodos();
            return;
        }

        fetch('http://localhost:3005/todos?_sort=title')
            .then((rawResponse) => rawResponse.json())
            .then((response) => {
                // console.log('Сортировка задач:', response);
                setListTodos(response);
            });
    };

    return {
        requestSortTodos,
    };
};
