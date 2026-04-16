/* ==========================================================================
   CHOC_CORE // JAVASCRIPT PROTOCOLS
   ========================================================================== */

// --- 1. BOOT SEQUENCE (PRELOADER) ---
function initBootSequence() {
    const bootScreen = document.getElementById('system-boot');
    const progressBar = document.getElementById('load-progress');
    
    setTimeout(() => { progressBar.style.width = '30%'; }, 500);
    setTimeout(() => { progressBar.style.width = '70%'; }, 1200);
    setTimeout(() => { progressBar.style.width = '100%'; }, 1800);
    
    setTimeout(() => {
        bootScreen.style.transition = 'opacity 0.8s ease, filter 0.8s ease';
        bootScreen.style.opacity = '0';
        bootScreen.style.filter = 'blur(10px)';
        
        setTimeout(() => {
            bootScreen.remove();
            document.body.setAttribute('data-system-state', 'online');
            
            const heroSection = document.getElementById('initiator');
            if(heroSection) heroSection.classList.add('is-visible');
            
            initScrollAnimations(); 
        }, 800);
    }, 2800);
}

// --- 2. DYNAMIC ARCHIVES (PROJECT REGISTRY) ---
const archiveData = [
    {
        year: '2026',
        title: 'QUEUECARE',
        type: 'DIGITAL QUEUE SYSTEM',
        tech: ['JAVA', 'HTML', 'JS'],
        link: 'https://github.com/kylevlln',
        image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=600&q=80' 
    },
    {
        year: '2025',
        title: 'REVOCAB',
        type: 'SPACED-REPETITION TRAINER',
        tech: ['PYTHON', 'ML LOGIC'],
        link: 'https://github.com/kylevlln',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80' 
    },
    {
        year: '2024',
        title: 'CHOC_PORTFOLIO',
        type: 'FRONTEND INTERFACE',
        tech: ['HTML', 'CSS', 'JS'],
        link: 'https://github.com/kylevlln',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80' 
    }
];

function populateRegistry() {
    const registry = document.getElementById('project-registry');
    if (!registry) return;

    registry.innerHTML = archiveData.map(proj => `
        <a href="${proj.link}" target="_blank" class="registry-row" data-preview="${proj.image}">
            <div class="reg-year">${proj.year}</div>
            <div class="reg-title">${proj.title}</div>
            <div class="reg-type">${proj.type}</div>
            <div class="reg-tech">
                ${proj.tech.map(t => `<span class="tech-badge">${t}</span>`).join('')}
            </div>
            <div class="reg-action">
                <div class="action-icon">↗</div>
            </div>
        </a>
    `).join('');
}

// --- 3. DYNAMIC CURSOR & IMAGE REVEAL (WITH MOBILE FIX) ---
function initCursorAndHover() {
    // HARDWARE CHECK: If device has a touchscreen, bypass all JS cursor logic to save performance
    if (window.matchMedia("(pointer: coarse)").matches) {
        return; 
    }

    const cursor = document.getElementById('dynamic-cursor');
    const cursorCore = cursor.querySelector('.cursor-core');
    const cursorRing = cursor.querySelector('.cursor-ring');
    
    const previewContainer = document.getElementById('registry-preview-cursor');
    const previewImage = document.getElementById('preview-image');

    if (!cursor || !cursorCore || !cursorRing) return;

    // Track mouse movement
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        
        cursorCore.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
        cursorRing.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
        
        if (previewContainer && previewContainer.style.opacity === '1') {
            previewContainer.style.left = `${x}px`;
            previewContainer.style.top = `${y}px`;
        }
    });

    const interactives = document.querySelectorAll('a, button, .tech-entity');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorRing.style.width = '50px';
            cursorRing.style.height = '50px';
            cursorRing.style.background = 'rgba(255, 255, 255, 0.1)';
        });
        el.addEventListener('mouseleave', () => {
            cursorRing.style.width = '30px';
            cursorRing.style.height = '30px';
            cursorRing.style.background = 'transparent';
        });
    });

    // Handle Image Previews on Project Hover
    setTimeout(() => { // Small timeout to ensure DOM is populated
        const projectRows = document.querySelectorAll('.registry-row');
        projectRows.forEach(row => {
            row.addEventListener('mouseenter', (e) => {
                if(previewContainer && previewImage) {
                    const imgSrc = row.getAttribute('data-preview');
                    previewImage.src = imgSrc;
                    previewContainer.style.opacity = '1';
                    previewContainer.style.transform = 'translate(-50%, -50%) scale(1)';
                }
            });
            
            row.addEventListener('mouseleave', () => {
                if(previewContainer) {
                    previewContainer.style.opacity = '0';
                    previewContainer.style.transform = 'translate(-50%, -50%) scale(0.8)';
                }
            });
        });
    }, 100);
}

