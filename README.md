# Estimador de Materiales de Obra 🏗️

[![CI/CD](https://github.com/JoseIsaacs/estimador-materiales-obra/actions/workflows/python-package-conda.yml/badge.svg)](https://github.com/JoseIsaacs/estimador-materiales-obra/actions)
[![Licencia MIT](https://img.shields.io/badge/Licencia-MIT-yellow.svg)](LICENSE)

Herramienta para estimar materiales de construcción basada en normativas panameñas (REP/SPIA, COPANIT) y estándares internacionales (ACI 318-19).

## Características
- Interfaz web responsiva con cálculo instantáneo.
- Versión de consola en Python para scripting.
- Soporte para diferentes tipos de bloques.
- Cálculos de concreto, cemento, arena y grava.

## Cómo usar

### Versión Web
1. Clona el repositorio.
2. Abre `index.html` en tu navegador.
3. Ingresa las dimensiones y selecciona el tipo de bloque.
4. Haz clic en **Calcular**.

### Versión Consola
```bash
python app.py