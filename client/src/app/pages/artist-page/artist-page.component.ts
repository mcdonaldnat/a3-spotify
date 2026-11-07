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

  ngOnInit() {
    this.artistId = this.route.snapshot.paramMap.get('id');
    //TODO: Inject the spotifyService and use it to get the artist data, top tracks for the artist, and the artist's albums
    
    Promise.all([this.service.getAlbumsForArtist(this.artistId), //promise all can do multiple promises at once, how fun
                  this.service.getArtist(this.artistId),
                  this.service.getTopTracksForArtist(this.artistId)])
                .then(([albumData, artistData, topTrackData]) => {
                  this.albums = albumData;
                  this.artist = artistData;
                  this.topTracks = topTrackData;
                });
  }

}