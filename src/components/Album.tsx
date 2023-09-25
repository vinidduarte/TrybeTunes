import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../services/musicsAPI';
import { AlbumType, SongType } from '../types';
import MusicCard from './MusicCard';

function Album() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [albumResult, setAlbumResult] = useState<AlbumType>({
    artistId: 0,
    artistName: '',
    collectionId: 0,
    collectionName: '',
    collectionPrice: 0,
    artworkUrl100: '',
    releaseDate: '',
    trackCount: 0,
  });
  const [musicResults, setMusicsResults] = useState<SongType[]>([{
    trackId: 0,
    trackName: '',
    previewUrl: '',
  }]);

  useEffect(() => {
    const fetchData = async () => {
      if (typeof id === 'string') {
        setIsLoading(true);
        try {
          const musics = await getMusics(id);
          const [album, ...songs] = musics;
          setAlbumResult(album);
          setMusicsResults(songs);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          console.error('Erro ao carregar músicas:', error);
        }
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <img src={ albumResult.artworkUrl100 } alt={ albumResult.collectionName } />
      <h5 data-testid="artist-name">{albumResult.artistName}</h5>
      <h6 data-testid="album-name">{albumResult.collectionName}</h6>
      {isLoading ? (
        <p data-testid="loading">Carregando...</p>
      ) : (
        musicResults.map((music) => (
          <MusicCard key={ music.trackId } song={ music } />
        ))
      )}
    </>
  );
}

export default Album;
