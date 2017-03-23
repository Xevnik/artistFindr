import React, {Component} from 'react';
import '../app.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render(){
    let artist = {
      name: '',
      followers: { total: '' },
      images: [{url: ''}],
      genres: []
    };

    artist = (this.props.artist !== null)
    ? this.props.artist
    : artist;

    return (
      <div className='profile'>
        <img
          alt='Profile'
          className='profile__image'
          src={artist.images[0].url}
        />
      <div className='profile-info'>
        <div className='profile-info__name'>{ artist.name }</div>
        <div className='profile-info__followers'>
          { artist.followers.total } followers
        </div>
        <div className='profile-info__genres'>
          {
            artist.genres.map((genre, i) => {
              genre = (genre !== artist.genres[artist.genres.length-1])
              ? `${genre},`
              : `& ${genre}`;
              return <span key={i}>{genre} </span>;
            })
          }
        </div>
      </div>
      </div>
    );
  }
}

export default Profile;
