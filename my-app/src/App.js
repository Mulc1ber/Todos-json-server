import { useState } from 'react';
import { ListTodo } from './Components/ListTodo/ListTodo';
import { Button } from './Components/Button/Button';
import {
    useRequestGetTodos,
    useRequestAddTodo,
    // useRequestUpdateTodo,
    useRequestDeleteTodo,
    useRequestSearchTodos,
    useRequestSortTodos,
} from './Hooks';
import styles from './App.module.css';

export const App = () => {
    const [inputTodo, setInputTodo] = useState('');
    const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [listTodos, setListTodos] = useState([]);
    const [hasSort, setHasSort] = useState(false);

    const refreshTodos = () => setRefreshTodosFlag(!refreshTodosFlag);

    const updateListTodos = (upList) => setListTodos(upList);

    // const sortTodos = () => setHasSort(!hasSort);

    const { isLoading, todos } = useRequestGetTodos(refreshTodosFlag, updateListTodos);

    const { isCreating, requestAddTodo } = useRequestAddTodo(refreshTodos);
    const { isDeleting, requestDeteleTodo } = useRequestDeleteTodo(refreshTodos);
    // const {} = useRequestUpdateTodo();

    const { isSearching, requestSearchTodos } = useRequestSearchTodos(
        refreshTodos,
        updateListTodos,
    );
    const { requestSortTodos } = useRequestSortTodos(refreshTodos, updateListTodos);

    const handleSort = () => {
        requestSortTodos(hasSort);
        setHasSort(!hasSort);
    };

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
                        onKeyDown={(e) =>
                            e.key === 'Enter' ? requestAddTodo(inputTodo, setInputTodo) : null
                        }
                    />
                    <Button
                        onClick={() => requestAddTodo(inputTodo, setInputTodo)}
                        disabled={isCreating}
                    >
                        Добавить задачу
                    </Button>
                </div>

                <div style={{ display: 'flex', gap: '5px', width: '100%' }}>
                    <input
                        style={{ flexGrow: 1 }}
                        type="search"
                        placeholder="Поиск"
                        value={searchValue}
                        onChange={({ target }) => setSearchValue(target.value)}
                    />
                    <Button onClick={() => requestSearchTodos(searchValue)} disabled={isSearching}>
                        Поиск
                    </Button>
                </div>

                <div>
                    <Button onClick={handleSort}>Сортировать</Button>
                </div>

                <div className={styles.listTodos}>
                    {isLoading ? (
                        <div className={styles.loader}></div>
                    ) : listTodos.length !== 0 ? (
                        listTodos.map(({ id, title }, index) => (
                            <ListTodo
                                key={id}
                                id={id}
                                title={title}
                                index={index}
                                isDeleting={isDeleting}
                                requestDeteleTodo={requestDeteleTodo}
                            />
                        ))
                    ) : (
                        todos.map(({ id, title }, index) => (
                            <ListTodo
                                key={id}
                                id={id}
                                title={title}
                                index={index}
                                isDeleting={isDeleting}
                                requestDeteleTodo={requestDeteleTodo}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
