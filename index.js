const pages = {
    HELLO: 0,
    UBROKE: 1
}

let current_page = pages.HELLO;

const select_progress = document.getElementById("select_progress");
select_progress.style.left = "0px";
const progress_items = document.getElementsByClassName("progress_item");
const title_texts = document.getElementsByClassName("title_text");
const title = document.getElementById("title");

tick()

function tick() {
    if (current_page == pages.HELLO) {
        const hello_item = progress_items[0];
        const mid_x = hello_item.getBoundingClientRect().x + hello_item.clientWidth/2;
        select_progress.style.left = `${mid_x - select_progress.clientWidth/2}px`;
    }
    
    if (current_page == pages.UBROKE) {
        const hello_item = progress_items[1].children[current_page - 1];
        const mid_x = hello_item.getBoundingClientRect().x + hello_item.clientWidth/2;
        select_progress.style.left = `${mid_x - select_progress.clientWidth/2}px`;
    }

    requestAnimationFrame(tick)
}

const main = document.getElementById("main");

const name_input = document.getElementById("name")
const name_warn = document.getElementById("name_Warn")
document.getElementById("next_hello").onclick = hello_next;
// hello_next();
function hello_next () {

    console.log(name_input.value.length)

    if (name_input.value.length == 0) {
        name_warn.innerText = "At least put something in there"
        name_warn.style.height = "21px";
        return
    }

    console.log(title_texts[current_page]);

    title_texts[current_page].classList.remove("active_title")
    current_page++
    title_texts[current_page].classList.add("active_title")
    title.style.left = "100vw";

    const title_hello_offset = document.getElementById("title_hello_offset");
    title_hello_offset.style.maxHeight = "0px";
    title_hello_offset.style.margin = "0vh";

    progress_items[1].classList.add("secret_revealed");
    
    document.getElementById("veil").style.filter =  "opacity(0)";

    document.getElementById("progress").style.padding = "5vw";
    
    title.style.fontSize = "min(10vh, 10vw)";
    title.style.padding = ""

    main.style.left = "-100vw";
}