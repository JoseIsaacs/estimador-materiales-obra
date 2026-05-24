import sys
import os
import pytest
from unittest.mock import patch

# Agregamos la raíz del proyecto al path para encontrar app.py
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))
import app

def test_calcular_bloques_estandar():
    area, cantidad = app.calcular_bloques(10, 2.5, 12.5)
    assert area == 25.0
    assert cantidad == round(25 * 12.5)

def test_calcular_bloques_valores_grandes():
    area, cantidad = app.calcular_bloques(100, 3, 12.5)
    assert area == 300.0
    assert cantidad == 3750

def test_seleccion_tipo_bloque_valido():
    with patch('builtins.input', return_value='2'):
        nombre, factor = app.seleccionar_tipo_bloque()
        assert nombre == "Térmico"
        assert factor == 10

def test_constantes_definidas():
    assert len(app.BLOQUES_POR_M2) == 3
    assert app.BLOQUES_POR_M2[1][1] == 12.5