// --- 4. TEMPORAL CLOCK (PHILIPPINES TIME SYNC) ---
function initClock() {
    const clockElement = document.getElementById('temporal-clock');
    if (!clockElement) return;

    function updateTime() {
        const now = new Date();
        const options = { 
            timeZone: 'Asia/Manila', 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
        };
        
        const timeString = new Intl.DateTimeFormat('en-US', options).format(now);
        clockElement.textContent = timeString;
    }
    
    setInterval(updateTime, 1000);
    updateTime(); 
}

// --- 5. SMOOTH NAVIGATION SCROLL WITH OFFSET ---
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-matrix a, .scroll-directive');
    const headerOffset = 80; 
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href') ? this.getAttribute('href').substring(1) : 'telemetry';
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                     top: offsetPosition,
                     behavior: "smooth"
                });
            }
        });
    });
}

// --- 6. CINEMATIC FADE IN/OUT (INTERSECTION OBSERVER) ---
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15, 
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    const fadeSections = document.querySelectorAll('.fade-section');
    fadeSections.forEach(section => {
        observer.observe(section);
    });
}

// --- 7. AI TERMINAL LOGIC ---
function initAiTerminal() {
    // Hardware check: Bypassed on mobile since we hide the terminal there
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const chatWindow = document.getElementById('ai-chat-window');
    const openBtn = document.getElementById('open-chat');
    const closeBtn = document.getElementById('close-chat');
    const chatInput = document.getElementById('chat-input');
    const chatOutput = document.getElementById('chat-output');

    if(!chatWindow || !openBtn) return;

    openBtn.addEventListener('click', () => {
        chatWindow.classList.remove('chat-terminal-hidden');
        chatWindow.classList.add('chat-terminal-visible');
        chatInput.focus();
    });

    closeBtn.addEventListener('click', () => {
        chatWindow.classList.remove('chat-terminal-visible');
        chatWindow.classList.add('chat-terminal-hidden');
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && chatInput.value.trim() !== '') {
            const userText = chatInput.value.trim();
            appendMessage('user-message', `guest@choc:~$ ${userText}`);
            chatInput.value = '';
            
            setTimeout(() => {
                generateAiResponse(userText.toLowerCase());
            }, 600);
        }
    });

    function appendMessage(className, text) {
        const p = document.createElement('p');
        p.className = className;
        p.textContent = text;
        chatOutput.appendChild(p);
        chatOutput.scrollTop = chatOutput.scrollHeight; 
    }

    function generateAiResponse(input) {
        let response = "> Command not recognized. Try asking about 'queuecare', 'revocab', 'skills', or 'contact'.";

        if (input.includes('queuecare')) {
            response = "> QUEUECARE: A digital queue and service management system built in 2026. Tech stack includes Java, HTML, and JS.";
        } else if (input.includes('revocab')) {
            response = "> REVOCAB: A flashcard-based language learning app utilizing Spaced Repetition logic. Built in 2025 using Python and ML logic.";
        } else if (input.includes('skills') || input.includes('stack')) {
            response = "> TECH_STACK: Spencer is proficient in React, Next.js, Tailwind, Node.js, Python, PHP, Java, and MySQL/PostgreSQL.";
        } else if (input.includes('contact') || input.includes('email') || input.includes('hire')) {
            response = "> UPLINK: Initiate handshake via email at chocwebster@gmail.com, or GitHub @kylevlln.";
        } else if (input.includes('who are you') || input.includes('spencer')) {
            response = "> BIO: Spencer Villena is a first-year IT student at the University of Pangasinan. Specializes in full-stack development and creative engineering.";
        } else if (input.includes('clear') || input.includes('cls')) {
            chatOutput.innerHTML = ''; 
            return;
        }

        appendMessage('ai-message', response);
    }
}

// --- SYSTEM INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    populateRegistry();      
    initCursorAndHover();    
    initClock();             
    initSmoothScroll();      
    initAiTerminal();        
    initBootSequence();      
});