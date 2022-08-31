// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'fillitup-finalproject',
    appId: '1:801744671882:web:907a53be6853973273c973',
    databaseURL:
      'https://fillitup-finalproject-default-rtdb.europe-west1.firebasedatabase.app',
    storageBucket: 'fillitup-finalproject.appspot.com',
    locationId: 'europe-west',
    apiKey: 'AIzaSyC7kAlaa-abnYhQZB4jY7EZdL88KZlNkhI',
    authDomain: 'fillitup-finalproject.firebaseapp.com',
    messagingSenderId: '801744671882',
    measurementId: 'G-YJ5C01TQXS',
  },
  google: {
    mapsApiKey: 'AIzaSyAkNik6dPkYnSodLV1-nOoEbi8yFj6vH_s',
  },
  production: false,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
