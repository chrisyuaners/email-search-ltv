// declare variables
const URL = 'https://ltv-data-api.herokuapp.com/api/v1/records.json?email=';
const mainContainer = document.querySelector('main');
const initialLanding = $('#landing-initial');

// wait for file to load before running JS code
$(document).ready(function() {
    console.log('JS LOADING...');
    // code templates
    const loading = `
        <div id="loading">
            <img src="assets/loading_spinner.gif" alt="spinner" />
            <div id="loading-text">Please wait a moment...</div>
        </div>
    `;

    // add event listeners
    $( "#search-form" ).submit(function( event ) {
        event.preventDefault();
        const userData = {};
        const input = $("#email").val();
        $("#email").val('');
        initialLanding.hide();
        mainContainer.innerHTML = loading;
        // fetch(`${URL}${$("#email").val()}`)
        // .then(resp => resp.json())
        // .then(result => {
        //     console.log(result);
        // })
    });
    console.log('JS LOADED');
});