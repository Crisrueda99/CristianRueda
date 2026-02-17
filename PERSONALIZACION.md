# 🎨 Guía de Personalización

## Cómo Personalizar tu CV Web

### 1. Cambiar Colores

En **styles.css**, accede a la sección `:root`:

```css
:root {
    --primary: #2E7D32;      /* Color principal (verde) */
    --secondary: #1B5E20;    /* Color secundario */
    --dark: #212121;         /* Texto oscuro */
    --light: #F5F5F5;        /* Fondo claro */
}
```

Ejemplos de colores profesionales:
- **Azul**: `#1976D2` (primary), `#0D47A1` (secondary)
- **Morado**: `#7B1FA2` (primary), `#4A148C` (secondary)
- **Rojo**: `#D32F2F` (primary), `#B71C1C` (secondary)
- **Naranja**: `#F57C00` (primary), `#E65100` (secondary)

### 2. Cambiar Contenido

#### Información de Contacto (Header)

En **index.html** busca:

```html
<div class="contact-info">
    <a href="tel:+573188612130">📱 318 861 2130</a> | 
    <a href="mailto:Crisrueda99@gmail.com">📧 Crisrueda99@gmail.com</a>
</div>
```

Reemplaza con tus datos.

#### Redes Sociales

```html
<div class="social-links">
    <a href="https://linkedin.com/in/tu-usuario" class="social-btn">LinkedIn</a>
    <a href="https://github.com/tu-usuario" class="social-btn">GitHub</a>
    <a href="https://twitter.com/tu-usuario" class="social-btn">Twitter</a>
</div>
```

#### Tus Experiencias

```html
<article class="job">
    <div class="job-header">
        <h3>Tu Puesto | Empresa</h3>
        <span class="date">Mes Año – Mes Año</span>
    </div>
    <ul>
        <li>Logro 1</li>
        <li>Logro 2</li>
    </ul>
</article>
```

### 3. Cambiar Animaciones

En **styles.css**:

```css
/* Modificar velocidad */
@keyframes slideDown {
    /* Cambiar de 0.6s a la velocidad que quieras */
    animation: slideDown 0.6s ease-out;
}

/* Agregar nueva animación */
@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
```

### 4. Modificar Tipografía

En **styles.css**, cambia `font-family`:

```css
body {
    /* Actual */
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    
    /* Opciones */
    /* font-family: 'Georgia', serif; */
    /* font-family: 'Courier New', monospace; */
    /* font-family: 'Trebuchet MS', sans-serif; */
}
```

### 5. Agregar Nuevas Secciones

```html
<section id="projects">
    <h2>Proyectos</h2>
    <article>
        <h3>Nombre del Proyecto</h3>
        <p>Descripción...</p>
        <a href="https://github.com/..." class="btn">Ver en GitHub</a>
    </article>
</section>
```

No olvides agregar el link en la navbar:

```html
<li><a href="#projects" class="nav-link">Proyectos</a></li>
```

### 6. Personalizar Logo de Navbar

```html
<div class="nav-logo">CR</div>  <!-- Cambiar "CR" a tus iniciales -->
```

### 7. Cambiar Meta Tags para SEO

En **index.html**, busca:

```html
<meta name="description" content="Tu descripción">
<meta name="keywords" content="tus, palabras, clave">
<meta property="og:title" content="Tu Título">
```

### 8. Agregar Google Analytics

Agrega antes de `</head>`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 9. Servicio de Email Real

Reemplaza en **script.js** la función de envío. Opción con Formspree:

```javascript
// Cambiar:
window.location.href = mailtoLink;

// Por:
fetch('https://formspree.io/f/TU_FORM_ID', {
    method: 'POST',
    body: new FormData(form)
}).then(() => {
    showFormStatus('¡Mensaje enviado!', 'success');
}).catch(() => {
    showFormStatus('Error al enviar', 'error');
});
```

### 10. Dark Mode por Defecto

En **script.js**, busca `initializeThemeToggle()`:

```javascript
// Forzar dark mode al cargar
if (!localStorage.getItem('theme')) {
    document.body.classList.add('dark-mode');
    document.getElementById('themeToggle').textContent = '☀️';
    localStorage.setItem('theme', 'dark');
}
```

### 11. Cambiar Espaciado

En **styles.css**, modifica valores de `padding` y `margin`:

```css
section {
    padding: 2rem;      /* Aumenta para más espacio */
    margin-bottom: 2rem;
}

.cta-box {
    padding: 2.5rem;   /* Aumenta para más visual */
}
```

### 12. Agregar Favicon

Agrega en `<head>`:

```html
<link rel="icon" type="image/x-icon" href="favicon.ico">
```

## 📚 Atajos Útiles

- **Cambiar todo el color primario**: `Ctrl+H` → `#2E7D32` → tu color
- **Cambiar nombre**: `Ctrl+H` → `Cristian Rueda` → tu nombre
- **Cambiar email**: `Ctrl+H` → `Crisrueda99@gmail.com` → tu email

## 🔗 Recursos Útiles

- [Google Fonts](https://fonts.google.com/)
- [Color Picker](https://www.google.com/search?q=color+picker)
- [Animaciones CSS](https://animate.style/)
- [Icons](https://www.flaticon.com/)
- [SEO Checker](https://www.seobility.net/)

## ✅ Checklist de Personalización

- [ ] Cambiar colores primarios
- [ ] Actualizar información de contacto
- [ ] Agregar links de redes sociales
- [ ] Cambiar experiencias
- [ ] Actualizar formación
- [ ] Cambiar certificaciones
- [ ] Personalizar meta tags SEO
- [ ] Cambiar tipografía si lo deseas
- [ ] Agregar Google Analytics
- [ ] Probar en mobile
- [ ] Probar dark mode
- [ ] Probar formulario
- [ ] Validar accesibilidad

---

**¡Listo! Tu CV web está personalizado.**

