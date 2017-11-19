
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

  $('.retourDetail').on('click', function(){
    app.showMe('#home');
  });

  document.getElementById('btnAddChallenge').addEventListener('click', function(){
    app.showMe('#defiCreate');
    $('#btnAddChallenge').hide();

  });

  document.getElementById('butProfil').addEventListener('click', function(){
    app.showMe('#profil');
  });
  document.getElementById('butHome').addEventListener('click', function(){
    app.showMe('#home');
  });
  document.getElementById('mainLogo').addEventListener('click', function(){
    app.showMe('#home');
  });
  /*****************************************************************************
   *
   * Methods to update/refresh the UI
   *
   ****************************************************************************/

   app.resetAllPage = function(){
     var container = $('.showMe');
     $('#btnAddChallenge').show();
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
             .then(function(swReg) {
               console.log('Service Worker Registered');
              swRegistration = swReg;
              initializeUI();
           }).catch(function(err) {
                // registration failed :(
                console.log('ServiceWorker registration failed: ', err);
              });
  }else{
    console.warn('Push messaging is not supported');
    pushButton.textContent = 'Push Not Supported';
  }

  // TEST notification from google tuto
  const applicationServerPublicKey = 'BJrDVriFkOU0VJCifN9e58ASorN_EgjT5bTJ7hKq8afrqRrW3tDuUDDMCTgbmyLp0Cyqus0CdmPk87cuF_OPss8';

const pushButton = document.querySelector('.js-push-btn');

let isSubscribed = false;
let swRegistration = null;

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function updateBtn() {
  if (Notification.permission === 'denied') {
    pushButton.textContent = 'Push Messaging Blocked.';
    pushButton.disabled = true;
    updateSubscriptionOnServer(null);
    return;
  }

  if (isSubscribed) {
    pushButton.textContent = 'Disable Push Messaging';
  } else {
    pushButton.textContent = 'Enable Push Messaging';
  }

  pushButton.disabled = false;
}

function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
  .then(function(subscription) {
    console.log('User is subscribed');

    updateSubscriptionOnServer(subscription);

    isSubscribed = true;

    updateBtn();
  })
  .catch(function(err) {
    console.log('Failed to subscribe the user: ', err);
    updateBtn();
  });
}

function initializeUI() {
  pushButton.addEventListener('click', function() {
    pushButton.disabled = true;
    if (isSubscribed) {
      // TODO: Unsubscribe user
    } else {
      subscribeUser();
    }
  });

  // Set the initial subscription value
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    isSubscribed = !(subscription === null);

    updateSubscriptionOnServer(subscription);

    if (isSubscribed) {
      console.log('User IS subscribed.');
    } else {
      console.log('User is NOT subscribed.');
    }

    updateBtn();
  });
}
function updateSubscriptionOnServer(subscription) {
  // TODO: Send subscription to application server

  const subscriptionJson = document.querySelector('.js-subscription-json');
  const subscriptionDetails =
    document.querySelector('.js-subscription-details');

  if (subscription) {
    subscriptionJson.textContent = JSON.stringify(subscription);
    subscriptionDetails.classList.remove('is-invisible');
  } else {
    subscriptionDetails.classList.add('is-invisible');
  }
}
  // var pushButton = document.querySelector('.js-push-button');
  // pushButton.addEventListener('click', subscribe);
  //
  // function subscribe() {
  //   console.log('test1');
  //   pushButton.disabled = true;
  //
  //   navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
  //     console.log('test1.2');
  //     console.log(serviceWorkerRegistration.pushManager.subscribe);
  //     serviceWorkerRegistration.pushManager.subscribe({ userVisibleOnly: true })
  //       .then(function(subscription) {
  //         // The subscription was successful
  //         console.log('test2');
  //         isPushEnabled = true;
  //         pushButton.textContent = 'Disable Push Messages';
  //         pushButton.disabled = false;
  //       })
  //       .catch(function(e) {
  //         console.log('test3');
  //         if(Notification.permission === 'denied') {
  //           console.warn('Permission for Notifications was denied');
  //           pushButton.disabled = true;
  //         } else {
  //           console.error('Unable to subscribe to push.', e);
  //           pushButton.disabled = false;
  //           pushButton.textContent = 'Enable Push Messages';
  //         }
  //       });
  //   });
  // }

})();
