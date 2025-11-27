// Theme Toggle Functionality
const themeToggle = document.getElementById("themeToggle")
const body = document.body
const themeIcon = themeToggle.querySelector("i")

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem("theme") || "light"
body.setAttribute("data-theme", currentTheme)

// Update icon based on current theme
function updateThemeIcon(theme) {
  if (theme === "dark") {
    themeIcon.className = "fas fa-sun"
  } else {
    themeIcon.className = "fas fa-moon"
  }
}

// Initialize icon
updateThemeIcon(currentTheme)

// Theme toggle event listener
themeToggle.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme")
  const newTheme = currentTheme === "dark" ? "light" : "dark"

  body.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)
  updateThemeIcon(newTheme)

  // Add a subtle animation effect
  themeToggle.style.transform = "scale(0.9)"
  setTimeout(() => {
    themeToggle.style.transform = "scale(1)"
  }, 150)
})

// Mobile Menu Functionality
const hamburger = document.getElementById("hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const headerHeight = document.querySelector(".header").offsetHeight
      const targetPosition = target.offsetTop - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Header scroll effect
const header = document.querySelector(".header")
let lastScrollTop = 0

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  // Add/remove scrolled class for styling
  if (scrollTop > 100) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }

  // Hide/show header on scroll (optional)
  if (scrollTop > lastScrollTop && scrollTop > 200) {
    header.style.transform = "translateY(-100%)"
  } else {
    header.style.transform = "translateY(0)"
  }

  lastScrollTop = scrollTop
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".servico-card, .portfolio-item, .depoimento-card, .stat-item").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})

// Carrossel Infinito de Depoimentos
function initTestimonialsCarousel() {
  const carousel = document.getElementById("depoimentosCarousel")
  const cards = carousel.querySelectorAll(".depoimento-card")

  // Clone cards for infinite scroll
  cards.forEach((card) => {
    const clone = card.cloneNode(true)
    carousel.appendChild(clone)
  })

  // Pause animation on hover
  carousel.addEventListener("mouseenter", () => {
    carousel.style.animationPlayState = "paused"
  })

  carousel.addEventListener("mouseleave", () => {
    carousel.style.animationPlayState = "running"
  })
}

// Initialize carousel when DOM is loaded
document.addEventListener("DOMContentLoaded", initTestimonialsCarousel)

// WhatsApp Form Integration
const contatoForm = document.getElementById("contatoForm")

contatoForm.addEventListener("submit", function (e) {
  e.preventDefault()

  // Get form data
  const formData = new FormData(this)
  const nome = formData.get("nome")
  const email = formData.get("email")
  const mensagem = formData.get("mensagem")

  // Simple validation
  if (!nome || !email || !mensagem) {
    showNotification("Por favor, preencha todos os campos.", "error")
    return
  }

  if (!isValidEmail(email)) {
    showNotification("Por favor, insira um e-mail válido.", "error")
    return
  }

  // Create WhatsApp message - EMOJI CORRIGIDO
  const whatsappMessage = `Ola! Gostaria de saber mais sobre o servico

*Nome:* ${nome}
*E-mail:* ${email}
*Mensagem:* ${mensagem}

Aguardo retorno!`

  // Encode message for URL
  const encodedMessage = encodeURIComponent(whatsappMessage)

  // WhatsApp URL
  const whatsappURL = `https://wa.me/5585987485875?text=${encodedMessage}`

  // Show success message
  showNotification("Redirecionando para o WhatsApp...", "success")

  // Open WhatsApp after a short delay
  setTimeout(() => {
    window.open(whatsappURL, "_blank")
    this.reset()
  }, 1500)
})

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification")
  if (existingNotification) {
    existingNotification.remove()
  }

  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.textContent = message

  // Add styles
  Object.assign(notification.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "15px 20px",
    borderRadius: "8px",
    color: "white",
    fontWeight: "500",
    zIndex: "10000",
    transform: "translateX(100%)",
    transition: "transform 0.3s ease",
    maxWidth: "300px",
    wordWrap: "break-word",
  })

  // Set background color based on type
  switch (type) {
    case "success":
      notification.style.background = "#10b981"
      break
    case "error":
      notification.style.background = "#ef4444"
      break
    default:
      notification.style.background = "#6b7280"
  }

  // Add to DOM
  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 300)
  }, 5000)
}

