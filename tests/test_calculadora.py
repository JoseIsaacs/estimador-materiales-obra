"""
Pruebas unitarias para app.py
"""
import sys
import os
# Agrega el directorio raíz al path para poder importar app.py
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pytest
from unittest.mock import patch
from app import calcular_bloques, seleccionar_tipo_bloque, BLOQUES_POR_M2

# ... (el resto del código sigue igual)


def test_calcular_bloques_estandar():
    area, cantidad = calcular_bloques(10, 2.5, 12.5)
    assert area == 25.0
    assert cantidad == round(25 * 12.5)  # 312.5 -> 312

def test_calcular_bloques_valores_grandes():
    area, cantidad = calcular_bloques(100, 3, 12.5)
    assert area == 300.0
    assert cantidad == 3750

def test_seleccion_tipo_bloque_valido():
    with patch('builtins.input', return_value='2'):
        nombre, factor = seleccionar_tipo_bloque()
        assert nombre == "Térmico"
        assert factor == 10

def test_constantes_definidas():
    assert len(BLOQUES_POR_M2) == 3
    assert BLOQUES_POR_M2[1][1] == 12.5