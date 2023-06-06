//Change NavBar Style on Scroll

window.addEventListener("scroll", () => {
    document.querySelector("nav").classList.toggle('window-scroll', window.scrollY > 100);
});
//show/hide answer faq

const faqs = document.querySelectorAll(".faq");

faqs.forEach((faq) => {
    faq.addEventListener("click", () => {
        faq.classList.toggle("open");

        //change icon
        const icon = faq.querySelector(".faq__icon i");
        if(icon.className === "uil uil-plus"){
            icon.className = "uil uil-minus";
        }else{
            icon.className = "uil uil-plus";
        }
    });
});

//show/hide menu

const menu = document.querySelector(".nav__menu");
const menuBtn = document.querySelector("#open-menu-btn");
const closeBtn = document.querySelector("#close-menu-btn");

menuBtn.addEventListener("click", () => {
    menu.style.display = "flex";
    closeBtn.style.display = "inline-block";
    menuBtn.style.display = "none";
}); 

closeBtn.addEventListener("click", () => {
    menu.style.display = "none";
    closeBtn.style.display = "none";
    menuBtn.style.display = "inline-block";
});

const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});