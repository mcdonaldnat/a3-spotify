import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
    selector: 'app-album-page',
    templateUrl: './album-page.component.html',
    styleUrls: ['./album-page.component.css'],
    standalone: false
})
export class AlbumPageComponent implements OnInit {
	albumId:string;
	album:AlbumData;
	tracks:TrackData[];


  constructor(private route: ActivatedRoute, private service: SpotifyService) { }

  ngOnInit() {
    this.albumId = this.route.snapshot.paramMap.get('id');
    //TODO: inject spotifyService and use it to get the album data and the tracks for the album

    this.service.getAlbum(this.albumId)
      .then(d => { this.album = d; console.log('album ok', d); })
      .catch(e => console.error('albums failed', e.status, e.message));

    this.service.getTracksForAlbum(this.albumId)
      .then(d => { this.tracks = d; console.log('tracks ok', d); })
      .catch(e => console.error('tracks failed', e.status, e.message));
    
  }

}
