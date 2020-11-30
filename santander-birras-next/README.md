Meetups - Ejercicio de entrevista hecho especialmente para Santander Tecnología
===============================================================================

Para este primer MVP se decidió usar Next ya que podemos usar React, tener unas apis integradas en el proyecto y poder desplegar ambas cosas de manera rápida y a un bajo costo utilizando Vercel (pasar a inglés).

Estas son algunas tecnologías usadas en el proyecto:
- Next: Framework general del proyecto, front y back serverless
- React: Es la base de Next, los componentes están escritos en React
- Node: Las funciones del back serverless están escritas en Node
- SCSS: Estilos de los componentes con variables para favorecer la reutilización
- CSS Modules: Para tener clases de CSS scoped al componente o la página que estamos trabajando
- TypeScript: Como lenguaje fuertemente para capturar errores antes de la ejecución
- AWS DynamoDB: Como persistencia de datos
- Axios: Para enviar solicitudes server side 
- Fetch: Para enviar solicitudes client side (utilizamos uno diferente en el cliente para mantener el bundle liviano)
- Joi: Para validar datos server side
- uuid: Para generar identificadores únicos para las meetups.
- Auth0: Para autenticación segura. Por cuestión de tiempo los tokens no se están validando pero podrian validarse en el futuro


Patrones aplicados
 - Cache: Se utiliza AWS DynamoDb como caché de las llamadas a OpenWeatherMap para no hacer llamadas 
 innecesarias y no alcanzar el límite de llamadas demasiado rápido.
 - Retry: Las llamadas a los servicios de OpenWeatherMap se reintentan 3 veces antes de fallar
 - Serverless: El backend no requiere de un cluster de kubernetes o de OKD, ya que son funciones simples de facil despliegue.

No se utilizó ninguna librería de componentes o framework de CSS con el objeto de mantener la aplicación liviana (lo que hace que sea más facil escalarla) 
y también para mantener un design system con una identidad propia. La aplicación es completamente responsive.

No es PWA, dado que no es un proyecto tan grande no considero sea necesario involucrarse con Service Workers. 
Next utiliza una tecnología de "static site prerendering" lo que significa que el html de los componentes es pregenerado en tiempo de compilación. 
Esto hace que el arranque de la aplicación sea muy rápida y en comparación con un Server Site Rendering, el TTFB es mucho menor lo cual es positivo para la 
performance ya que afecta a uno de los Web Vitals.

Las claves y secretos para acceder a los distintos servicios son seteados por variables de entorno. En el desarrollo 
local se utiliza la implementación de Next de dotenv.

Los tests unitarios son importantes pero por una cuestión de tiempo no están. En el caso del ecosistema de React una combinación de Jest y Enzyme suele ser una
de las opciones más populare.

Las imagenes tienen licencia legal de Envato Elements y los íconos.