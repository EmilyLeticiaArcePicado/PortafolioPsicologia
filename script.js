// Sistema de pestañas con persistencia en localStorage
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Función para activar una pestaña específica
function activateTab(tabId) {
  // Desactivar todas las pestañas
  tabBtns.forEach((btn) => btn.classList.remove('active'));
  tabContents.forEach((content) => content.classList.remove('active'));

  // Activar la pestaña seleccionada
  const activeBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
  const activeContent = document.getElementById(tabId);

  if (activeBtn && activeContent) {
    activeBtn.classList.add('active');
    activeContent.classList.add('active');
    // Guardar en localStorage
    localStorage.setItem('activeTab', tabId);
  }
}

// Agregar evento de click a cada botón
tabBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const tabId = btn.getAttribute('data-tab');
    activateTab(tabId);
  });
});

// Al cargar la página, recuperar la última pestaña activa
const savedTab = localStorage.getItem('activeTab');
if (savedTab && document.getElementById(savedTab)) {
  activateTab(savedTab);
} else {
  // Si no hay pestaña guardada o no existe, activar "inicio"
  activateTab('inicio');
}

// Mostrar popup de conceptos
function mostrarConcepto(titulo, descripcion) {
  const popupTitulo = document.getElementById('popup-titulo');
  const popupDescripcion = document.getElementById('popup-descripcion');
  const popup = document.getElementById('popup');

  if (popupTitulo && popupDescripcion && popup) {
    popupTitulo.innerText = titulo;
    popupDescripcion.innerText = descripcion;
    popup.style.display = 'flex';
  } else {
    alert(titulo + '\n\n' + descripcion);
  }
}

function cerrarPopup() {
  const popup = document.getElementById('popup');
  if (popup) {
    popup.style.display = 'none';
  }
}

// Cerrar popup haciendo clic fuera
window.onclick = function (event) {
  const popup = document.getElementById('popup');
  if (popup && event.target === popup) {
    popup.style.display = 'none';
  }
};

// Animación de barras de progreso cuando se ve la pestaña de crecimiento
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bars = document.querySelectorAll('.progress-bar');
        bars.forEach((bar) => {
          const width = bar.style.width;
          bar.style.width = '0%';
          setTimeout(() => {
            bar.style.width = width;
          }, 100);
        });
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 },
);

const growthTab = document.getElementById('crecimiento');
if (growthTab) {
  observer.observe(growthTab);
}

// También observar el timeline dentro de crecimiento
const timelineItems = document.querySelectorAll('.timeline');
timelineItems.forEach((item) => {
  observer.observe(item);
});