// Parallax effect for hero background elements
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallaxElements = document.querySelectorAll(".bg-element")

  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + index * 0.1
    element.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")

  // Animate hero elements
  const heroTitle = document.querySelector(".hero-title")
  const heroSubtitle = document.querySelector(".hero-subtitle")
  const heroButtons = document.querySelector(".hero-buttons")
  const heroVisual = document.querySelector(".hero-visual")

  if (heroTitle) {
    heroTitle.style.opacity = "0"
    heroTitle.style.transform = "translateY(30px)"
    setTimeout(() => {
      heroTitle.style.transition = "opacity 0.8s ease, transform 0.8s ease"
      heroTitle.style.opacity = "1"
      heroTitle.style.transform = "translateY(0)"
    }, 200)
  }

  if (heroSubtitle) {
    heroSubtitle.style.opacity = "0"
    heroSubtitle.style.transform = "translateY(30px)"
    setTimeout(() => {
      heroSubtitle.style.transition = "opacity 0.8s ease, transform 0.8s ease"
      heroSubtitle.style.opacity = "1"
      heroSubtitle.style.transform = "translateY(0)"
    }, 400)
  }

  if (heroButtons) {
    heroButtons.style.opacity = "0"
    heroButtons.style.transform = "translateY(30px)"
    setTimeout(() => {
      heroButtons.style.transition = "opacity 0.8s ease, transform 0.8s ease"
      heroButtons.style.opacity = "1"
      heroButtons.style.transform = "translateY(0)"
    }, 600)
  }

  if (heroVisual) {
    heroVisual.style.opacity = "0"
    heroVisual.style.transform = "scale(0.8)"
    setTimeout(() => {
      heroVisual.style.transition = "opacity 1s ease, transform 1s ease"
      heroVisual.style.opacity = "1"
      heroVisual.style.transform = "scale(1)"
    }, 800)
  }
})

// Add CSS for loaded state
const style = document.createElement("style")
style.textContent = `
    .header.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
    
    [data-theme="dark"] .header.scrolled {
        background: rgba(17, 24, 39, 0.98);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
    }
    
    .notification {
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }
    
    .blink {
        animation: blink 0.5s step-start infinite;
    }
    
    @keyframes blink {
        50% {
            opacity: 0;
        }
    }
`
document.head.appendChild(style)

// Add click effect to buttons
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span")
    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `

    this.style.position = "relative"
    this.style.overflow = "hidden"
    this.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  })
})

// Add ripple animation
const rippleStyle = document.createElement("style")
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`
document.head.appendChild(rippleStyle)

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(() => {
  // Your scroll handling code here
}, 10)

window.addEventListener("scroll", debouncedScrollHandler)

// ===== EFEITO DE PISCAR DO OLHO =====
let isBlinking = false // Flag para controlar se está piscando

function initEyeBlinkEffect() {
  const logos = document.querySelectorAll(".logo-img")

  function makeEyeBlink() {
    // Prevenir múltiplas animações simultâneas
    if (isBlinking) return

    isBlinking = true

    logos.forEach((logo) => {
      logo.classList.add("blink")
    })

    // Remover a classe após a animação completa
    setTimeout(() => {
      logos.forEach((logo) => {
        logo.classList.remove("blink")
      })
      isBlinking = false
    }, 600)
  }

  // Piscar a cada 4-6 segundos (aleatório para parecer mais natural)
  function scheduleNextBlink() {
    const randomDelay = Math.random() * 2000 + 4000 // Entre 4-6 segundos
    setTimeout(() => {
      makeEyeBlink()
      scheduleNextBlink() // Agendar próxima piscada
    }, randomDelay)
  }

  // Iniciar o ciclo de piscadas
  scheduleNextBlink()

  // Piscar quando passar o mouse sobre a logo (com debounce)
  let hoverTimeout
  logos.forEach((logo) => {
    logo.addEventListener("mouseenter", () => {
      clearTimeout(hoverTimeout)
      hoverTimeout = setTimeout(() => {
        makeEyeBlink()
      }, 100) // Pequeno delay para evitar triggers acidentais
    })

    // Limpar o timeout se o mouse sair antes
    logo.addEventListener("mouseleave", () => {
      clearTimeout(hoverTimeout)
    })
  })
}




