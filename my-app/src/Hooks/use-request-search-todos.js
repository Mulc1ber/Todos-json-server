export const useRequestSearchTodos = (refreshTodos) => {
    const requestSearchTodos = (searchValue, setListTodos) => {
        if (!searchValue) {
            refreshTodos();
            return;
        }

        fetch(`http://localhost:3005/todos?title_like=${searchValue}`)
            .then((rawResponse) => rawResponse.json())
            .then((response) => {
                // console.log('Список совпадающих задач: ', response);
                if (response.length === 0) {
                    // console.log('Ничего не найдено');
                    setListTodos([]);
                } else {
                    setListTodos(response);
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
