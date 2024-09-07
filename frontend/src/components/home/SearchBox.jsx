import { useState } from 'react';
import "../../styles/SearchBox.css";

const SearchBox = () => {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        setQuery(e.target.value); // Atualiza o estado conforme o usuário digita
    };

    return (
        <div className="search-container">
            <input 
                type="search" 
                placeholder="Buscar..." 
                value={query}
                onChange={handleSearch} 
                className="search-box"
            />
        </div>
    );
};

export default SearchBox;
