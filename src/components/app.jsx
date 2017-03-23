import React, {Component} from 'react';
import '../app.css';
import {
  FormGroup,
  FormControl,
  InputGroup,
  Glyphicon
} from 'react-bootstrap';
import Profile from './profile';
import Gallery from './gallery';
import RelatedArtists from './relatedartists'

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        query: '',
        artist: null,
        tracks: [],
        relatedArtists: []
      };
    }

    search() {
      const BASE_URL = 'https://api.spotify.com/v1/search';
      let FETCH_URL = `${BASE_URL}?q=${this.state.query}&type=artist&limit=1`;
      const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
      fetch(FETCH_URL, {method: 'GET'})
      .then(response => response.json())
      .then(json => {
          const artist = json.artists.items[0];
          this.setState({artist});

          FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`;
          let RELATED_URL = `${ALBUM_URL}${artist.id}/related-artists`;

          fetch(FETCH_URL, {method: 'GET'})
          .then(response => response.json())
          .then(json => {
            let { tracks } = json;
            this.setState({tracks});
          });

          fetch(RELATED_URL, {method: 'GET'})
          .then(response => response.json())
          .then(json => {
            let { artists } = json;
            this.setState({ relatedArtists: artists });
          });
      });
    }

    changeQuery(query) {
      console.log('changing to: ', query, this.state);
      this.setState({query});
    }

    render() {
        return (
            <div className='app'>
              <h1>Artist Findr</h1>
                <FormGroup className='search-bar'>
                    <InputGroup>
                        <FormControl
                          type='text'
                          placeholder='Search an artist'
                          value={this.state.query}
                          onChange={(event) => this.setState({query:event.target.value})}
                          onKeyPress={(event) => {
                            if(event.key === 'Enter') {this.search();}
                          }}
                          />
                        <InputGroup.Addon onClick={() => this.search()}>
                            <Glyphicon glyph='search'></Glyphicon>
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
              {
                this.state.artist !== null
                ? <div>
                    <Profile
                    artist={this.state.artist}
                    />
                  <div className='artist__main-body'>
                    <h4>Top Tracks</h4>
                    <Gallery
                      tracks={this.state.tracks}
                      />
                    <h4>Similar Artists</h4>
                    <RelatedArtists
                      relatedArtists={this.state.relatedArtists}
                      changeQuery={this.changeQuery.bind(this)}
                      search={this.search.bind(this)}
                      />
                  </div>
                    </div>
                : <div></div>
              }
            </div>
        );
    }
}

export default App;
