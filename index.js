// wait for file to load before running JS code
$(document).ready(function() {
    console.log('JS LOADING...');
    // declare variables
    const URL = 'https://ltv-data-api.herokuapp.com/api/v1/records.json?email=';
    const searchForm = $( ".search-form" );
    const mainContainer = document.querySelector('main');
    const initialLanding = document.querySelector('#landing-initial');
    const searchAgain = $('#search-again');
    const emailInput = $(".email");
    const formSubmit = $(".submit");

    // code templates
    const loading = `
        <div id="loading">
            <img src="assets/loading_spinner.gif" alt="spinner" />
            <div id="loading-text">Please wait a moment...</div>
        </div>
    `;

    const noResults = `
        <div id="no-results-container">
            <div id="no-results-title">
                0 Results
            </div>
            <div id="no-results-text">
                Try starting a new search below
            </div>
        </div>
    `;

    // helper functions
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    // add event listeners
    searchForm.submit(function( event ) {
        event.preventDefault();
        const userData = null;
        const input = $(".email").val();
        $(".email").val('');
        initialLanding.innerHTML = '';
        initialLanding.innerHTML = loading;
        // fetch(`${URL}${$("#email").val()}`)
        // .then(resp => resp.json())
        // .then(result => {
        //     console.log(result);
        // })
        if (!userData) {
            initialLanding.innerHTML = noResults;
            searchAgain.show();
        }
    });

    emailInput.keyup(function() {
        const validEmail = validateEmail($(".email").val());
        if (validEmail) {
            emailInput.removeClass("error");
            formSubmit.prop('disabled', false);

        } else {
            emailInput.addClass("error");
        }
    });
    console.log('JS LOADED');
});