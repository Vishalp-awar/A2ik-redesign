// // document.addEventListener('DOMContentLoaded', () => {
// //     // Mobile navigation
// //     const burger = document.querySelector('.burger');
// //     const nav = document.querySelector('.nav-links');
  
// //     burger.addEventListener('click', () => {
// //       nav.classList.toggle('nav-active');
// //     });
  
// //     // Smooth scrolling for navigation links
// //     document.querySelectorAll('a[href^="#"]').forEach(anchor => {
// //       anchor.addEventListener('click', function (e) {
// //         e.preventDefault();
// //         document.querySelector(this.getAttribute('href')).scrollIntoView({
// //           behavior: 'smooth'
// //         });
// //       });
// //     });
  
// //     // Simple fade-in animation for elements
// //     const fadeInElements = document.querySelectorAll('.fade-in');
    
// //     const fadeInObserver = new IntersectionObserver((entries) => {
// //       entries.forEach(entry => {
// //         if (entry.isIntersecting) {
// //           entry.target.classList.add('visible');
// //         }
// //       });
// //     }, { threshold: 0.1 });
  
// //     fadeInElements.forEach(element => {
// //       fadeInObserver.observe(element);
// //     });
// //   });
  
// document.addEventListener('DOMContentLoaded', () => {
//     // Mobile navigation
//     const burger = document.querySelector('.burger');
//     const nav = document.querySelector('.nav-links');
//     const navLinks = document.querySelectorAll('.nav-links li');

//     burger.addEventListener('click', () => {
//         nav.classList.toggle('nav-active');

//         navLinks.forEach((link, index) => {
//             if (link.style.animation) {
//                 link.style.animation = '';
//             } else {
//                 link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
//             }
//         });

//         burger.classList.toggle('toggle');
//     });

//     // Three.js hero background
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     document.getElementById('hero-background').appendChild(renderer.domElement);

//     // Create particles
//     const particlesGeometry = new THREE.BufferGeometry();
//     const particlesCount = 5000;
//     const posArray = new Float32Array(particlesCount * 3);

//     for (let i = 0; i < particlesCount * 3; i++) {
//         posArray[i] = (Math.random() - 0.5) * 5;
//     }

//     particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

//     const particlesMaterial = new THREE.PointsMaterial({
//         size: 0.005,
//         color: 0x3498db,
//         transparent: true,
//         opacity: 0.8,
//     });

//     const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
//     scene.add(particlesMesh);

//     camera.position.z = 2;

//     // Animation
//     const clock = new THREE.Clock();

//     function animate() {
//         const elapsedTime = clock.getElapsedTime();

//         particlesMesh.rotation.y = elapsedTime * 0.1;
//         particlesMesh.rotation.x = elapsedTime * 0.05;

//         renderer.render(scene, camera);
//         requestAnimationFrame(animate);
//     }
//     animate();

//     window.addEventListener('resize', () => {
//         const newWidth = window.innerWidth;
//         const newHeight = window.innerHeight;
//         camera.aspect = newWidth / newHeight;
//         camera.updateProjectionMatrix();
//         renderer.setSize(newWidth, newHeight);
//     });

//     // GSAP ScrollTrigger animations
//     gsap.registerPlugin(ScrollTrigger);

//     // Animate elements on scroll
//     const animateOnScroll = (elements, stagger = 0.2) => {
//         gsap.from(elements, {
//             opacity: 0,
//             y: 50,
//             stagger: stagger,
//             duration: 1,
//             ease: 'power3.out',
//             scrollTrigger: {
//                 trigger: elements,
//                 start: 'top 80%',
//                 toggleActions: 'play none none reverse'
//             }
//         });
//     };

//     // Apply animations to sections
//     animateOnScroll('.hero-content > *');
//     animateOnScroll('.service-card');
//     animateOnScroll('#about h2, #about p');
//     animateOnScroll('.team-member');
//     animateOnScroll('.process-step');
//     animateOnScroll('.testimonial');
//     animateOnScroll('#contact h2, #contact form');

