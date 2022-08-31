import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from 'src/app/interfaces/location.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
//-> This component handles the map rendering and feautres
export class HomeComponent implements OnInit {
  //-> Defines the location to be at the center of the map
  center: google.maps.LatLngLiteral;
  //-> Options for the GoogleMaps component
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    disableDoubleClickZoom: true,
    zoomControl: false,
    fullscreenControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    zoom: 14,
  };
  //-> List of markers to render
  markers: Array<any> = [];
  //-> List of fuel stations found in teh area
  locations: Array<Location> = [];
  //-> Referance to the GoogleMaps Component
  @ViewChild('google-map') gMap: google.maps.Map;
  //-> Defines the Places Service
  service: google.maps.places.PlacesService;

  //-> Controls the visability of the details modal
  showModal: boolean = false;
  //-> Stores the information to display in the modal
  modalData: Location = {
    place: undefined as any,
    marker: undefined,
    prices: {
      unleaded: 0,
      superUnleaded: 0,
      diesel: 0,
    },
  };

  constructor() {
    //-> Gets the location of the current device and passes it to the callback
    navigator.geolocation.getCurrentPosition((position) => {
      //-> Sets the default center to the device's current location
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      //-> Gets the fuel stations based on the current center of the map
      this.getLocations();
    });
  }

  ngOnInit(): void {}

  //-> Callback called when the user seraches for a location
  getAddress(place: google.maps.places.PlaceResult) {
    //-> Sets the map center to the location
    this.center = {
      lat: place.geometry!.location!.lat(),
      lng: place.geometry!.location!.lng(),
    };
    //-> Sets the zoom level to default
    this.options.zoom = 14;
    //-> Gets the fuel stations based on the current center of the map
    this.getLocations();
  }

  //-> Callback called when the user presses the "User Current Location" button
  useCurrentLocation() {
    //-> Gets the location of the current device and passes it to the callback
    navigator.geolocation.getCurrentPosition((position) => {
      //-> Sets the maps center to the device's current location
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      //-> Gets the fuel stations based on the current center of the map
      this.getLocations();
    });
  }

  //-> Gets the local fuel stations based on the current center of the map
  getLocations() {
    //-> The API errors out when returned the Angular version of the map, so a new vanilla version map is created but never rendered
    let map = new google.maps.Map(document.getElementById('map')!);

    //-> Build the request body, defining the parameters of the search
    var request = {
      location: this.center,
      radius: 2500,
      type: 'gas_station',
    };

    //-> Creates a new instance of the PlacesService
    let service = new google.maps.places.PlacesService(map);

    //-> Requests a nearbySearch from GoogleMapsAPI, passing in the request body
    service.nearbySearch(request, (res, stat) => {
      //-> Checks if the request succeeded
      if (stat == google.maps.places.PlacesServiceStatus.OK) {
        //-> Clears the current list of fuel stations and markers
        this.locations = [];
        this.markers = [];

        //-> For each station found
        res?.forEach((location) => {
          //-> Calculate a price for each of the fuel types at that station
          var prices = this.calculatePrices(location.price_level);
          //-> Create a marker on the map
          var marker = new google.maps.Marker({
            //-> Sets the markers position to the location of the station
            position: location.geometry?.location,
            //-> Display the price of unleaded fuel at that station by default
            label: prices.unleaded + 'ppl',
            //-> Configures the marker to render on the Angular Map
            map: this.gMap,
            //-> Sets the marker icon to a custom icon
            icon: 'https://cdn.discordapp.com/attachments/943936069605425222/1013971550367645696/rsz_img_0366.png',
          });

          //-> Adds the location to the list of locations, along with relavent information          
          this.locations.push({ place: location, prices, marker });
          //-> Adds the marker to the list of markers
          this.markers.push(marker);
        });
      }
    });
  }

  //-> Callback called when the Modal should be displayed
  openInfoWindow(place: Location) {
    //-> Sets the center of the map to the location of the marker
    this.center = {
      lat: place.place.geometry!.location!.lat(),
      lng: place.place.geometry!.location!.lng(),
    };
    //-> Displays the Modal
    this.showModal = true;
    //-> Set the information the modal should display
    this.modalData = place;
  }

  //-> Calculate a psudo-random price for a fuel-station
  //-> price_level is a number given by GoogleAPI that gives a
  //-> rough idea of how much more does this specific station charges compared to other stations.
  calculatePrices(price_level: number = 2) {
    //-> Current national averages in order: Unleaded, Super Unleaded, Diesel
    var pricePoints = [170.4, 183.57, 182.7];

    //-> 50/50 odds of taking away or adding a random amount to the national average
    if (Math.random() < 0.5)
      //-> Add a random amount + price_level multplied by 10 to the national average
      return {
        unleaded:
          pricePoints[0] +
          price_level * 10 +
          Math.trunc(Math.random() * (30 - 0)),
        superUnleaded:
          pricePoints[1] +
          price_level * 10 +
          Math.trunc(Math.random() * (30 - 0)),
        diesel:
          pricePoints[2] +
          price_level * 10 +
          Math.trunc(Math.random() * (30 - 0)),
      };
    else
      //-> Take away a random amount + price_level multplied by 10 to the national average
      return {
        unleaded:
          pricePoints[0] +
          price_level * 10 -
          Math.trunc(Math.random() * (30 - 0)),
        superUnleaded:
          pricePoints[1] +
          price_level * 10 -
          Math.trunc(Math.random() * (30 - 0)),
        diesel:
          pricePoints[2] +
          price_level * 10 -
          Math.trunc(Math.random() * (30 - 0)),
      };
  }
}
