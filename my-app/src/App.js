import { useState, useEffect } from 'react';
import { ListTodo } from './Components/ListTodo/ListTodo';
import { Button } from './Components/Button/Button';
import {
    useRequestGetTodos,
    useRequestAddTodo,
    useRequestDeleteTodo,
    useRequestSearchTodos,
    useRequestSortTodos,
} from './Hooks';
import styles from './App.module.css';
import { debounce } from 'lodash';
import { Input } from './Components/Input/Input';

export const App = () => {
    const [inputTodo, setInputTodo] = useState('');
    const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [listTodos, setListTodos] = useState([]);
    const [hasSort, setHasSort] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTasks, setFilteredTasks] = useState(listTodos); // tasks - ваш список задач

    const refreshTodos = () => setRefreshTodosFlag(!refreshTodosFlag);

    const updateListTodos = (upList) => setListTodos(upList);

    const { isLoading, todos } = useRequestGetTodos(refreshTodosFlag);

    const { isCreating, requestAddTodo } = useRequestAddTodo(refreshTodos);
    const { isDeleting, requestDeteleTodo } = useRequestDeleteTodo(refreshTodos);

    const { requestSearchTodos } = useRequestSearchTodos(refreshTodos, updateListTodos);
    const { requestSortTodos } = useRequestSortTodos(refreshTodos, updateListTodos);

    // useEffect(() => {
    //     console.log('useEffect-  setListTodos(todos)', todos);
    //     console.log('useEffect-  setListTodos(listTodos)', listTodos);
    //     // setListTodos(todos);
    //     // setListTodos(listTodos);

    //     // if (searchValue !== '') {

    //     // }
    // }, []);

    const handleSort = () => {
        requestSortTodos(hasSort);
        setHasSort(!hasSort);
    };

    // const handleSearchFilter = (array, searchText) => {
    //     const resultFiltered = array.filter((item) =>
    //         item.title.toLowerCase().includes(searchText.toLowerCase()),
    //     );
    //     return resultFiltered;
    // };

    const handleSearch = debounce((searchTerm) => {
        const filtered = todos.filter((task) =>
            task.title.toLowerCase().includes(searchTerm.toLowerCase()),
        );
        // const filtered = handleSearchFilter(todos, searchTerm);
        setFilteredTasks(filtered);
    }, 300);

    const handleChange = ({ target }) => {
        setSearchTerm(target.value);
        handleSearch(target.value);
        console.log(searchTerm);
        console.log('todos: ', todos);
        console.log('listTodos: ', listTodos);
    };

    const handleSearchValue = ({ target }) => {
        setSearchValue(target.value);
        requestSearchTodos(target.value);
    };

    return (
        <div className={styles.app}>
            <h1 className={styles.header}>Todos JSON Server</h1>
            <div className={styles.todos}>
                <div className={styles.wrapPanel}>
                    <Input
                        type={'text'}
                        placeholder={'Новая задача'}
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

                <div className={styles.wrapPanel}>
                    <Input
                        type={'search'}
                        placeholder={'Поиск'}
                        value={searchValue}
                        onChange={handleSearchValue}
                    />
                    <Input
                        type={'search'}
                        placeholder={'Поиск с debounce'}
                        value={searchTerm}
                        onChange={handleChange}
                    />
                    <Button onClick={handleChange}>test</Button>
                </div>

                <div>
                    <Button className={hasSort ? styles.active : ''} onClick={handleSort}>
                        Сортировать
                    </Button>
                </div>

                <div className={styles.listTodos}>
                    {isLoading ? (
                        <div className={styles.loader}></div>
                    ) : (
                        (searchTerm.length !== 0
                            ? filteredTasks
                            : listTodos.length !== 0 || searchValue !== ''
                              ? listTodos
                              : todos
                        ).map(({ id, title }, index) => (
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
