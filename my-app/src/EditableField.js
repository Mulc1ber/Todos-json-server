import { useState } from 'react';

const EditableField = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState("Текст для редактирования");
    const [list, setList] = useState(["Текст 1", "Текст 2", "Текст 3"]);
  
    const handleEdit = (index) => {
      setIsEditing(index);
    };
  
    const handleChange = (e, index) => {
      const newList = [...list];
      newList[index] = e.target.value;
      setList(newList);
    };
  
    const handleSave = (index) => {
      setIsEditing(false);
      // Добавьте здесь логику сохранения изменений
    };
  
    return (
      <ul>
        {list.map((item, index) => (
          <li key={index}>
            {isEditing === index ? (
              <input
                type="text"
                value={item}
                onChange={(e) => handleChange(e, index)}
                onBlur={() => handleSave(index)}
              />
            ) : (
              <div onClick={() => handleEdit(index)}>
                {item}
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  };
  
  export default EditableField;