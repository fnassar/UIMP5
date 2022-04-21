let flyers = [];
// secions
let flyersSection;
let titleSection;
let overlay;
// buttons
let goBackButton;
let goBackButton2;
let nextButton;
// divs
let canwegodiv;
let name_nationalitydiv;
//
let desiredCountry;
let countryForm;
let namesinFlyers = ["Maldives", "Australia", "China", "Greece", "Vietnam",  "Mozambique", "India", "Ireland", "Mexico", "Egypt", "Korea", "United Kingdom"];
let namee;

window.addEventListener('load', () => {
    flyers = document.getElementsByClassName('flyers_img');
    overlay = document.getElementById('overlay');
    goBackButton = document.getElementById('goBack');
    goBackButton2 = document.getElementById('goBack2');
    nextButton = document.getElementById('next');
    canwegodiv = document.getElementById('canwego');
    name_nationalitydiv = document.getElementById('name_nationality');
    flyersSection = document.getElementById('flyers');
    titleSection = document.getElementById('title');
    desiredCountry = document.getElementById('desiredCountry');
    countryForm = document.getElementById('countryForm');
    addOptions();

    for (let i = 0; i < flyers.length; i++) {
        flyers[i].addEventListener('click', (e) => {
            console.log(namesinFlyers[i]);
            namee = namesinFlyers[i];
            desiredCountry.innerHTML = "You want to go to " + namee + "?</br> please fill the following so we can see if you can go :/";
            overlay.style.display = "flex";
        })
    }
    goBackButton.addEventListener('click', () => {
        overlay.style.display = "none";
        flyers.overflow = "scroll";
    })
    goBackButton2.addEventListener('click', () => {
        overlay.style.display = "none";
        flyers.overflow = "scroll";
        name_nationalitydiv.style.display = "flex";
        canwego.style.display = "none";
    })
    countryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        name_nationalitydiv.style.display = "none";
        canwego.style.display = "flex";
        canwego.style.alignItems = "center";
        canwego.style.justifyContent = "space-between";
        fetchData(document.getElementById('countryForm_input2').value, namee, document.getElementById('countryForm_input1').value);
    })
})


function fetchData(nationality, countryName, username) {
    fetch("./assets/PassportIndex.json")
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            console.log(data[countryName][nationality], username);
            document.getElementById('text_canwego').innerHTML = username + " your Country '" + nationality + "' status is '" + data[countryName][nationality] + "' to go to " + countryName;
            if (data[countryName][nationality] == "e-visa" || data[countryName][nationality] == "visa on arrival") {
                document.getElementById('text_canwego2').innerHTML = "<b>YOU ARE ELIGIBLE YAY</b>(lets not talk about the power you feel right now)</br>(this is easy)";
            } else {
                document.getElementById('text_canwego2').innerHTML = "So you either go so through a long long process</br> or u don't go at all.</br> Feel defeated? Powerless? we feel you...";
            }
        })
}

function addOptions() {
    let select = document.getElementById('countryForm_input2');
    fetch("./assets/try.json")
        .then((response) => response.json())
        .then((data) => {
            console.log(data.countryList);
            let arr = data.countryList;
            for (let i = 0; i < arr.length; i++) {
                let item = document.createElement('option');
                item.value = arr[i];
                item.innerHTML = arr[i];
                select.appendChild(item);

            }
        })
}

/////////////////////////////

let doc = window.document;
// let context = document.querySelector('.js-loop');
let context = document.getElementById('js-loop');
let disableScroll = false;
let scrollHeight = 0;
let scrollPos = 0;
let clonesHeight = 0;
let i = 0;

function getScrollPos() {
    // return (context.pageYOffset || context.scrollTop) - (context.clientTop || 0);
}

function setScrollPos(pos) {
    context.scrollTop = pos;
}

function getClonesHeight() {
    clonesHeight = 0;

    for (i = 0; i < clones.length; i += 1) {
        clonesHeight = clonesHeight + clones[i].offsetHeight;
    }

    return clonesHeight;
}

function reCalc() {
    scrollPos = getScrollPos();
    scrollHeight = context.scrollHeight;
    clonesHeight = getClonesHeight();

    if (scrollPos <= 0) {
        setScrollPos(1); // Scroll 1 pixel to allow upwards scrolling
    }
}

function scrollUpdate() {
    if (!disableScroll) {
        scrollPos = getScrollPos();

        if (clonesHeight + scrollPos >= scrollHeight) {
            // Scroll to the top when you’ve reached the bottom
            setScrollPos(1); // Scroll down 1 pixel to allow upwards scrolling
            disableScroll = true;
        } else if (scrollPos <= 0) {
            // Scroll to the bottom when you reach the top
            setScrollPos(scrollHeight - clonesHeight);
            disableScroll = true;
        }
    }

    if (disableScroll) {
        // Disable scroll-jumping for a short time to avoid flickering
        window.setTimeout(function() {
            disableScroll = false;
        }, 40);
    }
}

function init() {
    reCalc();

    context.addEventListener('scroll', function() {
        window.requestAnimationFrame(scrollUpdate);
    }, false);

    window.addEventListener('resize', function() {
        window.requestAnimationFrame(reCalc);
    }, false);
}

if (document.readyState !== 'loading') {
    init()
} else {
    doc.addEventListener('DOMContentLoaded', init, false)
}