//     // Parallax effect for About and Process sections
//     gsap.to('#about', {
//         backgroundPosition: `50% ${innerHeight / 2}px`,
//         ease: 'none',
//         scrollTrigger: {
//             trigger: '#about',
//             start: 'top bottom',
//             end: 'bottom top',
//             scrub: true
//         }
//     });

//     gsap.to('#process', {
//         backgroundPosition: `50% ${innerHeight / 2}px`,
//         ease: 'none',
//         scrollTrigger: {
//             trigger: '#process',
//             start: 'top bottom',
//             end: 'bottom top',
//             scrub: true
//         }
//     });

//     // Smooth scrolling for navigation links
//     document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//         anchor.addEventListener('click', function (e) {
//             e.preventDefault();
//             document.querySelector(this.getAttribute('href')).scrollIntoView({
//                 behavior: 'smooth'
//             });
//         });
//     });
// });

document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        burger.classList.toggle('toggle');
    });

    // Three.js setup
    const scenes = {};
    const cameras = {};
    const renderers = {};

    function createScene(sectionId) {
        const canvas = document.getElementById(`${sectionId}-canvas`);
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);

        scenes[sectionId] = scene;
        cameras[sectionId] = camera;
        renderers[sectionId] = renderer;

        return { scene, camera, renderer };
    }

    // Hero section
    const { scene: heroScene, camera: heroCamera, renderer: heroRenderer } = createScene('hero');

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 5;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: 0x00bcd4,
        transparent: true,
        opacity: 0.8,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    heroScene.add(particlesMesh);

    heroCamera.position.z = 2;

    // Services section
    const { scene: servicesScene, camera: servicesCamera, renderer: servicesRenderer } = createScene('services');

    const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xff4081 });
    const cubes = [];

    for (let i = 0; i < 20; i++) {
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.position.set(
            (Math.random() - 0.5) * 5,
            (Math.random() - 0.5) * 5,
            (Math.random() - 0.5) * 5
        );
        cubes.push(cube);
        servicesScene.add(cube);
    }

    servicesCamera.position.z = 5;

    // About section
    const { scene: aboutScene, camera: aboutCamera, renderer: aboutRenderer } = createScene('about');

    const planeGeometry = new THREE.PlaneGeometry(5, 5);
    const planeMaterial = new THREE.MeshBasicMaterial({
        color: 0x1a237e,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    aboutScene.add(plane);

    aboutCamera.position.z = 5;

    // Team section
    const { scene: teamScene, camera: teamCamera, renderer: teamRenderer } = createScene('team');

    const sphereGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x00bcd4 });
    const spheres = [];

    for (let i = 0; i < 30; i++) {
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.set(
            (Math.random() - 0.5) * 5,
            (Math.random() - 0.5) * 5,
            (Math.random() - 0.5) * 5
        );
        spheres.push(sphere);
        teamScene.add(sphere);
    }

    teamCamera.position.z = 5;

    // Process section
    const { scene: processScene, camera: processCamera, renderer: processRenderer } = createScene('process');

    const torusGeometry = new THREE.TorusGeometry(0.3, 0.1, 16, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({ color: 0xff4081 });
    const tori = [];

    for (let i = 0; i < 15; i++) {
        const torus = new THREE.Mesh(torusGeometry, torusMaterial);
        torus.position.set(
            (Math.random() - 0.5) * 5,
            (Math.random() - 0.5) * 5,
            (Math.random() - 0.5) * 5
        );
        tori.push(torus);
        processScene.add(torus);
    }

    processCamera.position.z = 5;

    // Testimonials section
    const { scene: testimonialsScene, camera: testimonialsCamera, renderer: testimonialsRenderer } = createScene('testimonials');

    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.02,
    });

    const starVertices = [];
    for (let i = 0; i < 1000; i++) {
        const x = (Math.random() - 0.5) * 5;
        const y = (Math.random() - 0.5) * 5;
        const z = (Math.random() - 0.5) * 5;
        starVertices.push(x, y, z);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    testimonialsScene.add(stars);

    testimonialsCamera.position.z = 5;

    // Contact section
    const { scene: contactScene, camera: contactCamera, renderer: contactRenderer } = createScene('contact');

    const contactGeometry = new THREE.IcosahedronGeometry(1, 0);
    const contactMaterial = new THREE.MeshBasicMaterial({
        color: 0x00bcd4,
        wireframe: true,
    });
    const contactMesh = new THREE.Mesh(contactGeometry, contactMaterial);
    contactScene.add(contactMesh);

    contactCamera.position.z = 5;

    // Animation
    function animate() {
        requestAnimationFrame(animate);

        // Hero animation
        particlesMesh.rotation.y += 0.001;
        particlesMesh.rotation.x += 0.0005;
        heroRenderer.render(heroScene, heroCamera);

        // Services animation
        cubes.forEach((cube) => {
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
        });
        servicesRenderer.render(servicesScene, servicesCamera);

        // About animation
        plane.rotation.x += 0.005;
        plane.rotation.y += 0.005;
        aboutRenderer.render(aboutScene, aboutCamera);

        // Team animation
        spheres.forEach((sphere) => {
            sphere.position.y += Math.sin(Date.now() * 0.001 + sphere.position.x) * 0.01;
        });
        teamRenderer.render(teamScene, teamCamera);

        // Process animation
        tori.forEach((torus) => {
            torus.rotation.x += 0.01;
            torus.rotation.y += 0.01;
        });
        processRenderer.render(processScene, processCamera);

        // Testimonials animation
        stars.rotation.y += 0.0005;
        testimonialsRenderer.render(testimonialsScene, testimonialsCamera);

        // Contact animation
        contactMesh.rotation.x += 0.005;
        contactMesh.rotation.y += 0.005;
        contactRenderer.render(contactScene, contactCamera);
    }

    animate();

    // GSAP ScrollTrigger animations
    gsap.registerPlugin(ScrollTrigger);

   
    // Animate section title
    gsap.from('.section-title', {
        scrollTrigger: {
            trigger: '.section-title',
            start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        duration: 1,
    });

    // Animate about text paragraphs
    gsap.utils.toArray('.about-text p').forEach((p, i) => {
        gsap.from(p, {
            scrollTrigger: {
                trigger: p,
                start: 'top 80%',
            },
            opacity: 0,
            y: 20,
            duration: 0.8,
            delay: i * 0.2,
        });
    });

    // Animate stat items
    gsap.utils.toArray('.stat-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
            },
            opacity: 0,
            scale: 0.8,
            duration: 0.8,
            delay: i * 0.1,
        });
    });

    // Animate CTA buttons
    gsap.utils.toArray('.btn').forEach((btn, i) => {
        gsap.from(btn, {
            scrollTrigger: {
                trigger: btn,
                start: 'top 90%',
            },
            opacity: 0,
            y: 20,
            duration: 0.8,
            delay: i * 0.2,
        });
    });

    // Parallax effect for background
    gsap.to('#about::before', {
        scrollTrigger: {
            trigger: '#about',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
        },
        y: '20%',
    });

    // Animate elements on scroll
    const animateOnScroll = (elements, stagger = 0.2) => {
        gsap.from(elements, {
            opacity: 0,
            y: 50,
            stagger: stagger,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: elements,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    };

    // Apply animations to sections
    animateOnScroll('.hero-content > *');
    animateOnScroll('.service-card');
    animateOnScroll('#about h2, #about p');
    animateOnScroll('.team-member');
    animateOnScroll('.process-step');
    animateOnScroll('.testimonial');
    animateOnScroll('#contact h2, #contact form');

    // Enhanced parallax effect
    const parallaxSections = ['#about', '#process'];
    parallaxSections.forEach((section) => {
        gsap.to(section, {
            backgroundPosition: `50% ${innerHeight / 2}px`,
            ease: 'none',
            scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });

    // Text animation on scroll
    const textElements = document.querySelectorAll('h1, h2, h3, p');
    textElements.forEach((element) => {
        gsap.from(element, {
            textShadow: '0 0 10px rgba(255,255,255,0.5)',
            color: 'transparent',
            duration: 1,
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                end: 'top 20%',
                scrub: true
            }
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Resize event listener
    window.addEventListener('resize', () => {
        Object.keys(cameras).forEach((sectionId) => {
            const canvas = document.getElementById(`${sectionId}-canvas`);
            const camera = cameras[sectionId];
            const renderer = renderers[sectionId];

            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Locomotive Scroll initialization
    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        multiplier: 1,
        class: 'is-revealed'
    });

    // Refresh Locomotive Scroll on window resize
    window.addEventListener('resize', () => scroll.update());

    // Mobile navigation
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        burger.classList.toggle('toggle');
    });

    // Three.js setup for hero section
    const heroCanvas = document.getElementById('hero-canvas');
    const heroScene = new THREE.Scene();
    const heroCamera = new THREE.PerspectiveCamera(75, heroCanvas.clientWidth / heroCanvas.clientHeight, 0.1, 1000);
    const heroRenderer = new THREE.WebGLRenderer({ canvas: heroCanvas, alpha: true, antialias: true });
    heroRenderer.setSize(heroCanvas.clientWidth, heroCanvas.clientHeight);

    // Particles setup
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 5;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: 0x00bcd4,
        transparent: true,
        opacity: 0.8,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    heroScene.add(particlesMesh);

    heroCamera.position.z = 2;

    // Animation
    function animate() {
        requestAnimationFrame(animate);

        particlesMesh.rotation.y += 0.001;
        particlesMesh.rotation.x += 0.0005;
        heroRenderer.render(heroScene, heroCamera);
    }

    animate();

    // Resize event listener for hero section
    window.addEventListener('resize', () => {
        heroCamera.aspect = heroCanvas.clientWidth / heroCanvas.clientHeight;
        heroCamera.updateProjectionMatrix();
        heroRenderer.setSize(heroCanvas.clientWidth, heroCanvas.clientHeight);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            scroll.scrollTo(targetId);
        });
    });

    // Intersection Observer for revealing elements
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            } else {
                entry.target.classList.remove('revealed');
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(element => revealObserver.observe(element));
});






















// new code

document.addEventListener('DOMContentLoaded', () => {
    // Locomotive Scroll initialization
    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        multiplier: 1,
        class: 'is-revealed'
    });

    // Refresh Locomotive Scroll on window resize
    window.addEventListener('resize', () => scroll.update());

    // Mobile navigation
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        burger.classList.toggle('toggle');
    });

   // Initialize Swiper for Hero Section
const heroSwiper = new Swiper('#home.swiper-container', {
    loop: true, // Enables infinite loop
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 5000, // Auto-slide every 5 seconds
      disableOnInteraction: false,
    },
  });
  
  // Initialize Swiper for Testimonials Section
  const testimonialsSwiper = new Swiper('#testimonials.swiper-container', {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
  });
  
  // Initialize Swiper for Partners Section
  const partnersSwiper = new Swiper('#partners.swiper-container', {
    loop: true,
    slidesPerView: 3, // Number of visible slides
    spaceBetween: 30, // Spacing between slides
    breakpoints: {
      768: { slidesPerView: 3 }, // For tablets
      1024: { slidesPerView: 5 }, // For desktops
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  });
  
    // Three.js setup for hero section
    const heroCanvas = document.createElement('canvas');
    heroCanvas.id = 'hero-canvas';
    document.querySelector('#home').appendChild(heroCanvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: heroCanvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 5;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: 0x00bcd4,
        transparent: true,
        opacity: 0.8,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 2;

    // Animation
    function animate() {
        requestAnimationFrame(animate);

        particlesMesh.rotation.y += 0.001;
        particlesMesh.rotation.x += 0.0005;
        renderer.render(scene, camera);
    }

    animate();

    // Resize event listener for Three.js
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            scroll.scrollTo(targetId);
        });
    });

    // Intersection Observer for revealing elements
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            } else {
                entry.target.classList.remove('revealed');
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(element => revealObserver.observe(element));
});



