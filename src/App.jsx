import "./App.css";
import { useMovies } from "./hooks/useMovies";
import { useSearch } from "./hooks/useSearch";
import { Movies } from './components/Movies'
import { useCallback, useState } from "react";
import debounce from "just-debounce-it";


function App() {
  const [sort, setSort] = useState(false)

  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })
  const debouncedGetMovies = useCallback(
    debounce(search => {
      getMovies({ search })
    }, 300), [getMovies]
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)

  }

  return (
    <div className="page">
      <header>
        <h1>Buscador de peliculas</h1>
        <form className="form" action="" onSubmit={handleSubmit}>
          <input
            name="search"
            value={search}
            id="input-movie"
            placeholder="Avengers, Star Wars, The Hobbit ..."
            type="text"
            onChange={handleChange}
          />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        {loading
          ? <p>Loading... </p>
          : <Movies movies={movies} />
        }
      </main>
    </div>
  );
}

export default App;
