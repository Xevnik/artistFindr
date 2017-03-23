import React, { Component } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import '../app.css';

class RelatedArtists extends Component {
  render(){
    const { relatedArtists, changeQuery, search } = this.props;
    //console.log(relatedArtists);
    return (
      <div className='related-artists'>
        {
          relatedArtists.map((artist, key) => {
            const tooltip = (
              <Tooltip id='tooltip'>
                <strong>{artist.name}</strong>
              </Tooltip>
            );

            return (
              <div
                key={key}
                className='related-artists__artist'
                onMouseEnter={() => changeQuery(artist.name)}
                onClick={() => search()}
                >
                  <OverlayTrigger placement='top' overlay={tooltip}>
                    <img
                      className='artist__img'
                      src={artist.images[0].url}
                      alt='related artists'
                      />
                  </OverlayTrigger>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default RelatedArtists;
