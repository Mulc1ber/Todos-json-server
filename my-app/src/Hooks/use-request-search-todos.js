import { useState } from 'react';

export const useRequestSearchTodos = (refreshTodos, updateListTodos) => {
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    const requestSearchTodos = (searchValue) => {
        if (!searchValue) {
            console.log('Пустое значение в поле "ПОИСК"');
            // setSearchResults([])
            updateListTodos([])
            return;
        }

        setIsSearching(true);
        fetch(`http://localhost:3005/todos?title_like=${searchValue}`)
            .then((rawResponse) => rawResponse.json())
            .then((response) => {
                console.log(response);
                // setSearchResults(response);
                updateListTodos(response);
                refreshTodos();
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsSearching(false);
            });
    };

    return {
        isSearching,
        // searchResults,
        requestSearchTodos,
    };
};

// import React, { useState } from 'react';

// const SearchResults = () => {
//   const [searchResults, setSearchResults] = useState([]);

//   const handleSearch = async (searchTerm) => {
//     const response = await fetch(`http://localhost:3000/data?title=${searchTerm}`);
//     const data = await response.json();
//     setSearchResults(data);
//   };

//   return (
//     <div>
//       <SearchForm onSearch={handleSearch} />
//       <SearchList results={searchResults} />
//     </div>
//   );
// };

// const SearchForm = ({ onSearch }) => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleInputChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSearch(searchTerm);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         value={searchTerm}
//         onChange={handleInputChange}
//       />
//       <button type="submit">Search</button>
//     </form>
//   );
// };

// const SearchList = ({ results }) => {
//   return (
//     <ul>
//       {results.map((result) => (
//         <li key={result.id}>{result.title}</li>
//       ))}
//     </ul>
//   );
// };

// export default SearchResults;
