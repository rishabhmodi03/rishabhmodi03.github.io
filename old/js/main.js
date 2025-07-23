// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Custom cursor
    const cursor = {
        dot: document.querySelector('.cursor-dot'),
        outline: document.querySelector('.cursor-outline'),
        
        init: function() {
            // Check if we're on a device with touch capability
            if ('ontouchstart' in window) {
                document.documentElement.classList.add('touch-device');
                return;
            }
            
            document.addEventListener('mousemove', e => {
                // Update cursor position
                cursor.dot.style.left = `${e.clientX}px`;
                cursor.dot.style.top = `${e.clientY}px`;
                
                // Add a slight delay to the outline for effect
                setTimeout(() => {
                    cursor.outline.style.left = `${e.clientX}px`;
                    cursor.outline.style.top = `${e.clientY}px`;
                }, 50);
            });
            
            // Add hover effect to all clickable elements
            const clickables = document.querySelectorAll('a, button, input, textarea, .project-card, .social-icon');
            clickables.forEach(element => {
                element.addEventListener('mouseenter', () => {
                    cursor.outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                    cursor.outline.style.opacity = '0.5';
                    cursor.dot.style.opacity = '0.5';
                });
                
                element.addEventListener('mouseleave', () => {
                    cursor.outline.style.transform = 'translate(-50%, -50%) scale(1)';
                    cursor.outline.style.opacity = '1';
                    cursor.dot.style.opacity = '1';
                });
            });
        }
    };
    
    // Navigation
    const nav = {
        navbar: document.querySelector('.navbar'),
        navToggle: document.getElementById('navToggle'),
        navMenu: document.querySelector('.nav-menu'),
        navLinks: document.querySelectorAll('.nav-link'),
        
        init: function() {
            // Toggle mobile menu
            if (nav.navToggle) {
                nav.navToggle.addEventListener('click', () => {
                    nav.navToggle.classList.toggle('active');
                    nav.navMenu.classList.toggle('active');
                });
            }
            
            // Close mobile menu when a link is clicked
            nav.navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    nav.navToggle.classList.remove('active');
                    nav.navMenu.classList.remove('active');
                });
            });
            
            // Change navbar style on scroll
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    nav.navbar.classList.add('scrolled');
                } else {
                    nav.navbar.classList.remove('scrolled');
                }
            });
        }
    };
    
    // Skills section tabs
    const skillsTabs = {
        tabBtns: document.querySelectorAll('.tab-btn'),
        tabPanes: document.querySelectorAll('.tab-pane'),
        
        init: function() {
            skillsTabs.tabBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Remove active class from all buttons
                    skillsTabs.tabBtns.forEach(b => b.classList.remove('active'));
                    
                    // Add active class to clicked button
                    btn.classList.add('active');
                    
                    // Get the tab to activate
                    const tabId = btn.getAttribute('data-tab');
                    
                    // Hide all tab panes
                    skillsTabs.tabPanes.forEach(pane => pane.classList.remove('active'));
                    
                    // Show the selected tab pane
                    document.getElementById(tabId).classList.add('active');
                });
            });
            
            // Initialize skill circles
            document.querySelectorAll('.skill-circle').forEach(circle => {
                const percent = circle.getAttribute('data-percent');
                circle.style.setProperty('--percent', `${percent}%`);
            });
        }
    };
    
    // Project filters
    const projectFilters = {
        filterBtns: document.querySelectorAll('.filter-btn'),
        projectCards: document.querySelectorAll('.project-card'),
        
        init: function() {
            projectFilters.filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Remove active class from all buttons
                    projectFilters.filterBtns.forEach(b => b.classList.remove('active'));
                    
                    // Add active class to clicked button
                    btn.classList.add('active');
                    
                    // Get the filter value
                    const filter = btn.getAttribute('data-filter');
                    
                    // Filter projects
                    projectFilters.projectCards.forEach(card => {
                        if (filter === 'all') {
                            card.style.display = 'block';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'scale(1)';
                            }, 50);
                        } else {
                            if (card.getAttribute('data-category').includes(filter)) {
                                card.style.display = 'block';
                                setTimeout(() => {
                                    card.style.opacity = '1';
                                    card.style.transform = 'scale(1)';
                                }, 50);
                            } else {
                                card.style.opacity = '0';
                                card.style.transform = 'scale(0.8)';
                                setTimeout(() => {
                                    card.style.display = 'none';
                                }, 300);
                            }
                        }
                    });
                });
            });
        }
    };
    
    // Back to top button
    const backToTop = {
        button: document.querySelector('.back-to-top'),
        
        init: function() {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    backToTop.button.classList.add('active');
                } else {
                    backToTop.button.classList.remove('active');
                }
            });
        }
    };
    
    // Terminal animation
    const terminal = {
        commands: [
            { command: 'view skills', delay: 1000 },
            { command: 'list projects', delay: 3000 },
            { command: 'show contact', delay: 5000 }
        ],
        commandIndex: 0,
        prompt: document.querySelector('.terminal-content .prompt'),
        commandSpan: document.querySelector('.terminal-content .command'),
        cursor: document.querySelector('.terminal-content .cursor'),
        
        init: function() {
            if (!terminal.commandSpan) return;
            
            terminal.typeCommand();
        },
        
        typeCommand: function() {
            const currentCommand = terminal.commands[terminal.commandIndex].command;
            let charIndex = 0;
            
            // Clear previous command
            terminal.commandSpan.textContent = '';
            
            // Type the command character by character
            const typeInterval = setInterval(() => {
                if (charIndex < currentCommand.length) {
                    terminal.commandSpan.textContent += currentCommand.charAt(charIndex);
                    charIndex++;
                } else {
                    clearInterval(typeInterval);
                    
                    // Move to next command after delay
                    setTimeout(() => {
                        terminal.commandIndex = (terminal.commandIndex + 1) % terminal.commands.length;
                        terminal.typeCommand();
                    }, terminal.commands[terminal.commandIndex].delay);
                }
            }, 100);
        }
    };
    
    // Contact form
    const contactForm = {
        form: document.getElementById('contactForm'),
        
        init: function() {
            if (contactForm.form) {
                contactForm.form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    // Here you would normally send the form data to a server
                    // For this demo, we'll just show a success message
                    
                    // Get form data
                    const formData = new FormData(contactForm.form);
                    const formValues = Object.fromEntries(formData.entries());
                    
                    console.log('Form submitted:', formValues);
                    
                    // Show success message (you can implement this better)
                    alert('Thank you for your message! I will get back to you soon.');
                    
                    // Reset form
                    contactForm.form.reset();
                });
            }
        }
    };
    
    // Initialize all components
    cursor.init();
    nav.init();
    skillsTabs.init();
    projectFilters.init();
    backToTop.init();
    terminal.init();
    contactForm.init();
    
    // GSAP animations (if GSAP is available)
    if (typeof gsap !== 'undefined') {
        // Hero section animations
        gsap.from('.hero-content h1', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
        
        gsap.from('.hero-content .typed-container', {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.3,
            ease: 'power3.out'
        });
        
        gsap.from('.hero-cta', {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.6,
            ease: 'power3.out'
        });
        
        // ScrollTrigger for sections
        if (typeof ScrollTrigger !== 'undefined') {
            // About section
            gsap.from('.about-image', {
                x: -100,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: '.about-content',
                    start: 'top 80%'
                }
            });
            
            gsap.from('.about-text', {
                x: 100,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: '.about-content',
                    start: 'top 80%'
                }
            });
            
            // Skills section
            gsap.from('.skill-item', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: '.skills-grid',
                    start: 'top 80%'
                }
            });
            
            // Projects section
            gsap.from('.project-card', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: '.projects-grid',
                    start: 'top 80%'
                }
            });
        }
    }
});


