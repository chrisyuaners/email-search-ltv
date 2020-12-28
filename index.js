// declare variables
const URL = 'https://ltv-data-api.herokuapp.com/api/v1/records.json?email=';

// wait for file to load before running JS code
$(document).ready(function() {
    console.log('JS LOADING...');
    // add event listeners
    $( "#search-form" ).submit(function( event ) {
        event.preventDefault();
        console.log($("#email").val());
        fetch(`${URL}${$("#email").val()}`, {mode: 'no-cors'})
        .then(resp => resp.json())
        .then(result => {
            console.log(result);
        })
    });
    console.log('JS LOADED');
});