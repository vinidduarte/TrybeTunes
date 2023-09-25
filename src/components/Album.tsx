import { useEffect, useState } from 'react';
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
  const musicApi = async () => {
    if (typeof id === 'string') {
      setIsLoading(true);
      const musics = await getMusics(id);
      const [album, ...songs] = musics;
      setAlbumResult(album);
      setMusicsResults(songs);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    musicApi();
  }, []);

  if (isLoading) return <p data-testid="loading">Carregando...</p>;

  return (
    <>
      <img src={ albumResult.artworkUrl100 } alt={ albumResult.collectionName } />
      <h5 data-testid="artist-name">{albumResult.artistName}</h5>
      <h6 data-testid="album-name">{albumResult.collectionName}</h6>
      {musicResults.map((music) => (
        <MusicCard key={ music.trackId } song={ music } />
      ))}
    </>
  );
}

export default Album;
