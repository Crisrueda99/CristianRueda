document.addEventListener('DOMContentLoaded', function() {
    // Inicializar funcionalidades
    initializeThemeToggle();
    initializeFormValidation();
    initializeFormSubmission();
    initializeSmoothScroll();
    initializeScrollEffects();
    initializeSmoothNavigation();
    initializeSkillsTags();
    initializeDownloadCV();
    initializeAvatarToggle();
    setupPrintAdjustments();

    console.log('✅ Todas las funcionalidades se han inicializado correctamente');
});

/**
 * Muestra/oculta avatar expandido al click y colapsa al clicar fuera
 */
function initializeAvatarToggle() {
    const avatar = document.querySelector('.nav-avatar');
    if (!avatar) return;

    avatar.addEventListener('click', function(e) {
        e.stopPropagation(); // evitar burbujeo hacia document
        avatar.classList.toggle('expanded');
    });

    // si se hace clic en cualquier otro lugar, quitar la clase
    document.addEventListener('click', function() {
        if (avatar.classList.contains('expanded')) {
            avatar.classList.remove('expanded');
        }
    });
}


/**
 * Inicializa el toggleador de tema oscuro/claro
 */
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    // Verificar preferencia guardada o del sistema
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.textContent = '☀️';
        }
    } else if (prefersDark) {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    }
    
    // Evento del botón
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        themeToggle.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

/**
 * Inicializa la validación del formulario
 */
function initializeFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const inputs = form.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField.call(this);
            }
        });
    });
}

/**
 * Valida un campo individual
 */
function validateField() {
    const field = this;
    const errorSpan = document.getElementById(field.name + 'Error');
    let isValid = true;
    let errorMessage = '';

    // Validaciones específicas
    if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = field.value.trim() !== '' && emailRegex.test(field.value);
        errorMessage = isValid ? '' : 'Por favor ingresa un email válido';
    } else if (field.name === 'name') {
        isValid = field.value.trim().length >= 3;
        errorMessage = isValid ? '' : 'El nombre debe tener al menos 3 caracteres';
    } else if (field.name === 'subject') {
        isValid = field.value.trim().length >= 5;
        errorMessage = isValid ? '' : 'El asunto debe tener al menos 5 caracteres';
    } else if (field.name === 'message') {
        isValid = field.value.trim().length >= 10;
        errorMessage = isValid ? '' : 'El mensaje debe tener al menos 10 caracteres';
    } else {
        isValid = field.value.trim() !== '';
        errorMessage = isValid ? '' : 'Este campo es requerido';
    }

    // Mostrar/ocultar error
    if (!isValid) {
        field.classList.add('error');
        if (errorSpan) {
            errorSpan.textContent = errorMessage;
            errorSpan.classList.add('show');
        }
    } else {
        field.classList.remove('error');
        if (errorSpan) {
            errorSpan.classList.remove('show');
            errorSpan.textContent = '';
        }
    }

    return isValid;
}

/**
 * Inicializa el envío del formulario
 */
function initializeFormSubmission() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validar todos los campos
        const fields = this.querySelectorAll('input, textarea');
        let isFormValid = true;

        fields.forEach(field => {
            const isValid = validateField.call(field);
            if (!isValid) isFormValid = false;
        });

        if (!isFormValid) {
            showFormStatus('Por favor completa el formulario correctamente', 'error');
            return;
        }

        // Simular envío
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';

        // Simular delay de envío
        setTimeout(() => {
            // Crear mailto link
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            const mailtoLink = `mailto:Crisrueda99@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`De: ${name} (${email})\n\n${message}`)}`;

            // Abrir cliente de correo
            window.location.href = mailtoLink;

            showFormStatus('¡Gracias por tu mensaje! Se ha abierto tu cliente de correo.', 'success');
            
            // Resetear formulario
            form.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;

            // Limpiar estado después de 5 segundos
            setTimeout(() => {
                showFormStatus('', '');
            }, 5000);
        }, 1000);
    });
}

/**
 * Muestra estado del formulario
 */
function showFormStatus(message, type) {
    const statusSpan = document.getElementById('formStatus');
    if (!statusSpan) return;

    statusSpan.textContent = message;
    statusSpan.className = `form-status ${type}`;
}

/**
 * Inicializa el scroll suave
 */
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Efectos al hacer scroll
 */
function initializeScrollEffects() {
    window.addEventListener('scroll', debounce(function() {
        const header = document.querySelector('header');
        const navbar = document.querySelector('.navbar');
        
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        }
    }, 50));
}

/**
 * Navegación suave dentro de secciones
 */
function initializeSmoothNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.style.opacity = '1');
            this.style.opacity = '0.6';
        });
    });
}

/**
 * Interactividad de tags de habilidades
 */
function initializeSkillsTags() {
    const tags = document.querySelectorAll('.tag');
    
    tags.forEach(tag => {
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            
            // Feedback visual
            const label = this.textContent.trim();
            console.log(`Habilidad: ${label}`);
        });

        tag.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

/**
 * Inicializar descarga de CV
 */
function initializeDownloadCV() {
    const downloadBtn = document.getElementById('downloadCV');
    if (!downloadBtn) return;

    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('📥 Preparando la página para descarga en PDF');
        window.print();
    });
}

/**
 * Ajustes temporales antes/después de imprimir para forzar fondo blanco,
 * texto negro y adaptar el avatar. Se realiza únicamente con JS, tal como
 * solicitó el usuario.
 */
function setupPrintAdjustments() {
    function applyPrintStyles() {
        document.body.classList.add('print-friendly');
    }
    function removePrintStyles() {
        document.body.classList.remove('print-friendly');
    }
    window.addEventListener('beforeprint', applyPrintStyles);
    window.addEventListener('afterprint', removePrintStyles);
}

/**
 * Función debounce para optimizar performance
 */
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * Exportar funciones globales si es necesario
 */
window.copyToClipboard = function(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('¡Copiado al portapapeles!');
    }).catch(() => {
        alert('No se pudo copiar al portapapeles');
    });
};

/**
 * Detectar cambios de tema del sistema
 */
window.matchMedia('(prefers-color-scheme: dark)').addListener(e => {
    if (e.matches && !localStorage.getItem('theme')) {
        document.body.classList.add('dark-mode');
        document.getElementById('themeToggle').textContent = '☀️';
    }
});

console.log('📜 Script cargado y listo');
