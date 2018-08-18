import React, { Component } from 'react';
import albumData from './../data/albums';
import Ionicon from 'react-ionicons';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( ele => {
      return ele.slug === this.props.match.params.slug
    });

    this.state =  {
      album: album,
      currentSong: album.songs[0],
      isPlaying: false,
      isHovered: false
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying:true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) {this.setSong(song); }
      this.play();
    }
  }

  clickToggle(song) {
    if (this.state.isPlaying && this.state.currentSong === song) {
      return "ion-pause";
    }else {
      if (this.state.currentSong === song && this.state.isPlaying ===false){
        return "ion-play"
      }
    }
  }

  hoverToggle(song){
    if(this.state.isPlaying === false && this.state.currentSong === false ) {
      return "md-play"
    }else {
      if (this.state.isPlaying && this.state.currentSong === song){
      return "md-pause"
    }else{
      return "md-play";
      }
    }
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
              <tr key={idx}
                className="song"
                onClick={() => this.handleSongClick(ele)}
                onMouseEnter={() => this.setState({isHovered: idx + 1})}
                onMouseLeave={() => this.setState({isHovered: false})} >
                <td className="song-actions">
                  {this.state.isHovered === idx + 1 ? (
                     <span><Ionicon icon={this.hoverToggle(ele)} /></span>
                   ) : (
                   this.state.isPlaying && this.state.currentSong === ele || !this.state.isPlaying && this.state.currentSong === ele ?
                     <span className={this.clickToggle(ele)} ></span>
                     : (idx + 1)
                   )}


                </td>
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
