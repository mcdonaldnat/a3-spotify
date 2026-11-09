import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';

@Injectable({
  providedIn: 'root'
})
// we will be injecting this service into our components in order to get data
export class SpotifyService {
	expressBaseUrl:string = 'http://127.0.0.1:8888';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    //TODO: use the injected http Service to make a get request to the Express endpoint and return the response.
    //Specifically, update the URI according to the base URL for express and the endpoint.
    var uri:string = this.expressBaseUrl + endpoint;

    //firstValueFrom generates a Promise for whatever is returned first from the GET request.
    //You shouldn't need to update this part.
    return firstValueFrom(this.http.get(uri)).then((response) => {
      return response;
    }, (err) => {
      return err;
    });
  }

  // use SendRequestToExpress() in all of the follwoing functions to get the data
  // will build/ask for the speicific endpoint & create new data depending on the data we ask for

  aboutMe():Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data 
    return this.sendRequestToExpress('/me').then((data) => {
      return new ProfileData(data);
    });
  }

  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    //TODO: identify the search endpoint in the express webserver (routes/index.js) and send the request to express.
    //Make sure you're encoding the resource with encodeURIComponent().
    //Depending on the category (artist, track, album), return an array of that type of data.
    //JavaScript's "map" function might be useful for this, but there are other ways of building the array.
    var encodedResource:string = encodeURIComponent(resource);
    return this.sendRequestToExpress(`/search/${category}/${encodedResource}`).then((data) => {
      var items: any[] = data[`${category}s`].items;
      // this line does not create any errors but it also doesn't work im so lost rn
      items = items.map((item:any) => {
        switch (category) {
          case 'artist':
            return new ArtistData(item);
          case 'album':
            return new AlbumData(item);
          case 'track':
            return new TrackData(item);
          default:
            return new AlbumData(item);
        }
      }); 
      //console.log(items);
      return items;
    });
  }

  getArtist(artistId:string):Promise<ArtistData> {
    //TODO: use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.
    var resource:string = encodeURIComponent(artistId);

    return this.sendRequestToExpress(`/artist/${resource}`).then((data) => {
      return new ArtistData(data)}
    );
  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    //TODO: use the top tracks endpoint to make a request to express.
    var resource:string = encodeURIComponent(artistId);
    
    return this.sendRequestToExpress(`/artist-top-tracks/${resource}`).then((data) => {
      const artistTracksArray = data.items;
      return artistTracksArray.map((item:any) => {
        return new TrackData(item)})
      });
      
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    //TODO: use the albums for an artist endpoint to make a request to express.
    var resource:string = encodeURIComponent(artistId);
    
    return this.sendRequestToExpress(`/artist-albums/${resource}`).then((data) => {
      const albumArray = data.items;
      return albumArray.map((item:any) => {
        return new AlbumData(item)})
      });
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    //TODO: use the album endpoint to make a request to express.
    var resource:string = encodeURIComponent(albumId);

    return this.sendRequestToExpress(`/album/${resource}`).then((data) => {
      return new AlbumData(data)}
    );
  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    //TODO: use the tracks for album endpoint to make a request to express.
    var resource:string = encodeURIComponent(albumId);
    
    return this.sendRequestToExpress(`/album-tracks/${resource}`).then((data) => {
      const albumTrackArray = data.items;
      return albumTrackArray.map((item:any) => {
        return new TrackData(item)})
      });
  }

  getTrack(trackId:string):Promise<TrackData> {
    //TODO: use the track endpoint to make a request to express.
    var resource:string = encodeURIComponent(trackId);

    return this.sendRequestToExpress(`/track/${resource}`).then((data) => {
      return new TrackData(data)}
    );
  }
}