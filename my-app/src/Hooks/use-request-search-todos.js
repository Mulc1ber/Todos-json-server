export const useRequestSearchTodos = (refreshTodos) => {
    const requestSearchTodos = (searchValue, setListTodos) => {
        if (!searchValue) {
            refreshTodos();
            return;
        }

        fetch(`http://localhost:3005/todos?q=${searchValue}`)
            .then((rawResponse) => rawResponse.json())
            .then((response) => {
                // console.log('Список совпадающих задач: ', response);
                if (response.length === 0) {
                    // console.log('Ничего не найдено');
                    setListTodos([]);
                } else {
                    const filtered = response.filter((todo) =>
                        todo.title.toLowerCase().includes(searchValue.toLowerCase()),
                    );
                    setListTodos(filtered);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return {
        requestSearchTodos,
    };
};
