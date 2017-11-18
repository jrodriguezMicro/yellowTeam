
(function() {
  'use strict';

  var app = {
    isLoading: true,
    spinner: document.querySelector('.loader'),
    container: document.querySelector('.main')
  };


  /*****************************************************************************
   *
   * Event listeners for UI elements
   *
   ****************************************************************************/

  document.getElementById('butAchiv').addEventListener('click', function(){
    app.showMe('#achiv');
  });

  document.querySelector('.temp').addEventListener('click', function(){
    app.showMe('#defiDetail');
  });

  document.getElementById('retourDetail').addEventListener('click', function(){
    app.showMe('#home');
  });

  document.getElementById('btnAddChallenge').addEventListener('click', function(){
    app.showMe('#defiCreate');
  });

  document.getElementById('butProfil').addEventListener('click', function(){
    app.showMe('#profil');
  });
  document.getElementById('butHome').addEventListener('click', function(){
    app.showMe('#home');
  });
  /*****************************************************************************
   *
   * Methods to update/refresh the UI
   *
   ****************************************************************************/

   app.resetAllPage = function(){
     var container = $('.showMe');
     container.removeClass('showMe').addClass('hideMe');
   }
   app.showMe = function(id){
     var toDisplay = $(id);
     if(toDisplay[0].classList.contains('hideMe')){
       app.resetAllPage();
       toDisplay.removeClass('hideMe').addClass('showMe');;
     }
   }

    if (app.isLoading) {
      app.spinner.setAttribute('hidden', true);
      app.container.removeAttribute('hidden');
      app.isLoading = false;
    }

  /*****************************************************************************
   *
   * Methods for dealing with the model
   *
   ****************************************************************************/

  /*
  * Fake User, simuler une gestion des utilisateurs
  */
  var fakeUser = {
    log: false,
    email: '',
    fullName: '',
    codePost: ''
  }

  /************************************************************************
   *
   * Code required to start the app
   *
   * NOTE: To simplify this codelab, we've used localStorage.
   *   localStorage is a synchronous API and has serious performance
   *   implications. It should not be used in production applications!
   *   Instead, check out IDB (https://www.npmjs.com/package/idb) or
   *   SimpleDB (https://gist.github.com/inexorabletash/c8069c042b734519680c)
   ************************************************************************/

  // TODO add startup code here
  /*
  app.selectedCities = localStorage.selectedCities;
  if (app.selectedCities) {
    app.selectedCities = JSON.parse(app.selectedCities);
    app.selectedCities.forEach(function(city) {
      app.getForecast(city.key, city.label);
    });
  } else {
    app.updateForecastCard(initialWeatherForecast);
    app.selectedCities = [
      {key: initialWeatherForecast.key, label: initialWeatherForecast.label}
    ];
    app.saveSelectedCities();
  }
  */

  // TODO add service worker code here
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }
})();
