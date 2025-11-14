const pages = {
    HELLO: 0,
    UBROKE: 1,
    TASTE: 2
}

let current_page = pages.HELLO;

const progress = document.getElementById("progress");
const select_progress = document.getElementById("select_progress");
const progress_items = document.getElementsByClassName("progress_item");
const title_texts = document.getElementsByClassName("title_text");
const title = document.getElementById("title");
const carousel_1_figure = document.getElementById("carousel_inner").children[1];

const carousel_inner = document.getElementById("carousel_inner");
let carousel_taste = 1;

const mouse = {x: 0, y: 0, down: false, past_x: 0, past_y: 0, offset_x: 0, offset_y: 0, past_offset_x: 0, past_offset_y: 0}
window.onmousemove = (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    console.log(mouse.down)

    if (mouse.down) {
        mouse.offset_x = mouse.x - mouse.past_x;
        mouse.offset_y = mouse.y - mouse.past_y;
    }
}
window.onmousedown = () => {
    mouse.down = true;
    mouse.past_x = mouse.x;
    mouse.past_y = mouse.y;
}
window.onmouseup = () => {
    mouse.down = false;
    mouse.past_offset_x = mouse.offset_x;
    mouse.past_offset_y = mouse.offset_y;
}

tick()

function tick() {
    if (current_page == pages.HELLO) {
        const hello_item = progress_items[0];
        const mid_x = hello_item.getBoundingClientRect().x + hello_item.clientWidth/2;
        select_progress.style.left = `${mid_x - select_progress.clientWidth/2}px`;
    }
    
    if (current_page > 0) {
        const hello_item = progress_items[1].children[current_page];
        const mid_x = hello_item.getBoundingClientRect().x + hello_item.clientWidth/2;
        select_progress.style.left = `${mid_x - select_progress.clientWidth/2}px`;
    }

    if (current_page == pages.TASTE) {
        const carousel_space = carousel_1_figure.clientWidth;
        const remaining_space = window.innerWidth*0.8 - carousel_1_figure.clientWidth
        // const total_offset = mouse.offset_x + mouse.past_offset_x;
        
        carousel_inner.style.left = `${-carousel_space * carousel_taste + remaining_space/2}px`;
    }

    requestAnimationFrame(tick)
}

const main = document.getElementById("main");


const name_input = document.getElementById("name")
const name_warn = document.getElementById("name_Warn")
document.getElementById("next_hello").onclick = hello_next;
function hello_next () {
    if (name_input.value.length == 0) {
        name_warn.innerText = "At least put something in there"
        name_warn.style.maxHeight = "21px";
        return
    }

    title_texts[current_page].classList.remove("active_title")
    current_page++
    title_texts[current_page].classList.add("active_title")
    
    title.style.left = "100vw";
    title.classList.add("ubroke");

    const title_hello_offset = document.getElementById("title_hello_offset");
    title_hello_offset.style.maxHeight = "0px";
    title_hello_offset.style.margin = "0vh";

    // REVERT THIS WHEN YOU SAY THANK YOU
    progress_items[1].classList.add("secret_revealed");
    
    // REVERT THIS WHEN YOU SAY THANK YOU
    document.getElementById("veil").style.filter =  "opacity(0)";

    // REVERT THIS WHEN YOU SAY THANK YOU
    const height = progress.clientHeight/2 + 5;
    select_progress.classList.toggle("secret_revealed");

    progress.style.height = "20vw";
    progress.style.padding = "5vw";
    progress.style.paddingTop = "0vw";
    progress.style.paddingBottom = "0vw";
    
    title.style.fontSize = "min(10vh, 10vw)";
    title.style.padding = ""

    main.style.left = "-100vw";
}


document.getElementById("calc_card").onclick = () => {
    document.getElementById("calc_card_inner").style.transform = "rotateY(180deg)"
    document.getElementById("ubroke_button_container").style.maxHeight = "100px";

    document.getElementById("next_ubroke").style.padding = "3vw";
    document.getElementById("next_ubroke").style.marginTop = "10px";
    document.getElementById("next_ubroke").style.maxHeight = "100px";
}

let is_correct = true;
const ubroke_button_container = document.getElementById("ubroke_button_container")
ubroke_button_container.onclick = () => {
    is_correct = !is_correct;
    ubroke_button_container.classList.toggle("wrong")
}

const next_ubroke = document.getElementById("next_ubroke")
const ubroke_warn = document.getElementById("poster_warn");
next_ubroke.onclick = () => {
    if (is_correct) {
        progress_from_ubroke()
        return
    }

    ubroke_warn.style.maxHeight = "100px"
    next_ubroke.onclick = () => {}

    setTimeout(fucku, 1000);
}

function fucku () {
    ubroke_warn.innerText = "screw you"
    setTimeout(progress_from_ubroke, 500);
}

function progress_from_ubroke () {
    title_texts[current_page].classList.remove("active_title")
    current_page++
    title_texts[current_page].classList.add("active_title")
    title.classList.remove("ubroke");
    title.classList.add("taste");

    title.style.left = "200vw";
    main.style.left = "-200vw";
}

document.getElementById("carousel_left").onclick = () => {
    carousel_taste = (carousel_taste + 2)%3
    swtich_taste()
}
document.getElementById("carousel_right").onclick = () => {
    carousel_taste = (carousel_taste + 1)%3;
    swtich_taste()
}
const tate_next = document.getElementById("taste_next");
function swtich_taste() {
    console.log(carousel_taste)

    switch (carousel_taste) {
        case 0:
            tate_next.innerText = "Black"
            break;
        case 1:
            tate_next.innerText = "Yellow!"
            break;
        case 2:
            tate_next.innerText = "White"
            break;
    }
}

document.getElementById("taste_next").onclick = taste_next;
function taste_next () {
    title_texts[current_page].classList.remove("active_title")
    current_page++
    title_texts[current_page].classList.add("active_title")
    title.classList.remove("taste");
    title.classList.add("calcfunc");

    document.getElementById("title_calcfunc_offset").classList.toggle("active");

    title.style.left = "300vw";
    main.style.left = "-300vw";
}

hello_next()
progress_from_ubroke()