# OW Lima — PWA para Nadadores de Aguas Abiertas

## ¿Qué muestra?

Para cada una de las 5 playas (La Herradura, Pescadores, Agua Dulce, Yuyos, Sombrillas):

### Datos en tiempo real (Open-Meteo Marine API — gratuita, sin API key)
- 🌊 **Oleaje**: altura, período, dirección, descripción textual
- 〰️ **Swell**: altura, período, dirección, ola de viento
- 💨 **Viento**: velocidad, dirección, rosa de los vientos animada
- 🌡️ **Temperatura del agua** (SST) y del aire
- ☀️ **Índice UV** con barra visual y recomendación
- 📊 **Pronóstico 12 horas** con semáforo de condiciones
- 🏊 **Score de nadador** (0-100) calculado automáticamente
- 🏷️ **Etiquetas de riesgo** (Oleaje OK / Viento alto / UV extremo, etc.)
- 🤿 **Recomendaciones personalizadas** (traje neopreno, período, etc.)

### Datos sanitarios (DIGESA)
- Estado actual: Saludable / No Saludable / Sin datos
- Enlace a veranosaludable.minsa.gob.pe para verificación

## Cómo desplegar

### Opción 1 — GitHub Pages (recomendado, gratis)
```bash
git init
git add .
git commit -m "OW Lima PWA"
git remote add origin https://github.com/TU_USUARIO/ow-lima.git
git push -u origin main
# Activar GitHub Pages en Settings > Pages > main / root
```

### Opción 2 — Netlify (drag & drop)
1. Ve a https://netlify.com
2. Arrastra la carpeta completa al dashboard
3. ¡Listo! Obtienes HTTPS automático (requerido para PWA)

### Opción 3 — Vercel
```bash
npx vercel --prod
```

## Instalar como app (PWA)
1. Abrir la URL en Chrome/Safari mobile
2. Chrome: menú → "Añadir a pantalla de inicio"
3. Safari: compartir → "Añadir a pantalla de inicio"

## Algoritmo del Score de Nadador
| Factor | Penalización |
|--------|-------------|
| Oleaje > 2.5m | -50 pts |
| Oleaje 1.8–2.5m | -30 pts |
| Oleaje 1.2–1.8m | -15 pts |
| Período < 6s (olas irregulares) | -20 pts |
| Período 6–8s | -10 pts |
| Viento > 30 km/h | -25 pts |
| Viento 20–30 km/h | -15 pts |
| UV > 11 | -10 pts |

**Score ≥ 75** = Apto 🟢 | **50–74** = Precaución 🟡 | **< 50** = No recomendado 🔴

## APIs utilizadas
- **Open-Meteo Marine**: https://marine-api.open-meteo.com (gratuita, sin key)
- **Open-Meteo Weather**: https://api.open-meteo.com (gratuita, sin key)
- **DIGESA Verano Saludable**: datos cargados manualmente (no tiene API pública)

## Coordenadas de las playas
| Playa | Latitud | Longitud |
|-------|---------|----------|
| La Herradura | -12.1547 | -77.0435 |
| Pescadores | -12.1670 | -77.0196 |
| Agua Dulce | -12.1611 | -77.0234 |
| Yuyos | -12.1582 | -77.0210 |
| Sombrillas | -12.1573 | -77.0201 |
