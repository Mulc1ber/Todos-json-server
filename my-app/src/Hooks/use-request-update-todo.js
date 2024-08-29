// import { useState, useEffect } from 'react';


// const EditableField = () => {
//     const [isEditing, setIsEditing] = useState(false);
//     const [value, setValue] = useState("Текст для редактирования");
  
//     const handleEdit = () => {
//       setIsEditing(true);
//     };
  
//     const handleChange = (e) => {
//       setValue(e.target.value);
//     };
  
//     const handleSave = () => {
//       setIsEditing(false);
//       // Добавьте здесь логику сохранения изменений
//     };
  
//     if (isEditing) {
//       return (
//         <input
//           type="text"
//           value={value}
//           onChange={handleChange}
//           onBlur={handleSave}
//         />
//       );
//     } else {
//       return (
//         <div onClick={handleEdit}>
//           {value}
//         </div>
//       );
//     }
//   };
  
//   export default EditableField;