import { Component, OnInit, Input } from '@angular/core';
import { Popularity } from 'src/app/data/popularity';
import { SpotifyService } from '../../services/spotify.service'; // added this to inject the service
import { ActivatedRoute } from '@angular/router'; // added this for route access
import { ArtistData } from '../../data/artist-data'; // added for artist data access

@Component({
    selector: 'app-thermometer',
    templateUrl: './thermometer.component.html',
    styleUrls: ['./thermometer.component.css'],
    standalone: false
})
export class ThermometerComponent implements OnInit {
  artistId:string;
  artist:ArtistData;
  popularity: Popularity;
  popularity_percent: string;

  constructor(
    // private service: Popularity // maybe we need to inject this?? not sure
    private service: SpotifyService, //added this to the constructor for service access
    private route: ActivatedRoute // added this for route access for artist ID
  ) { }

  ngOnInit() {
    this.artistId = this.route.snapshot.paramMap.get('id');

    // get the artist from the spotify service route
    this.service.getArtist(this.artistId)
      .then(d => { 
        this.artist = d; 
        console.log('t- artist ok', d);
        console.log("thermometer artist is: " + this.artist);
        //this.popularity = new Popularity(); // make new Popularity with the percent value
        this.popularity_percent = this.artist.popularity.percentageString; // convert to a string 
      })
      .catch(e => console.error('thermometer check - artist failed', e.status, e.message));


  }

}
