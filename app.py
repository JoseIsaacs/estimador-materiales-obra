"""
Calculadora de materiales de construcción - Versión Consola
Autor: JoseIsaacs
Normas: ACI 318-19, REP/SPIA, COPANIT
"""

import sys

# Constantes ajustables según tipo de bloque
BLOQUES_POR_M2 = {
    1: ("Estándar", 12.5),
    2: ("Térmico", 10),
    3: ("Estructural", 11.5)
}

def obtener_datos_usuario():
    """Solicita y valida las dimensiones del área a construir."""
    while True:
        try:
            largo = float(input("Ingrese el largo del área (metros): "))
            alto = float(input("Ingrese el alto de la pared (metros): "))
            if largo <= 0 or alto <= 0:
                print("Error: Los valores deben ser mayores a cero.\n")
                continue
            return largo, alto
        except ValueError:
            print("Error: Debe ingresar valores numéricos.\n")

def seleccionar_tipo_bloque():
    """Muestra un menú para elegir el tipo de bloque."""
    print("\nTipos de bloque disponibles:")
    for clave, (nombre, _) in BLOQUES_POR_M2.items():
        print(f"  {clave}. {nombre}")
    while True:
        try:
            opcion = int(input("Seleccione el tipo de bloque (1-3): "))
            if opcion in BLOQUES_POR_M2:
                return BLOQUES_POR_M2[opcion]
            else:
                print("Opción no válida. Intente de nuevo.")
        except ValueError:
            print("Debe ingresar un número.")

def calcular_bloques(largo, alto, factor):
    """Calcula la cantidad de bloques necesarios para un área rectangular."""
    area = largo * alto
    cantidad_bloques = round(area * factor)
    return area, cantidad_bloques

def mostrar_resultados(area, cantidad_bloques, tipo_nombre):
    """Imprime los resultados formateados."""
    print("\n" + "="*40)
    print(f"  Área total: {area:.2f} m²")
    print(f"  Tipo de bloque: {tipo_nombre}")
    print(f"  Bloques necesarios: {cantidad_bloques} unidades")
    print("="*40)
    print("Cálculo basado en normas ACI 318-19, REP/SPIA, COPANIT.\n")

def main():
    """Función principal del script."""
    print("CALCULADORA DE MATERIALES DE CONSTRUCCIÓN")
    print("-" * 40)
    
    largo, alto = obtener_datos_usuario()
    tipo_nombre, factor = seleccionar_tipo_bloque()
    area, cantidad_bloques = calcular_bloques(largo, alto, factor)
    mostrar_resultados(area, cantidad_bloques, tipo_nombre)

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\nPrograma finalizado por el usuario.")
        sys.exit(0)