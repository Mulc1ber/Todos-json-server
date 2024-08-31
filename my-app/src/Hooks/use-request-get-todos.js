export const useRequestGetTodos = () => {
    const requestGetTodos = (setListTodos, setIsLoading) => {
        setIsLoading(true);
        fetch('http://localhost:3005/todos')
            .then((loadedData) => loadedData.json())
            .then((loadedTodos) => {
                setListTodos(loadedTodos);
            })
            .finally(() => setIsLoading(false));
    };

    return {
        requestGetTodos,
    };
};