// show apply job form 
document.addEventListener("DOMContentLoaded", function() {
    const applyButton = document.querySelector(".btn.btn-primary");
    const applyForm = document.getElementById("apply-job");

    applyButton.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent default anchor behavior
        applyForm.style.display = "block"; // Show the form
        applyForm.scrollIntoView({ behavior: "smooth" }); // Scroll to the form
        setTimeout(() => {
            showJobDescription.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
    });
});

// document.addEventListener("DOMContentLoaded", function () {
//     // Add event listener to all job links
//     const jobLinks = document.querySelectorAll(".job-link");

//     jobLinks.forEach((link) => {
//         link.addEventListener("click", function (event) {
//             event.preventDefault(); // Prevent default anchor behavior

//             // // Get the corresponding h4 text
//             // const jobCard = this.closest(".job-card"); // Get the closest parent job card
//             // const jobTitle = jobCard.querySelector("h4").textContent; // Get the h4 content

//             // const JobTitleElement =document.querySelectorAll("#job-title");
//             // JobTitleElement.textContent=jobTitle

//             const jobCard = this.closest(".job-card"); // Get the closest parent job card
//             const jobTitle = jobCard.querySelector("h4").textContent; // Get the h4 content

//             // Update the job title in the Job Description section
//             const jobTitleElement = document.querySelector("#job-title");
//             jobTitleElement.textContent = jobTitle; // Update the text content

