# Coin-Buster 

Aplicación web derivada de "Pulso Abierto" para Teclab, como Actividad Práctica Integradora 4. Desarrollada con React y TypeScript para consultar en tiempo real las cotizaciones en dólares (USD) de Bitcoin, Ethereum y Solana mediante la API pública de CoinGecko. Permite filtrar resultados, navegar hacia vistas de detalle y gestionar una lista de criptomonedas favoritas persistente en el navegador.

## Tecnologías principales

* **React 18** y **TypeScript**
* **Vite** (entorno de desarrollo y empaquetado productivo)
* **Zustand** (gestión de estado global y persistencia selectiva en `localStorage`)
* **React Router DOM** (enrutamiento SPA con rutas dinámicas)
* **Zod** (validación de formularios controlados)
* **Vitest** y **React Testing Library** (pruebas automatizadas orientadas al comportamiento)

## Instalación y ejecución

1. **Instalar dependencias:**
   ```bash
   npm install

## Aplicación publicada
URL en Vercel: https://coin-buster.vercel.app

## Verificación Final

**Pruebas ejecutadas**
npm test (4/4 pruebas aprobadas en cryptoService.test.ts y App.test.tsx).

**Build generado correctamente**
npm run build ejecutado sin errores de compilación ni de tipos.

**Preview comprobado**
Verificado mediante npm run preview (consulta a API, navegación, validación de formulario y persistencia de favoritos tras recarga).

**Despliegue realizado**
Publicado en Vercel y validado en navegación directa y recarga sobre rutas dinámicas (/criptomonedas/bitcoin).

**Fecha de verificación** 
20/11/2026