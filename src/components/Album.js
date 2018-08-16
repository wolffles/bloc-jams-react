import React, { Component } from 'react';
import albumData from './../data/albums';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( ele => {
      return ele.slug === this.props.match.params.slug
    });

    this.state =  {
      album: album
    };
  }

  render() {
    return (
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
        </section>
        <table id='song-list'>
          <colgroup>
            <col id='song-number-column' />
            <col id='song-title-column' />
            <col id='song-duration-column' />
          </colgroup>
          <tbody>
            {this.state.album.songs.map((ele,idx)  =>
              <tr className="song" key={idx}>
                <td className="song-number-column"> {idx + 1} </td>
                <td className="song-title-column">{ele.title}</td>
                <td className="song-duration-column">{ele.duration}</td>
              </tr>
              )
            }
          </tbody>
        </table>
      </section>
    );
  }
}

export default Album;