//             // const showJobDescription = document.getElementById("job-description");
//             // showJobDescription.style.display = "block"; // Show the job description section
//             // showJobDescription.scrollIntoView({ behavior: "smooth" }); 

//             const showJobDescription = document.getElementById("job-description");
//             showJobDescription.style.display = "block"; // Show the job description section
//             showJobDescription.scrollIntoView({ behavior: "smooth" });

//             // Debug apply-job2 visibility
//             const applyJob2 = document.getElementById("job-boards");
//             console.log("Apply Job2 visible?", applyJob2.offsetParent !== null);
//             console.log("Apply Job2 position:", applyJob2.getBoundingClientRect());
       
//             // Send the text to a function
//             // handleJobClick(jobTitle);
//         });
//     });
// });

document.addEventListener("DOMContentLoaded", function () {
    // Add event listener to all job links
    const jobLinks = document.querySelectorAll(".job-link");

    jobLinks.forEach((link) => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default anchor behavior

            // Get the corresponding h4 text
            const jobCard = this.closest(".job-card");
            const jobTitle = jobCard.querySelector("h4").textContent;

            // Update the job title in the Job Description section
            const jobTitleElement = document.querySelector("#job-title");
            jobTitleElement.textContent = jobTitle;

            // Show the job description section
            const showJobDescription = document.getElementById("job-description");
            showJobDescription.style.display = "block";

            // Ensure page layout updates before scrolling
            setTimeout(() => {
                showJobDescription.scrollIntoView({ behavior: "smooth", block: "start" });
                
            }, 50);
        });
    });
});

