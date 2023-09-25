import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import  searchAlbumsAPI  from './services/searchAlbumsAPI';

interface Album {
  artistId: number;
  artistName: string;
  collectionId: number;
  collectionName: string;
  collectionPrice: number;
  artworkUrl100: string;
  releaseDate: string;
  trackCount: number;
}

function Search() {
  const navigate = useNavigate();
  const [artistName, setArtistName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [searchedArtist, setSearchedArtist] = useState<string>('');

  const handleArtistNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setArtistName(e.target.value);
  };

  const handleSearch = async () => {
    if (artistName.length >= 2) {
      setIsLoading(true);
      setErrorMessage('');

      try {
        const response = await searchAlbumsAPI(artistName);
        setIsLoading(false);

        if (response.length === 0) {
          setErrorMessage('Nenhum álbum foi encontrado');
        } else {
          setAlbums(response);
          setSearchedArtist(artistName); 
          setArtistName(''); 
        }
      } catch (error) {
        setIsLoading(false);
        setErrorMessage('Ocorreu um erro ao buscar álbuns.');
      }
    }
  };

  return (
    <div>
      <h2>Pesquisar Álbuns</h2>
      <input
        type="text"
        value={artistName}
        onChange={handleArtistNameChange}
        data-testid="search-artist-input"
        placeholder="Digite o nome da banda ou artista"
      />
      <button
        onClick={handleSearch}
        disabled={artistName.length < 2 || isLoading}
        data-testid="search-artist-button"
      >
        {isLoading ? 'Carregando...' : 'Pesquisar'}
      </button>
      {errorMessage && <p>{errorMessage}</p>}
      {albums.length > 0 && (
        <div>
          <p>Resultado de álbuns de: {searchedArtist}</p> {}
          <ul>
            {albums.map((album) => (
              <li key={album.collectionId}>
                <a
                  href={`/album/${album.collectionId}`}
                  data-testid={`link-to-album-${album.collectionId}`}
                >
                  {album.collectionName}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Search;
