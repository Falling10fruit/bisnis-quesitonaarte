const pages = {
    HELLO: 0,
    UBROKE: 1,
    TASTE: 2,
    CALCFUNC: 3,
    VIDEOAD: 4,
    THANKS: 5
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

let stages = {
    awaiting: -1,
    blackout: 0,
    playing: 1,
    relive: 2,
}

let video_stage = stages.awaiting;
const growing_overlay = document.createElement("div");
growing_overlay.style.position = "fixed";
growing_overlay.style.zIndex = 7;
const video_overlay = document.getElementById("video_overlay");
const growing_overlay_dims = {
    left: video_overlay.getBoundingClientRect().x,
    top: video_overlay.getBoundingClientRect().top- Math.min(window.innerHeight*0.05, window.innerHeight*0.05),
    width: video_overlay.clientWidth,
    height: video_overlay.clientHeight,
    alpha: 0,
}
const update_overlay = () => {
    growing_overlay.style.top = `${growing_overlay_dims.top}px`;
    growing_overlay.style.left = `${growing_overlay_dims.left}px`;
    growing_overlay.style.width = `${growing_overlay_dims.width}px`;
    growing_overlay.style.height = `${growing_overlay_dims.height}px`;
    growing_overlay.style.backgroundColor = `rgba(0, 0, 0, ${growing_overlay_dims.alpha})`;
}
update_overlay()
document.body.appendChild(growing_overlay);
const actual_video = document.getElementById("actual_video");
const video_container = document.getElementById("video_container");

tick()

function tick() {
    if (current_page == pages.HELLO) {
        const hello_item = progress_items[0];
        const mid_x = hello_item.getBoundingClientRect().x + hello_item.clientWidth/2;
        select_progress.style.left = `${mid_x - select_progress.clientWidth/2}px`;
    }

    if (current_page > 0 && current_page != pages.THANKS) {
        const hello_item = progress_items[1].children[current_page];
        const mid_x = hello_item.getBoundingClientRect().x + hello_item.clientWidth/2;
        select_progress.style.left = `${mid_x - select_progress.clientWidth/2}px`;
    }
    
    if (current_page == pages.THANKS) {
        const hello_item = progress_items[2];
        const mid_x = hello_item.getBoundingClientRect().x + hello_item.clientWidth/2;
        select_progress.style.left = `${mid_x - select_progress.clientWidth/2}px`;
    }
    
    if (current_page == pages.TASTE) {
        const carousel_space = carousel_1_figure.clientWidth + window.innerWidth * 0.07;
        const remaining_space = window.innerWidth*0.8 - carousel_1_figure.clientWidth;
        // const total_offset = mouse.offset_x + mouse.past_offset_x;

        carousel_inner.style.left = `${-carousel_space * carousel_taste + remaining_space/2}px`;
    }

    if (video_stage == stages.awaiting) {
        growing_overlay_dims.left = video_overlay.getBoundingClientRect().x;
        console.log(video_overlay.getBoundingClientRect().x)

    }

    if (video_stage == stages.blackout) {
        if (growing_overlay_dims.top < 0.01 && growing_overlay_dims.top < 0.01 && growing_overlay_dims.alpha > 0.99) {
            video_stage = stages.playing;
            actual_video.style.filter = "opacity(1)";
            actual_video.play();

            document.getElementById("video_quiz").style.maxHeight = "100px";
        }

        growing_overlay_dims.top *= 0.5;
        growing_overlay_dims.left *= 0.5;
        growing_overlay_dims.width += (window.innerWidth - growing_overlay_dims.width)/2;
        growing_overlay_dims.height += (window.innerHeight - growing_overlay_dims.height)/2;
        growing_overlay_dims.alpha += (1 - growing_overlay_dims.alpha)/2;
    }

    update_overlay();
    video_container.style.height = `${video_container.children[0].clientHeight}px`

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
    progress_items[1].classList.toggle("secret_revealed");

    // REVERT THIS WHEN YOU SAY THANK YOU
    document.getElementById("veil").style.filter =  "opacity(0)";

    // REVERT THIS WHEN YOU SAY THANK YOU
    const height = progress.clientHeight/2 + 5;
    select_progress.classList.toggle("secret_revealed");

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

let is_imagead_good = true;
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
    is_imagead_good = false
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

const wanted_functions = {
    constants: false,
    graphing: false,
    integrals: false,
    regression: false,
    sigma: false,
    turing: false
}
const func_grid_children = document.getElementById("func_grid").children;
for (let i = 0; i < func_grid_children.length; i++) { func_grid_children[i].onclick = handle_func_click; }
let wanted_count = 0;
const func_next = document.getElementById("func_next");
function handle_func_click () {
    this.classList.toggle("active");
    wanted_functions[this.id] = !wanted_functions[this.id];

    if (this.classList.contains("active")) {
        wanted_count++
    } else {
        wanted_count--
    }

    if (wanted_count == 0) {
        func_next.innerText = "I don't need anything";
    } else {
        func_next.innerText = "This please";
    }
}

func_next.onclick = go_from_calcfunc;
function go_from_calcfunc () {
    title_texts[current_page].classList.remove("active_title")
    current_page++
    title_texts[current_page].classList.add("active_title")
    title.classList.remove("calcfunc");
    title.classList.add("videoad");

    document.getElementById("title_calcfunc_offset").classList.toggle("active");

    title.style.left = "400vw";
    main.style.left = "-400vw";
}

const videoad = video_container.children[0];
console.log(videoad.clientHeight)
videoad.onload = () => {
    console.log("videoad")
    video_container.style.height = `${videoad.clientHeight}px`;
}
growing_overlay.onclick = () => {
    video_stage = stages.blackout;
    growing_overlay.onclick = () => {};
}

actual_video.onended = () => {
    video_stage = stages.relive;

    setTimeout(() => {
        actual_video.style.pointerEvents = "none";
        actual_video.style.filter = "opacity(0)";
        growing_overlay.style.filter = "opacity(0)";
        growing_overlay.style.pointerEvents = "none";
    }, 500);
}

let videoad_good = true;
const video_quiz = document.getElementById("video_quiz");
const wrong_button = document.getElementById("wrong_video");
const right_button = document.getElementById("video_next");
let already_swapped = true;
wrong_button.onclick = () => {
    videoad_good = false;
    // console.log("already_swapped", already_swapped)

    const gap = Math.min(window.innerWidth*0.02, window.innerHeight*0.02) * 2;
    const wrong_translate = gap + right_button.clientWidth;
    const right_translate = gap + wrong_button.clientWidth;

    already_swapped = !already_swapped;

    if (already_swapped) {
        wrong_button.style.transform = `translateX(0px)`;
        right_button.style.transform = `translateX(0px)`;
        return
    }

    wrong_button.style.transform = `translateX(-${wrong_translate}px)`;
    right_button.style.transform = `translateX(${right_translate}px)`;
}

right_button.onclick = fuckn_finally;

function fuckn_finally() {
    title_texts[current_page].classList.remove("active_title")
    current_page++
    title_texts[current_page].classList.add("active_title")
    title.classList.remove("videoad");
    title.classList.add("thanku");

    // REVERT THIS WHEN YOU SAY THANK YOU
    progress_items[1].classList.toggle("secret_revealed");

    // REVERT THIS WHEN YOU SAY THANK YOU
    document.getElementById("veil").style.filter =  "opacity(1)"; // reverted, now the stuff should reappear

    // REVERT THIS WHEN YOU SAY THANK YOU
    select_progress.classList.toggle("secret_revealed");

    title.style.left = "500vw";
    main.style.left = "-500vw";

    upload_to_database();
}

const no_lol = document.getElementById("no_lol");
no_lol.onclick = () => {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });

    no_lol.innerText = "No you don't"
    no_lol.onclick = () => {};
}

