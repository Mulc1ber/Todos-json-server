import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useRequestUpdateTodo } from '../../Hooks';
import styles from './Todo.module.css';
import { Button } from '../Button/Button';

export const Todo = ({ id, title, index, isDeleting, requestDeteleTodo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [titleState, setTitleState] = useState(title);

    const { requestUpdateTodo } = useRequestUpdateTodo();

    const refInput = useRef();

    useEffect(() => {
        if (isEditing || isEditing === 0) {
            refInput.current?.focus();
        }
    }, [isEditing]);

    const handleInputBlur = () => {
        requestUpdateTodo(id, titleState);
        setIsEditing(false);
    };

    return (
        <li key={id} className={styles.items}>
            {isEditing === index ? (
                <>
                    <input
                        type="text"
                        value={titleState}
                        onChange={({ target }) => setTitleState(target.value)}
                        onBlur={handleInputBlur}
                        ref={refInput}
                        className={styles.inputEdit}
                    />
                </>
            ) : (
                <>
                    <span>{titleState}</span>
                    <div className={styles.wrapButtons}>
                        <Button onClick={requestDeteleTodo} disabled={isDeleting}>
                            Удалить
                        </Button>
                        <Button onClick={() => setIsEditing(index)}>Изменить</Button>
                    </div>
                </>
            )}
        </li>
    );
};
