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
    const errorMessage = $(".search-error");

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

    const results = `
        <div id="results-container">
            <div id="results-title">
                
            </div>
            <div id="results-text">
                Look at the result below to see the details of the person you’re searched for.
            </div>
            <div id="results">

            </div>
        </div>
    `;

    // helper functions
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function formatPhoneNumber(str) {
        //Filter only numbers from the input
        let cleaned = ('' + str).replace(/\D/g, '');
        
        //Check if the input is of correct length
        let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
      
        if (match) {
          return '(' + match[1] + ') ' + match[2] + '-' + match[3]
        };
      
        return null
      };

    function renderResult(userData) {
        const name = userData.first_name + ' ' + userData.last_name;
        const description = userData.description;
        const address = userData.address;
        const email = userData.email;
        const phoneNumbers = userData.phone_numbers;
        const relatives = userData.relatives;

        const resultItem = `
            <div class="result">
                <div class="result-left">
                    <div class="result-icon">
                        <img src="assets/icn_person.svg" alt="person" />
                    </div>
                </div>
                <div class="result-right">
                    <div class="result-right-top">
                        <div class="name-title">
                            ${name}
                        </div>
                        <div class="name-text">
                            ${description}
                        </div>
                    </div>
                    <div class="result-right-bottom">
                        <div class="details">
                            <div class="address-container">
                                <div class="address-title">
                                    Address
                                </div>
                                <div class="address-text">
                                    ${address}
                                </div>
                            </div>
                            <div class="email-container">
                                <div class="email-title">
                                    Email
                                </div>
                                <div class="email-text">
                                    ${email}
                                </div>
                            </div>
                        </div>
                        <div class="details">
                            <div class="phone-container">
                                <div class="phone-title">
                                    Phone Numbers
                                </div>
                                <div class="phone-text">
                                    ${phoneNumbers.map(num => {
                                        return (
                                            `
                                                <div class="phone-item">
                                                    <div>
                                                        ${formatPhoneNumber(num)}
                                                    </div>
                                                </div>
                                            `
                                        )
                                    }).join('')}
                                </div>
                            </div>
                            <div class="relatives-container">
                                <div class="relatives-title">
                                    Relatives
                                </div>
                                <div class="relatives-text">
                                    ${relatives.map(rel => {
                                        return `
                                            <div class="relative-item">
                                                ${rel}
                                            </div>`
                                    }).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        return resultItem;
    }

    // add event listeners
    searchForm.submit(function( event ) {
        event.preventDefault();
        window.scrollTo(0, 0);
        const userData = [];
        const input = $(".email").val();
        $(".email").val('');
        initialLanding.innerHTML = '';
        initialLanding.innerHTML = loading;
        // fetch request with email input from user
        fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`${URL}${input}`)}`)
            .then(response => {
                if (response.ok) return response.json()
                throw new Error('Network response was not ok.')
            })
            .then(data => {
                const parsedData = JSON.parse(data.contents);
                if (parsedData.length === undefined) {
                    userData.push(parsedData);
                }
                if (userData.length === 0) {
                    initialLanding.innerHTML = noResults;
                    searchAgain.addClass("search-again-show");
                } else {
                    let resultCount = 0;
                    initialLanding.innerHTML = results;
                    userData.forEach(user => {
                        const userResult = renderResult(user);
                        const resultsList = document.querySelector('#results');
                        resultsList.innerHTML += userResult;
                        resultCount++;
                    })
                    const resultTitle = document.querySelector("#results-title");
                    resultTitle.innerHTML = resultCount > 1 ? `${resultCount} Results` : '1 Result';
                    searchAgain.addClass("search-again-show");
                }
            });
    });

    emailInput.keyup(function() {
        const validEmail = validateEmail($(".email").val());
        if (validEmail) {
            emailInput.removeClass("error");
            formSubmit.prop('disabled', false);
            errorMessage.hide();
        } else {
            emailInput.addClass("error");
            errorMessage.show();
        }
    });
    console.log('JS LOADED');
});