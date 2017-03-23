import React, {Component} from 'react';
import '../app.css';
import {Glyphicon} from 'react-bootstrap';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playingUrl: '',
      audio: null,
      playing: false
    }
  }

  playAudio(previewUrl) {
    let audio = new Audio(previewUrl);

    if(!this.state.playing) {
      audio.play();
      this.setState({
        playing: true,
        playingUrl: previewUrl,
        audio
      });
    } else {
      if(this.state.playingUrl === previewUrl) {
        this.state.audio.pause();
        this.setState({
          playing: false
        });
      } else {
        this.state.audio.pause();
        audio.play();
        this.setState({
          playing: true,
          playingUrl: previewUrl,
          audio
        });
      }
    }
  }

  render() {
    const { tracks } = this.props;
    return (
      <div className='gallery'>
        {
          tracks.map((track, i) => {
            const trackImg = track.album.images[0].url;
            return (
              <div
                key={i}
                className='gallery__track'
                onClick={() => this.playAudio(track.preview_url)}
                >
                <img
                  src={trackImg}
                  className='track__img'
                  alt='track'
                  />
                <div className='track__play'>
                  <div className='play__inner'>
                    {
                      this.state.playingUrl === track.preview_url && this.state.playing
                      ? <Glyphicon glyph='pause' />
                      : <Glyphicon glyph='play' />
                    }
                  </div>
                </div>
                <p className='track__text'>
                  {track.name}
                </p>
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default Gallery;
