
(function() {
  'use strict';

  var app = {
    isLoading: true,
    spinner: document.querySelector('.loader'),
    container: document.querySelector('.main')
  };


  $('#btnOkDefi').hide();

/*
* Swipe for mobile interaction
*/

$(".carousel").on("touchstart", function(event){
        var xClick = event.originalEvent.touches[0].pageX;
    $(this).one("touchmove", function(event){
        var xMove = event.originalEvent.touches[0].pageX;
        if( Math.floor(xClick - xMove) > 5 ){
            $(this).carousel('next');
        }
        else if( Math.floor(xClick - xMove) < -5 ){
            $(this).carousel('prev');
        }
    });
    $(".carousel").on("touchend", function(){
            $(this).off("touchmove");
    });
});

$(".homeSwap").on("touchstart", function(event){
        var xClick = event.originalEvent.touches[0].pageX;
    $(this).one("touchend", function(event){
      var temp = Math.floor(xClick - event.originalEvent.changedTouches[0].pageX);
      if( temp > 90 ){
          app.showMe('#carto');
      }
      else if( temp < -90 ){
          app.showMe('#carto');
      }
    });
});

$(".cartoSwap").on("touchstart", function(event){
        var xClick = event.originalEvent.touches[0].pageX;
    $(this).one("touchend", function(event){
      var temp = Math.floor(xClick - event.originalEvent.changedTouches[0].pageX);
      if( temp > 90 ){
          app.showMe('#home');
      }
      else if( temp < -90 ){
          app.showMe('#home');
      }
    });
});
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
    $('#btnAddChallenge').hide();
    $('#btnOkDefi').show();
  });

  document.querySelector('.debug').addEventListener('click', function(){
    app.showMe('#debug');
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
     $('#btnOkDefi').hide();
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
  console.log('test1');
  console.log(swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  }));
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
  .then(function(subscription) {
    console.log('User is subscribed');

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

    if (isSubscribed) {
      console.log('User IS subscribed.');
    } else {
      console.log('User is NOT subscribed.');
    }

    updateBtn();
  });
}


})();
