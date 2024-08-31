export const useRequestUpdateTodo = () => {
    const requestUpdateTodo = (id, updatedData) => {
        fetch(`http://localhost:3005/todos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({ title: updatedData }),
        })
            .then((rawResponse) => rawResponse.json())
            .then((response) => {
                console.log('Обновление задачи:', response);
            });
    };

    return {
        requestUpdateTodo,
    };
};
