import {useState, useEffect} from 'react'
import styles from './App.module.css';

export const App = () => {
    const [todos, setTodos] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)

       fetch('http://localhost:3003/todos')
            .then((loadedData) => loadedData.json())
            .then((loadedTodos) => {
                setTodos(loadedTodos)
            })
            .finally(() => setIsLoading(false))
    }, [])

    return (
        <div className={styles.App}>
            <h1>Todos JSON Server</h1>
            <div>
                <div>
                    <input />
                    <button>Добавить задачу</button>
                    <button>Сортировать</button>
                    <button>Поиск</button>
                </div>
                <div>
                    {isLoading 
                        ? <div className={styles.loader}></div>
                        : todos.map(({id, title}) => (
                            <div key={id} className={styles.todo}>
                                <span>{title}</span>
                                <button>Удалить</button>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};
