import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from '../redux/services/shazamCore';



import { setActiveSong, playPause  } from '../redux/features/playerSlice';

const SongDetails = () => {



    const { songid, artistId  } = useParams();
    const dispatch = useDispatch();
    const { activeSong, isPlaying } = useSelector((state)=> state.player);
    const { data: songData, isFetching: isFetchingSongDetails, } = useGetSongDetailsQuery({songid});
    const { data, isFetching: isFetchingRelatedSongs, error} = useGetSongRelatedQuery({songid});

    if(isFetchingSongDetails || isFetchingRelatedSongs ) return <Loader/>

    console.log(data)
    console.log(songData)
    const handlePauseClick = ()=>{
        dispatch(playPause(false))
      
      }
      
      
      const handlePlayClick = ({song, i}) => {
        dispatch(setActiveSong({song, data, i }));
        dispatch(playPause(true))
      
      }
      

  return (
    <div className='flex flex-col'>
        <DetailsHeader 
            artistId={artistId}
            songData={songData} 
        />
        <div className='mb-10'>
            <h2 className='text-white font-bold text-3xl'>Lyrics: </h2>
            <div className='mt-5'>
                {songData?.sections[1].type === 'LYRICS' ? songData?.sections[1].text.map((line,i)=> (
                    <p key={`lyrics-${line}-${i}`} className='text-gray-400 text-base my-1'>{line}</p>
                )) : ( <p className='text-gray-400 text-base my-1'>Sorry, no lyrics found</p>)}
            </div>
        </div>
        <RelatedSongs 
            data={data}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}
            artistId={artistId}
        
        />

    </div>
  );
}

export default SongDetails