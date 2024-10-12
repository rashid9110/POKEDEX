
import './Search.css'

function Search(){
    return(
      <div className="Search-wrapper">

        <input
          id="Pokemon-name-search" 
          type="text"
          placeholder="Pokemon name..."
        />
      </div>
    );
}

export default Search;