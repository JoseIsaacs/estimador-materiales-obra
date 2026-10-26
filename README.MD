![Python Version](https://img.shields.io/badge/python-3.10-blue.svg)
![Deploy Status](https://github.com/JoseIsaacs/estimador-materiales-obra/actions/workflows/deploy.yml/badge.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Industry](https://img.shields.io/badge/sector-Construcción-orange.svg)

# 🏗️ Estimador de Materiales de Obra - StructuraPro v3.4

Sistema profesional de estimación de materiales para obras civiles basado en normativas panameñas (REP/SPIA, COPANIT) y estándares internacionales (ACI-318-25).

## 🚀 Capacidades del Proyecto

- **Cálculo de Concreto:** Volumen, cemento, arena, grava y agua (ACI 318)
- **Muros de Bloques:** Estimación de bloques, mortero y mampostería
- **Pisos y Baldosas:** Cálculo de cerámica, porcelana y acabados
- **Zapatas:** Diseño de zapatas aisladas con parrilla de refuerzo A/D
- **Vigas de Cimentación:** Cálculo de vigas de amarre sobre terreno
- **Pedestales:** Acero longitudinal, estribos y ganchos (ACI 318)
- **Columnas:** Cuadradas, rectangulares y cilíndricas con espirales
- **Vigas Sísmicas:** Pórticos especiales con confinamiento sísmico
- **Vigas de Amarre:** Soleras perimetrales (REP/SPIA)
- **Acero de Refuerzo:** Planilla consolidada con quintales
- **Escaleras:** Losa inclinada con refuerzo longitudinal y transversal

## 📜 Notas de Vigencia Normativa y Actualizaciones

StructuraPro se mantiene alineado con los estándares internacionales y locales más recientes para garantizar la precisión de sus estimaciones.

| Norma | Versión Actual | Aplicación en StructuraPro | Próxima Actualización Prevista |
| :--- | :--- | :--- | :--- |
| **ACI 318** (Concreto Estructural) | **ACI 318-25** | Cálculos de cortante, longitud de desarrollo, ganchos, confinamiento sísmico y dosificaciones base. | Ciclo regular de 3 años (próxima ~2028) |
| **REP** (Reglamento Estructural de Panamá) | **REP-2021** | Criterios sísmicos, recubrimientos mínimos y requisitos de amarre. | En desarrollo para el periodo **2027-2028** |
| **DGNTI-COPANIT** (Cemento) | **5-2019 / 90-2024** | Factores de dosificación y calidad de cemento hidráulico. | Revisiones periódicas de evaluación de conformidad |

> ⚠️ **Aviso de Actualización Automática**  
> Este repositorio cuenta con un sistema de integración continua (GitHub Actions). Cada vez que se publique una actualización normativa que impacte los cálculos (como la reciente migración a ACI 318-25), se generará una nueva versión (*Release*) en este repositorio. Se recomienda a los usuarios mantenerse suscritos a las notificaciones de *Releases* de GitHub para estar al tanto de las actualizaciones críticas de la herramienta.

*Última revisión de normas aplicadas: Octubre de 2026.*

## 🛠️ Tecnologías

* **Frontend:** HTML5, CSS3, JavaScript (Canvas + Chart.js)
* **Backend:** Python 3.10 (Flask compatible)
* **Estándares:** ACI 318-25, REP/SPIA, COPANIT 153-78
* **Librerías:** jsPDF, Chart.js, autoTable
* **Automatización:** GitHub Actions (CI/CD)

## 📋 Cómo funciona

### Versión Web
1. Clona el repositorio
2. Abre `index.html` en tu navegador
3. Selecciona el módulo (Concreto, Muros, Zapatas, etc.)
4. Ingresa las dimensiones y parámetros
5. Haz clic en **"CALCULAR"**
6. Exporta reporte en PDF

### Versión Consola
```bash
python app.py
```

Ingresa las dimensiones del muro cuando se solicite.

## 📊 Módulos Disponibles

| Módulo | Descripción | Norma |
|--------|-------------|-------|
| 🏗️ Concreto | Volumen y dosificación | ACI 318 |
| 🧱 Muros | Bloques y mortero | REP/SPIA |
| 🔷 Pisos | Baldosas y pega | COPANIT |
| ⬛ Zapatas | Parrilla de refuerzo A/D | ACI 318 |
| 🔶 V. Cimentación | Vigas de amarre | ACI 318 |
| 🔩 Pedestales | Acero y ganchos | ACI 318 |
| 🏛️ Columnas | Cuad/Rect/Cilíndrica | ACI 318 |
| 〰️ V. Sísmica | Pórtico especial | ACI 318-25 |
| 🔗 Amarre | Soleras perimetrales | REP/SPIA |
| ⚙️ Acero | Planilla consolidada | ACI 318 |
| 🪜 Escalera | Losa inclinada | ACI 318 |

## 🔧 Instalación

### Opción 1: Usar directamente (sin instalación)
```bash
# Solo necesitas un navegador moderno
# Abre: index.html en tu navegador
```

### Opción 2: Con Python (para backend)
```bash
# Clonar repositorio
git clone https://github.com/JoseIsaacs/estimador-materiales-obra.git
cd estimador-materiales-obra

# Crear entorno virtual (recomendado)
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate

# Instalar dependencias (futuro)
pip install -r requirements.txt
```

## 📚 Documentación

- [Guía de Usuario](docs/GUIA_USUARIO.md)
- [Fórmulas Técnicas](docs/FORMULAS.md)
- [Tabla de Constantes](docs/CONSTANTES.md)

## 🎯 Roadmap

- [ ] API REST con Flask
- [ ] Base de datos de proyectos
- [ ] Exportar a AutoCAD
- [ ] App móvil (React Native)
- [ ] Integración con BIM
- [ ] Multi-idioma

## 🤝 Contribuir

¿Tienes mejoras o encontraste un bug?

1. Haz fork del proyecto
2. Crea una rama (`git checkout -b feature/mejora`)
3. Commit cambios (`git commit -m 'Agrega mejora'`)
4. Push a la rama (`git push origin feature/mejora`)
5. Abre un Pull Request

Ver [CONTRIBUTING.md](CONTRIBUTING.md)

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver [LICENSE](LICENSE)

> 🔄 **Restauración completada – Junio 2026**  
> StructuraPro v3.5 ha sido completamente restaurado y estabilizado.  
> Todos los módulos de cálculo funcionan, las exportaciones PDF están corregidas,  
> la navegación es sólida y los resultados cumplen las normativas ACI 318, REP/SPIA y COPANIT.  
> Versión etiquetada como `v3.4-estable`.
## 👤 Autor

**José Isaacs**
- GitHub: [@JoseIsaacs](https://github.com/JoseIsaacs)
- 🇵🇦 Panamá

## 📞 Soporte

Para dudas o reportar problemas:
- Abre un [Issue](https://github.com/JoseIsaacs/estimador-materiales-obra/issues)
- Revisa [Preguntas Frecuentes](SUPPORT.md)

---

**StructuraPro v3.4** - Sistema profesional de estimación de materiales para obras civiles
