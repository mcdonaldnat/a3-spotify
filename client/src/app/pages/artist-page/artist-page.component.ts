import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from '../../services/spotify.service'; // added this to inject the service

@Component({
    selector: 'app-artist-page',
    templateUrl: './artist-page.component.html',
    styleUrls: ['./artist-page.component.css'],
    standalone: false
})
export class ArtistPageComponent implements OnInit {
	artistId:string;
	artist:ArtistData;
	topTracks:TrackData[];
	albums:AlbumData[];

  constructor(
    private route: ActivatedRoute,
    private service: SpotifyService //added this to the constructor for service access
  ) { }


  // something is causing an error to be passed around as data for a few files and then it all ends up crashing here
  // artist seems to be fine but albulms and tracks does not get the data correctly
  ngOnInit() {
    this.artistId = this.route.snapshot.paramMap.get('id');
    //TODO: Inject the spotifyService and use it to get the artist data, top tracks for the artist, and the artist's albums
    console.log("init started");

    this.service.getArtist(this.artistId)
      .then(d => { this.artist = d; console.log('artist ok', d); })
      .catch(e => console.error('artist failed', e.status, e.message));

    this.service.getAlbumsForArtist(this.artistId)
      .then(d => { this.albums = d; console.log('albums ok', d); })
      .catch(e => console.error('albums failed', e.status, e.message));

    this.service.getTopTracksForArtist(this.artistId)
      .then(d => { this.topTracks = d; console.log('tracks ok', d); });
      //.catch(e => console.error('tracks failed', e.status, e.message));

    
    /*
    Promise.all([this.service.getAlbumsForArtist(this.artistId), //promise all can do multiple promises at once, how fun
                  this.service.getArtist(this.artistId),
                  this.service.getTopTracksForArtist(this.artistId)])
                .then(([albumData, artistData, topTrackData]) => {
                  this.albums = albumData;
                  this.artist = artistData;
                  this.topTracks = topTrackData;
                });
    console.log("promise done");
    console.log(this.artistId);
    console.log(this.artist);
    console.log(this.topTracks);
    console.log(this.albums);
    */
  }

}