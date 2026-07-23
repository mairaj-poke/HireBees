/* =====================================================
   HireBees - Main JavaScript
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ==========================================
     Sticky Navbar
  ========================================== */

  const navbar = document.querySelector(".navbar");

  function handleNavbar() {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleNavbar);
  handleNavbar();

  /* ==========================================
     Scroll To Top
  ========================================== */

  const scrollBtn = document.getElementById("scrollTop");

  if (scrollBtn) {

    scrollBtn.style.opacity = "0";
    scrollBtn.style.pointerEvents = "none";

    window.addEventListener("scroll", () => {

      if (window.scrollY > 600) {

        scrollBtn.style.opacity = "1";
        scrollBtn.style.pointerEvents = "auto";

      } else {

        scrollBtn.style.opacity = "0";
        scrollBtn.style.pointerEvents = "none";

      }

    });

    scrollBtn.addEventListener("click", () => {

      window.scrollTo({

        top:0,
        behavior:"smooth"

      });

    });

  }

  /* ==========================================
     Smooth Anchor Scroll
  ========================================== */

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e){

      const target=document.querySelector(this.getAttribute("href"));

      if(target){

        e.preventDefault();

        target.scrollIntoView({

          behavior:"smooth",
          block:"start"

        });

      }

    });

  });

  /* ==========================================
     FAQ Accordion
  ========================================== */

  document.querySelectorAll(".faq-item").forEach(item=>{

    const button=item.querySelector("button");
    const content=item.querySelector(".faq-content");

    content.style.maxHeight="0px";
    content.style.overflow="hidden";
    content.style.transition=".35s";

    button.addEventListener("click",()=>{

      const open=item.classList.contains("active");

      document.querySelectorAll(".faq-item").forEach(i=>{

        i.classList.remove("active");

        const c=i.querySelector(".faq-content");

        c.style.maxHeight="0px";

      });

      if(!open){

        item.classList.add("active");

        content.style.maxHeight=content.scrollHeight+"px";

      }

    });

  });

  /* ==========================================
     Animated Numbers
  ========================================== */

  const counters=document.querySelectorAll(".trust-card h2");

  const counterObserver=new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

      if(!entry.isIntersecting) return;

      const counter=entry.target;

      const txt=counter.innerText;

      const number=parseInt(txt.replace(/\D/g,""));

      if(isNaN(number)) return;

      let current=0;

      const speed=Math.ceil(number/80);

      const update=()=>{

        current+=speed;

        if(current>number) current=number;

        counter.innerText=current+"+";

        if(current<number){

          requestAnimationFrame(update);

        }

      };

      update();

      counterObserver.unobserve(counter);

    });

  },{

    threshold:.6

  });

  counters.forEach(c=>counterObserver.observe(c));

  /* ==========================================
     Reveal Animation
  ========================================== */

  const revealItems=document.querySelectorAll(

".service-card,.industry-card,.process-card,.testimonial-card,.benefit-item,.glass-card,.trust-card"

  );

  revealItems.forEach(item=>{

    item.style.opacity="0";

    item.style.transform="translateY(40px)";

    item.style.transition=".7s ease";

  });

  const revealObserver=new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

      if(entry.isIntersecting){

        entry.target.style.opacity="1";

        entry.target.style.transform="translateY(0)";

      }

    });

  },{

    threshold:.18

  });

  revealItems.forEach(item=>revealObserver.observe(item));

  /* ==========================================
     Active Navigation
  ========================================== */

  const sections=document.querySelectorAll("section[id]");

  const navLinks=document.querySelectorAll(".nav-menu a");

  window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

      const top=section.offsetTop-120;

      const height=section.offsetHeight;

      if(pageYOffset>=top){

        current=section.getAttribute("id");

      }

    });

    navLinks.forEach(link=>{

      link.classList.remove("active");

      if(link.getAttribute("href")==="#"+current){

        link.classList.add("active");

      }

    });

  });

  /* ==========================================
     Floating Hero Cards
  ========================================== */

  const cards=document.querySelectorAll(".floating-card");

  window.addEventListener("mousemove",(e)=>{

    const x=(e.clientX/window.innerWidth)-0.5;

    const y=(e.clientY/window.innerHeight)-0.5;

    cards.forEach((card,index)=>{

      const depth=(index+1)*12;

      card.style.transform=

      `translate(${x*depth}px,${y*depth}px)`;

    });

  });

  /* ==========================================
     Button Ripple
  ========================================== */

  document.querySelectorAll(".primary-btn").forEach(btn=>{

    btn.addEventListener("click",function(e){

      const ripple=document.createElement("span");

      ripple.className="ripple";

      const rect=this.getBoundingClientRect();

      ripple.style.left=e.clientX-rect.left+"px";

      ripple.style.top=e.clientY-rect.top+"px";

      this.appendChild(ripple);

      setTimeout(()=>{

        ripple.remove();

      },700);

    });

  });

});
