

gsap.from("#about-us img, #about-us-in ",{
  y:50,
  opacity:0,
  duration:1,

  scrollTrigger:{
    trigger:"#about-us",
    scroller:"body",
   
    start:"top 70%",
    end:"top 65%",
    scrub:1
  }  
})

gsap.from(".card", {
    scale: 0.8,
    // opacity:0,
    duration: 1,
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".card",
      scroller: "body",
      // markers:false,
      start: "top 70%",
      end: "top 65%",
      scrub: 1,
    },
  });
  gsap.from("#colon1",{
    y:-70,
    x:-70,
    scrollTrigger:{
        trigger:"#colon1",
        scroller:"body",
        
        start:"top 50%",
        end:"top 45%",
        scrub:4
    }
  })
  gsap.from("#colon2",{
    y:70,
    x:70,
    scrollTrigger:{
        trigger:"#colon1",
        scroller:"body",
       
        start:"top 50%",
        end:"top 45%",
        scrub:4
    }
  })
  gsap.from("#page4 h1",{
    y:50,
    scrollTrigger:{
        trigger:"#page4 h1",
        scroller:"body",
       
        start:"top 75%",
        end:"top 70%",
        scrub:4}
  })