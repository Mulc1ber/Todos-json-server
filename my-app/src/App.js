import { useState } from 'react';
import styles from './App.module.css';
import {
    useRequestGetTodos,
    useRequestAddTodo,
    // useRequestUpdateTodo,
    useRequestDeleteTodo,
    useRequestSearchTodos,
    useRequestSortTodos,
} from './Hooks';

export const App = () => {
    const [inputTodo, setInputTodo] = useState('');
    const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const refreshTodos = () => setRefreshTodosFlag(!refreshTodosFlag);

    const { isLoading, todos } = useRequestGetTodos(refreshTodosFlag);

    const { isCreating, requestAddTodo } = useRequestAddTodo(refreshTodos);

    // const {} = useRequestUpdateTodo();

    const { isDeleting, requestDeteleTodo } = useRequestDeleteTodo(refreshTodos);

    const { isSearching, searchResults, requestSearchTodos } = useRequestSearchTodos();

    const { isSort, requestSortTodos } = useRequestSortTodos(refreshTodos);

    // const [todos, setTodos] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    // const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);

    // const refreshTodos = () => setRefreshTodosFlag(!refreshTodosFlag);

    // useEffect(() => {
    //     setIsLoading(true);

    //     fetch('http://localhost:3005/todos')
    //         .then((loadedData) => loadedData.json())
    //         .then((loadedTodos) => {
    //             setTodos(loadedTodos);
    //         })
    //         .finally(() => setIsLoading(false));
    // }, [refreshTodosFlag]);

    // const requestAddTodo = () => {
    //     fetch('http://localhost:3005/todos', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json;charset=utf-8' },
    //         body: JSON.stringify({
    //             title: 'задача с помощью json server22',
    //         }),
    //     })
    //         .then((rawResponse) => rawResponse.json())
    //         .then((response) => {
    //             console.log(response);
    //             refreshTodos();
    //         });
    // };

    return (
        <div className={styles.app}>
            <h1 style={{ textAlign: 'center' }}>Todos JSON Server</h1>
            <div className={styles.todos}>
                <div style={{ display: 'flex', gap: '5px', width: '100%' }}>
                    <input
                        style={{ flexGrow: 1 }}
                        type="text"
                        placeholder="Новая задача"
                        value={inputTodo}
                        onChange={({ target }) => setInputTodo(target.value)}
                    />
                    <button
                        onClick={() => requestAddTodo(inputTodo, setInputTodo)}
                        disabled={isCreating}
                    >
                        Добавить задачу
                    </button>
                </div>

                <div style={{ display: 'flex', gap: '5px', width: '100%' }}>
                    <input
                        style={{ flexGrow: 1 }}
                        type="search"
                        placeholder="Поиск"
                        value={searchValue}
                        onChange={({ target }) => setSearchValue(target.value)}
                    />
                    <button onClick={() => requestSearchTodos(searchValue)} disabled={isSearching}>
                        Поиск
                    </button>
                </div>

                <div>
                    <button onClick={requestSortTodos} disabled={isSort}>
                        Сортировать
                    </button>
                </div>

                <div className={styles.listTodos}>
                    {console.log()}
                    {isLoading ? (
                        <div className={styles.loader}></div>
                    ) : searchResults.length !== 0 ? (
                        searchResults.map(({ id, title }) => (
                            <li key={id} className={styles.items}>
                                <span>{title}</span>
                                <div>
                                    <button
                                        id={id}
                                        onClick={() => requestDeteleTodo(id)}
                                        disabled={isDeleting}
                                    >
                                        Удалить
                                    </button>
                                    <button>Изменить</button>
                                </div>
                            </li>
                        ))
                    ) : (
                        todos.map(({ id, title }) => (
                            <li key={id} className={styles.items}>
                                <span>{title}</span>
                                <div>
                                    <button
                                        id={id}
                                        onClick={() => requestDeteleTodo(id)}
                                        disabled={isDeleting}
                                    >
                                        Удалить
                                    </button>
                                    <button>Изменить</button>
                                </div>
                            </li>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
