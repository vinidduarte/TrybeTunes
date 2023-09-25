import { useState } from 'react';
import { SongType } from '../types';
import FillHeart from '../images/checked_heart.png';
import EmptyHeart from '../images/empty_heart.png';

type MusicCardProps = {
  song: SongType
};

function MusicCard({ song }:MusicCardProps) {
  const { previewUrl, trackId, trackName } = song;
  const [favorite, setFavorite] = useState(false);

  const handleClick = async () => {
    setFavorite(!favorite);
  };

  return (
    <>
      <h6>{trackName}</h6>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        <code>audio</code>
      </audio>
      <label
        htmlFor={ String(trackId) }
        data-testid={ `checkbox-music-${trackId}` }
      >
        <input
          type="checkbox"
          name="favorite"
          id={ String(trackId) }
          onClick={ handleClick }
        />
        <img
          src={ favorite ? FillHeart : EmptyHeart }
          alt="favorite"
        />
      </label>
    </>
  );
}

export default MusicCard;
