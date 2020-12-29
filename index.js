// wait for file to load before running JS code
$(document).ready(function() {
    console.log('JS LOADING...');
    // declare variables
    const URL = 'https://ltv-data-api.herokuapp.com/api/v1/records.json?email=';
    const mainContainer = document.querySelector('main');
    const initialLanding = $('#landing-initial');

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

    const searchAgain = `
        <div id="search-container">
            <div id="search-top">
                <div class="search-title">
                    Can't Find The Right Person?
                </div>
                <div class="search-text">
                    <div>Try Again </div>
                    <div>- Make a new search</div>
                </div>
            </div>
            <div id="search-bottom">
                <form id="search-form">
                    <input type="text" name="email" id="email" placeholder="EMAIL"/>
                    <input type="submit" value="GO!"/>
                </form>
                <div>Enter Any Email Address. They won't be notified.</div>
            </div>
        </div>
    `;

    // add event listeners
    $( "#search-form" ).submit(function( event ) {
        event.preventDefault();
        const userData = null;
        const input = $("#email").val();
        $("#email").val('');
        initialLanding.hide();
        mainContainer.innerHTML = loading;
        // fetch(`${URL}${$("#email").val()}`)
        // .then(resp => resp.json())
        // .then(result => {
        //     console.log(result);
        // })
        if (!userData) {
            mainContainer.innerHTML = noResults;
            mainContainer.innerHTML += searchAgain;
        }
    });
    console.log('JS LOADED');
});