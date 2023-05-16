import { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import './App.css';

function App() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    getAlbums();
  }, []);

  async function getAlbums() {
    const q = query(collection(db, 'albums'), orderBy('votes', 'desc'));
    const querySnap = await getDocs(q);

    const albumsData = querySnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setAlbums(albumsData);
  }

  async function updateVotes(album, voteType) {
    const voteValue = voteType === 'up' ? 1 : -1;
    const alreadyVoted = localStorage.getItem(album.id);

    if (!alreadyVoted) {
      const docRef = doc(db, 'albums', album.id);
      await updateDoc(docRef, {
        votes: album.votes + voteValue,
      });

      const updatedAlbum = { ...album, votes: album.votes + voteValue };
      const updatedAlbums = albums
        .filter((a) => a.id !== album.id)
        .concat(updatedAlbum)
        .sort((a, b) => b.votes - a.votes);

      setAlbums(updatedAlbums);
      localStorage.setItem(album.id, `voted-${voteType}`);
      document.getElementById(`${album.id}-${voteType}`).classList.add('voted');
      document.getElementById(`${album.id}-${voteType === 'up' ? 'down' : 'up'}`).classList.remove('voted');
    } else if (alreadyVoted === `voted-${voteType}`) {
      const docRef = doc(db, 'albums', album.id);
      await updateDoc(docRef, {
        votes: album.votes - voteValue,
      });

      const updatedAlbum = { ...album, votes: album.votes - voteValue };
      const updatedAlbums = albums
        .filter((a) => a.id !== album.id)
        .concat(updatedAlbum)
        .sort((a, b) => b.votes - a.votes);

      setAlbums(updatedAlbums);
      localStorage.removeItem(album.id);
      document.getElementById(`${album.id}-${voteType}`).classList.remove('voted');
    } else {
      // User already voted, cannot change vote.
    }
  }

  return (
    <div className="wrapper">
      <h1>Upvoter</h1>
      <p>Pick an Album</p>
      <ul>
        {albums.map((item) => (
          <li key={item.id}>
            <div className="cover-container">
              <img className="cover-image" src={item.cover} alt={item.album} />
              <span>{item.album}</span>
            </div>
            <div>
              <button id={`${item.id}-up`} className={localStorage.getItem(item.id) === 'voted-up' ? 'voted' : ''} onClick={() => updateVotes(item, 'up')}>
                up
              </button>
              <button id={`${item.id}-down`} className={localStorage.getItem(item.id) === 'voted-down' ? 'voted' : ''} onClick={() => updateVotes(item, 'down')}>
                down
              </button>
              <span>{item.votes}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
