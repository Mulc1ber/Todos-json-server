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
    const [isEditing, setIsEditing] = useState(false);
    const [titleEdit, setTitleEdit] = useState('');
    const [listTodos , setListTodos] = useState([]);


    const refreshTodos = () => setRefreshTodosFlag(!refreshTodosFlag);

    const { isLoading, todos } = useRequestGetTodos(refreshTodosFlag);
    
    const { isCreating, requestAddTodo } = useRequestAddTodo(refreshTodos);
    const { isDeleting, requestDeteleTodo } = useRequestDeleteTodo(refreshTodos);
    // const {} = useRequestUpdateTodo();

    const { isSearching, searchResults, requestSearchTodos } = useRequestSearchTodos(refreshTodos);
    const { isSort, requestSortTodos } = useRequestSortTodos(refreshTodos);


    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        setTitleEdit(e.target.value);
    };

    const handleSave = () => {
        setIsEditing(false);
    // Добавьте здесь логику сохранения изменений
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
                        onKeyDown={(e) => (e.key === 'Enter' ? requestAddTodo(inputTodo, setInputTodo) : null)}
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
                    {isLoading ? (
                        <div className={styles.loader}></div>
                    ) : 
                    // searchResults.length !== 0 ? (
                    //     searchResults.map(({ id, title }) => (
                    //         <li key={id} className={styles.items}>
                    //             <span>{title}</span>
                    //             <div>
                    //                 <button
                    //                     onClick={() => requestDeteleTodo(id)}
                    //                     disabled={isDeleting}
                    //                 >
                    //                     Удалить
                    //                 </button>
                    //                 <button>Изменить</button>
                    //             </div>
                    //         </li>
                    //     ))
                    // ) : 
                    (
                        todos.map(({ id, title }) => (
                            <li key={id} className={styles.items}>
                                <span>{title}</span>
                                <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                                    <button
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
