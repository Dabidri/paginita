document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica para Revelar al Hacer Scroll (Opcional, mantenida por ahora) ---
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) { // Ejecutar solo si hay elementos reveal en la página
        const revealOnScroll = () => {
            const windowHeight = window.innerHeight;
            revealElements.forEach(el => {
                const elementTop = el.getBoundingClientRect().top;
                const elementVisible = 100;
                if (elementTop < windowHeight - elementVisible) {
                    el.classList.add('active');
                }
            });
        };
        revealOnScroll(); // Verificar al cargar
        window.addEventListener('scroll', revealOnScroll);
    }


    // --- Lógica para el Modal Genérico ---

    const modal = document.getElementById("detailModal");
    // Solo continuar si el modal existe en esta página específica
    if (modal) {
        const modalImg = document.getElementById("modal-detail-img");
        const modalIconEl = document.getElementById("modal-detail-icon");
        const modalTitle = document.getElementById("modal-detail-title");
        const modalText = document.getElementById("modal-detail-text");
        const closeModalBtn = modal.querySelector(".close-btn"); // Buscar dentro del modal

        // --- CONTENIDO MODALES: AVANCES TECNOLÓGICOS ---
        const advancesInfo = {
             ai: {
                name: "Inteligencia Artificial",
                iconClass: "fas fa-brain modal-icon", // Usar la clase CSS para icono
                description: "La IA ya no es ciencia ficción. Comprende sistemas capaces de aprender de datos, reconocer patrones, tomar decisiones y hasta generar contenido creativo. <strong>Impacto:</strong> Está transformando la medicina (diagnóstico), finanzas (predicción), transporte (vehículos autónomos), atención al cliente (chatbots) y mucho más."
            },
             robotics: {
                name: "Robótica",
                iconClass: "fas fa-robot modal-icon",
                description: "Diseño y construcción de máquinas programables para realizar tareas de forma autónoma o semiautónoma. <strong>Avances Clave:</strong> Robots colaborativos ('cobots') que trabajan junto a humanos, robótica quirúrgica de alta precisión, drones para logística y vigilancia, robots para exploración espacial o submarina."
            },
             nanotech: {
                name: "Nanotecnología",
                iconClass: "fas fa-atom modal-icon",
                description: "Ingeniería a escala nanométrica (millonésimas de milímetro). Permite manipular átomos y moléculas para crear materiales con propiedades extraordinarias. <strong>Aplicaciones:</strong> Nuevos fármacos y sistemas de liberación controlada, materiales ultraligeros y resistentes (nanotubos de carbono), electrónica más pequeña y eficiente, catalizadores químicos."
             },
             biotech: {
                name: "Biotecnología",
                iconClass: "fas fa-dna modal-icon",
                description: "Uso de organismos vivos, células o componentes biológicos para desarrollar productos y procesos. <strong>Áreas Destacadas:</strong> Ingeniería genética (CRISPR), desarrollo de vacunas (ARNm), terapias celulares y génicas contra enfermedades, producción de biocombustibles, mejora de cultivos agrícolas."
             },
             '3dprinting': { // Ojo: ID no puede empezar con número, usar comillas o letras
                 name: "Impresión 3D",
                 iconClass: "fas fa-cube modal-icon",
                 description: "También conocida como fabricación aditiva. Construye objetos tridimensionales capa por capa a partir de un modelo digital. <strong>Ventajas:</strong> Prototipado rápido y barato, producción de piezas personalizadas (implantes médicos), fabricación bajo demanda, creación de geometrías complejas."
             },
             renewable: {
                 name: "Energía Renovable",
                 iconClass: "fas fa-solar-panel modal-icon",
                 description: "Fuentes de energía que se reponen naturalmente (solar, eólica, hidroeléctrica, geotérmica). <strong>Importancia Crítica:</strong> Fundamental para combatir el cambio climático reduciendo la dependencia de combustibles fósiles. Los avances se centran en aumentar la eficiencia, reducir costos y mejorar el almacenamiento (baterías)."
             },
              automation: {
                 name: "Automatización",
                 iconClass: "fas fa-cogs modal-icon",
                 description: "Uso de tecnología para realizar tareas previamente hechas por humanos. Va desde líneas de ensamblaje robotizadas hasta software que automatiza procesos de negocio (RPA). <strong>Beneficios:</strong> Aumento de productividad, reducción de errores, mejora de la seguridad laboral, operación 24/7."
              },
              iot: {
                 name: "Internet de las Cosas (IoT)",
                 iconClass: "fas fa-wifi modal-icon",
                 description: "Red de objetos físicos ('cosas') equipados con sensores, software y conectividad para intercambiar datos a través de internet. <strong>Ejemplos:</strong> Hogares inteligentes (termostatos, luces), wearables (relojes), ciudades inteligentes (gestión de tráfico, residuos), industria 4.0 (monitorización de maquinaria)."
              }
            // ... añade más si es necesario
        };

        // --- CONTENIDO MODALES: BIOGRAFÍAS ---
         // ¡¡¡IMPORTANTE!!! Reemplaza 'placeholder_...' con tus rutas reales (o 'images/placeholder_...')
        const biographies = {
            musk: {
                name: "Elon Musk",
                img: "imagenes/placeholder_musk.jpg",
                bio: "Empresario y visionario ... conocido por sus ambiciosos proyectos en vehículos eléctricos, exploración espacial e interfaces cerebro-computadora." // (Tu biografía completa)
            },
            jobs: {
                name: "Steve Jobs",
                img: "imagenes/placeholder_jobs.jpg",
                bio: "Co-fundador y figura icónica de Apple ... Su enfoque en el diseño minimalista y la experiencia de usuario transformaron múltiples mercados." // (Tu biografía completa)
            },
            zuckerberg: { name: "Mark Zuckerberg", img: "imagenes/placeholder_zuckerberg.jpg", bio: "Co-fundador y CEO de Meta Platforms ... Creador de la red social más grande del mundo..." },
            bezos: { name: "Jeff Bezos", img: "imagenes/placeholder_bezos.jpg", bio: "Fundador de Amazon ... Transformó radicalmente el sector minorista..." },
            altman: { name: "Sam Altman", img: "imagenes/placeholder_altman.jpg", bio: "Emprendedor e inversor, CEO de OpenAI ... Figura clave en el auge de la IA generativa." },
            pagebrin: { name: "Larry Page & Sergey Brin", img: "imagenes/placeholder_google.jpg", bio: "Co-fundadores de Google ... Desarrollaron el revolucionario algoritmo PageRank..." }
            // ...
        };


        // Función para ABRIR el modal (más genérica)
        const openDetailModal = (itemId) => {
            const bioData = biographies[itemId];
            const advanceData = advancesInfo[itemId];

            if (bioData) { // Es una Biografía
                modalImg.src = bioData.img;
                modalImg.style.display = 'inline-block'; // Mostrar imagen
                modalIconEl.style.display = 'none';       // Ocultar icono
                modalTitle.textContent = bioData.name;
                modalText.textContent = bioData.bio; // Usar bio aquí
                modal.classList.add('show'); // Mostrar modal con animación
            } else if (advanceData) { // Es un Avance Tecnológico
                modalIconEl.className = advanceData.iconClass; // Establecer clase del icono
                modalIconEl.style.display = 'inline-block';// Mostrar icono
                modalImg.style.display = 'none';          // Ocultar imagen
                modalTitle.textContent = advanceData.name;
                // Usar innerHTML permite usar <strong>, etc. en la descripción
                modalText.innerHTML = advanceData.description;
                modal.classList.add('show'); // Mostrar modal con animación
            } else {
                console.error("Información no encontrada para el ID:", itemId);
            }
        };

        // Función para CERRAR el modal
        const closeModal = () => {
             modal.classList.remove('show'); // Ocultar modal con animación inversa (si se define)
             // Opcional: Resetear contenido para evitar parpadeo la próxima vez
              setTimeout(() => { // Esperar a que termine la transición de opacidad
                   if (modal.style.opacity == 0 || !modal.classList.contains('show')) { // Doble check
                       modalTitle.textContent = "";
                       modalText.textContent = "";
                       modalImg.src = "";
                       modalIconEl.className = "";
                       modalImg.style.display = 'none';
                       modalIconEl.style.display = 'none';
                   }
               }, 300); // Duración de la transición de opacidad en ms
        };

        // Añadir Event Listeners a las TARJETAS CLICKABLES (Avances y Figuras)
        const clickableItems = document.querySelectorAll(".clickable-advance, .clickable-figure");
        clickableItems.forEach(card => {
            card.addEventListener('click', (e) => {
                 // Prevenir comportamiento por defecto si la tarjeta fuera un enlace en el futuro
                 // e.preventDefault();
                const itemId = card.getAttribute('data-modal-id');
                if (itemId) {
                    openDetailModal(itemId);
                } else {
                     console.error("El elemento clickeado no tiene data-modal-id:", card);
                }
            });
        });

        // Añadir Event Listener al botón de CERRAR (X)
        closeModalBtn.addEventListener('click', closeModal);

        // Añadir Event Listener para CERRAR si se hace clic FUERA del contenido
        modal.addEventListener('click', (event) => {
            // Si el clic fue directamente sobre el fondo del modal (y no su contenido)
            if (event.target == modal) {
                closeModal();
            }
        });

        // Opcional: Cerrar modal con la tecla ESCAPE
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.classList.contains('show')) {
                closeModal();
            }
        });

    } // Fin del if (modal)

}); // Fin del DOMContentLoaded