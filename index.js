const pages = {
    HELLO: 1,
    UBROKE: 2
}

let current_page = pages.HELLO;

const select_progress = document.getElementById("select_progress");
select_progress.style.left = "0px";

const progress_items = document.getElementsByClassName("progress_item");

tick()

function tick() {
    if (current_page == pages.HELLO) {
        const hello_item = progress_items[0];
        const mid_x = hello_item.getBoundingClientRect().x + hello_item.clientWidth/2;
        select_progress.style.left = `${mid_x - select_progress.clientWidth/2}px`;
    }

    requestAnimationFrame(tick)
}

const name_input = document.getElementById("name")
const name_warn = document.getElementById("name_Warn")
function hello_next() {
    if (name_input.length)
}