// Function to handle job title
function handleJobClick(jobTitle) {
    console.log("Job Title:", jobTitle);

    // Example: Perform an action with the job title
    // You could use this to fetch job details, update the UI, etc.
    alert(`You clicked on: ${jobTitle}`);
}


// analyticshero
document.addEventListener('DOMContentLoaded', () => {
    // GSAP ScrollTrigger setup
    gsap.registerPlugin(ScrollTrigger);

    // Navbar color change on scroll
    const header = document.querySelector('header');
    ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        toggleClass: { className: 'scrolled', targets: header }
    });

    // Parallax effect for sections with parallax-bg
    gsap.utils.toArray('.parallax-section').forEach(section => {
        const parallaxBg = section.querySelector('.parallax-bg');
        gsap.to(parallaxBg, {
            yPercent: 30,
            ease: 'none',
            scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });

    // Animate content boxes
    gsap.utils.toArray('.content-box').forEach(box => {
        gsap.from(box, {
            y: 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: box,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Animate cards
    gsap.utils.toArray('.card').forEach(card => {
        gsap.from(card, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Animate feature items
    gsap.utils.toArray('.feature-item').forEach((item, index) => {
        gsap.from(item, {
            x: index % 2 === 0 ? -50 : 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });
});


// new resource


// Add hover effect to cards
document.querySelectorAll('.resource-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});