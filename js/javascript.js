const first_language = document.querySelector(".language:first-child");
const sk_counters = document.querySelectorAll(".counter span");
const progress_bars = document.querySelectorAll(".second-area svg circle");
const toggle_btn = document.querySelector(".toggle-btn");
const header = document.querySelector("header");
const navMenu = document.getElementById('navbar-menu'),
toggleMenu = document.getElementById('navbar-mobile-first'),
exitMenu = document.getElementById('navbar-exit')

// menu SHOW&hide , add/remove for mobile-first website
toggleMenu.addEventListener('click', ()=>{
navMenu.classList.toggle('show')
})

exitMenu.addEventListener('click', ()=>{
navMenu.classList.remove('show')
})

const navLink = document.querySelectorAll('.nav_link')

function linkAction(){
navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


/*===== SCROLL SECTIONS ACTIVE LINK 
 The querySelectorAll is selecting all sections with an id, and the forEach is looping through each section to get the height and top offset.
  The if statement is checking if the window's pageYOffset is greater than the sections top offset and less than the sections top offset plus its height. 
  If that is true, it will add the active class to the section. If not, it will remove the active class.=====*/
const sections = document.querySelectorAll('section[id]')

window.addEventListener('scroll', scrollActive)

function scrollActive(){
let scrollY = window.pageYOffset

sections.forEach(current =>{
    let sectionHeight = current.offsetHeight
    let sectionTop = current.offsetTop - 100
    sectionId = current.getAttribute('id')

    if(scrollY > sectionTop && scrollY <= sectionTop +sectionHeight){
        document.querySelector('.navbar_menu a[href*='+ sectionId + ']').classList.add('active')
    }else{
        document.querySelector('.navbar_menu a[href*='+ sectionId + ']').classList.remove('active')
    }
})
sections.forEach(current =>{
    let sectionHeight = current.offsetHeight
    let sectionTop = current.offsetTop - 250
    sectionId = current.getAttribute('id')

    if(scrollY > sectionTop && scrollY <= sectionTop +sectionHeight){
        document.querySelector('.navbar_content a[href*='+ sectionId + ']').classList.add('active')
    }else{
        document.querySelector('.navbar_content a[href*='+ sectionId + ']').classList.remove('active')
    }
})
}

// navigation bar "sticky-nav" that remains fixed to the top of the screen when the user scrolls down the page  changes the class 
 function stickyNavbar() {
 header.classList.toggle("scrolled", window.pageYOffset > 0);
 }
 window.addEventListener("scroll",stickyNavbar);
// inherit json data
 fetch('data.json')
.then(response => response.json())
.then(data => {
   document.getElementById('first_name').textContent = data.first_name;
   document.getElementById('last_name').textContent = data.last_name;
});
/*--------------languages progress bars animations -----------*/
// this function is used to determine if an element is in view or not(languages bars)
// https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect.
window.addEventListener("scroll", () => {
    if(!languagesPlayed) languagesCounter();
 });
 
function hasReached(area) {
    let topPosition = area.getBoundingClientRect().top;
    
    if (window.innerHeight >= topPosition + area.offsetHeight) {
        return true;
    } else {
        return false;
    }
}
/*-
This code is used to create an animation that counts from 0 to a maximum number set by the maxNum parameter. 
The code uses the setTimeout() method to call the updateCount() function every 15 milliseconds until the currentNum variable is equal to the maxNum parameter.
https://javascript.info/settimeout-setinterval -*/
function updateCount(num, maxNum) {
    let currentNum = +num.innerText;
    
    if(currentNum < maxNum) {
        num.innerText = currentNum + 1;
        setTimeout(() => {
            updateCount(num, maxNum);
        }, 30);
    }
}

let languagesPlayed = false;
//animate the counting effect for each languages counters elements
function languagesCounter(){
    if(!hasReached(first_language)) return;

    languagesPlayed = true;

    sk_counters.forEach((counter, i) => {
        const number = +counter.dataset.number;
        const strokeValue = 400 - 400 * (number / 100);

        progress_bars[i].style.setProperty("--number", strokeValue);

        setTimeout(() => {
            updateCount(counter, number);
        }, 500);
    });

    progress_bars.forEach(
        (p) => (p.style.animation = "progress 4s ease-in-out forwards"));
}
function myFunction() {
    window.alert("Thanks for getting in touch. Have a nice day and hear you soon");
  }

  
    let data;
    let currentIndex = 0;
    let dataLength;
 
    function getData(){
        fetch("data.json")
        .then(response => response.json())
        .then(res => {
            dataLength = res.length;
            data=res;
            displayData(res);
        });
    }
 
    function displayData(data){
        document.getElementById("name").innerHTML = data.data[currentIndex].name;
        document.getElementById("position").innerHTML = data.data[currentIndex].position;
        document.getElementById("duration").innerHTML = data.data[currentIndex].duration;
        document.getElementById("languages").innerHTML = data.data[currentIndex].languages;
        document.getElementById("bio").innerHTML = data.data[currentIndex].bio;
    }
 
    function nextData() {
        currentIndex++;
        if (currentIndex >= dataLength || currentIndex > 2) {
          currentIndex = 0;
        }
        displayData(data);
      }
 
      function prevData() {
        currentIndex--;
        if (currentIndex < 0) {
          currentIndex = 2;
        }
        displayData(data);
      }
 
    window.onload = getData;
/*--change to dark mode*/

function changeMode() {
    const body = document.body;
    const containers = document.querySelectorAll(".second-area-box");
    const contactinput = document.querySelectorAll(".contact_input");
    if (!body.classList.contains("dark")) {
        body.classList.add("dark");
        contactinput.forEach((e) => {
            e.classList.add("dark");
        });
        containers.forEach((f) => {
            f.classList.add("dark");
        });
    } else {
        body.classList.remove("dark");
        containers.forEach((e) => {
            e.classList.remove("dark");
        });
        contactinput.forEach((f) => {
            f.classList.remove("dark");
        });
    }
}
toggle_btn.addEventListener("click", () => {
    changeMode();
});