// Games preview
fetch('https://rishabhmodi03.github.io/assets/js/games.js')
  .then(response => response.text())
  .then(scriptText => {
    // Extract games data from the script
    const gamesMatch = scriptText.match(/const games = (\[[\s\S]*?\]);/);
    if (gamesMatch && gamesMatch[1]) {
      const gamesData = JSON.parse(gamesMatch[1].replace(/`[\s\S]*?`/g, '""'));
      
      // Get the preview container
      const gamesPreviewCards = document.querySelector('.games-preview-cards');
      
      // Display first 3 games
      if (gamesPreviewCards) {
        gamesData.slice(0, 3).forEach(game => {
          const gameCard = document.createElement('div');
          gameCard.className = 'game-preview-card';
          gameCard.innerHTML = `
            <img src="${game.image}" alt="${game.title}">
            <h3>${game.title}</h3>
            <a href="${game.playLink}" class="game-play-btn">Play</a>
          `;
          gamesPreviewCards.appendChild(gameCard);
        });
      }
    }
  })
  .catch(error => console.error('Error loading games data:', error));

// Reddit Feed Functionality using JSON API
document.addEventListener('DOMContentLoaded', function() {
    const singularityFeed = document.getElementById('singularity-posts');
    if (!singularityFeed) return;

    // Function to format date
    function formatDate(timestamp) {
        const date = new Date(timestamp * 1000); // Reddit uses Unix timestamps
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    // Function to limit text length
    function truncateText(text, maxLength) {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    }

    // Function to decode HTML entities
    function decodeHtml(html) {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    }

    // Reddit JSON endpoint for r/singularity
    const subredditUrl = 'https://api.allorigins.win/raw?url=https://www.reddit.com/r/singularity.json';
    
    // Use fetch with appropriate headers to mimic a browser request
    fetch(subredditUrl, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; YourWebsite/1.0; +https://yourwebsite.com)'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Clear loading spinner
        singularityFeed.innerHTML = '';
        
        // Check if we have posts
        const posts = data.data.children;
        if (!posts || posts.length === 0) {
            singularityFeed.innerHTML = '<div class="feed-error">No posts found. Please try again later.</div>';
            return;
        }
        
        // Process and display up to 10 posts
        const postsToShow = Math.min(posts.length, 10);
        
        for (let i = 0; i < postsToShow; i++) {
            const post = posts[i].data;
            
            // Skip posts that are stickied, as they're usually announcements
            if (post.stickied && i > 0) continue;
            
            // Extract post data
            const title = decodeHtml(post.title);
            const permalink = `https://www.reddit.com${post.permalink}`;
            const author = post.author;
            const created = formatDate(post.created_utc);
            const score = post.score;
            const numComments = post.num_comments;
            
            // Get post content - selftext for text posts, or link details for link posts
            let excerpt = '';
            if (post.selftext) {
                excerpt = truncateText(decodeHtml(post.selftext), 200);
            } else if (post.is_video) {
                excerpt = '[Video content]';
            } else if (post.url) {
                excerpt = `[Link] ${truncateText(post.url, 100)}`;
            }
            
            // Create post thumbnail if available
            let thumbnailHtml = '';
            if (post.thumbnail && post.thumbnail.startsWith('http')) {
                thumbnailHtml = `
                    <div class="post-thumbnail">
                        <img src="${post.thumbnail}" alt="Post thumbnail">
                    </div>
                `;
            }
            
            // Create post element
            const postElement = document.createElement('div');
            postElement.className = 'reddit-post';
            postElement.innerHTML = `
                <div class="post-header">
                    <span class="post-author">Posted by u/${author}</span>
                    <span class="post-date">${created}</span>
                </div>
                <h4 class="post-title">
                    <a href="${permalink}" target="_blank">${title}</a>
                </h4>
                ${thumbnailHtml}
                <p class="post-excerpt">${excerpt}</p>
                <div class="post-meta">
                    <span class="post-score">
                        <i class="fas fa-arrow-up"></i> ${score} points
                    </span>
                    <span class="post-comments">
                        <i class="far fa-comment"></i> ${numComments} comments
                    </span>
                </div>
            `;
            
            singularityFeed.appendChild(postElement);
        }
        
        // Add a footer with attribution and link
        const footerElement = document.createElement('div');
        footerElement.className = 'feed-footer';
        footerElement.innerHTML = `
            <p>Content from Reddit's r/singularity community</p>
            <a href="https://www.reddit.com/r/singularity/" target="_blank" class="reddit-link">
                <i class="fab fa-reddit-alien"></i> Visit r/singularity
            </a>
        `;
        
        singularityFeed.parentNode.appendChild(footerElement);
    })
    .catch(error => {
        console.error('Error fetching r/singularity data:', error);
        singularityFeed.innerHTML = `
            <div class="feed-error">
                <p>Failed to load posts from r/singularity.</p>
                <p>Error: ${error.message}</p>
                <p>This may be due to Reddit's API limitations or CORS policies.</p>
            </div>
        `;
    });
});