if (localStorage.getItem("data") == null) {
    localStorage.setItem("data", "[]");
}

    let data = JSON.parse(localStorage.getItem("data"));
    let color;
    switch (carousel_taste) {
        case 0:
            color = "black";
            break;
        case 1:
            color = "yellow";
            break;
        case 2:
            color = "white";
            break;
        default:
            color = "black";
    }
    const data_to_insert = {
        name: name_input.value,
        image_good: is_imagead_good,
        color: color
    }
    data.push(data_to_insert);
    localStorage.setItem("data", data);

async function upload_to_database() {
    // const { name, imagead, constants, graph, integrals, regression, sigma, turing, color, videoad} = JSON.parse(request.body);
    
    let color;
    switch (carousel_taste) {
        case 0:
            color = "black";
            break;
        case 1:
            color = "yellow";
            break;
        case 2:
            color = "white";
            break;
        default:
            color = "black";
    }

    const body = JSON.stringify({
        name: name_input,
        imagead: is_imagead_good,
        constants: wanted_functions.constants,
        graph: wanted_functions.graphing,
        integrals: wanted_functions.integrals,
        regression: wanted_functions.regression,
        sigma: wanted_functions.sigma,
        turing: wanted_functions.turing,
        color: color,
        videoad: videoad_good
    });

    const res = await fetch("/.netlify/functions/upload_to_database", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    });
    const confirm = await res.json();
    console.log(confirm);
}

// name_input.value = "Johhny"
// hello_next();
// progress_from_ubroke();
// taste_next();
// go_from_calcfunc();