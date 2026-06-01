# Configuración del Formulario de Contacto

## 📧 Funcionalidades

El formulario de contacto incluye:
- ✅ Envío de emails automático vía SMTP
- ✅ Envío de datos a WhatsApp con formato estructurado
- ✅ Validación de campos
- ✅ Manejo de errores robusto

## 🚀 Configuración

### 1. Instalar dependencias

```bash
pnpm install
```

### 2. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto con el siguiente contenido:

```env
# Configuración SMTP para envío de emails
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-contraseña-de-aplicacion

# Email destino donde recibirás los mensajes
EMAIL_TO=lesleygarciabeauty@ejemplo.com

# Número de WhatsApp para recibir mensajes (sin espacios ni guiones)
NEXT_PUBLIC_WHATSAPP_NUMBER=593983366831
```

### 3. Configuración de Gmail (Recomendado)

Si usas Gmail, sigue estos pasos:

1. Ve a tu cuenta de Google: https://myaccount.google.com/
2. En "Seguridad", busca "Verificación en dos pasos" y actívala
3. Una vez activada, busca "Contraseñas de aplicaciones"
4. Genera una nueva contraseña de aplicación para "Correo"
5. Copia la contraseña generada (16 caracteres) y úsala en `SMTP_PASS`

### 4. Otras opciones SMTP

También puedes usar otros servicios:

#### Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=tu-email@outlook.com
SMTP_PASS=tu-contraseña
```

#### SendGrid
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=tu-api-key-de-sendgrid
```

## 📱 Funcionamiento del Formulario

### Flujo de envío:

1. **Usuario completa el formulario** con:
   - Nombre completo
   - Email
   - Teléfono (opcional)
   - Servicio de interés
   - Mensaje

2. **Al enviar**:
   - Se envía un email automático a `EMAIL_TO` con todos los detalles
   - Se abre WhatsApp Web/App con un mensaje pre-formateado

3. **Formato del mensaje de WhatsApp**:
```
🌟 NUEVA CONSULTA DE CLIENTE 🌟

📋 NOMBRE CLIENTE: Sara Valencia
📧 EMAIL: sara@ejemplo.com
📱 TELÉFONO: 0993018610
💄 SERVICIO INTERÉS: Maquillaje Profesional

💬 MENSAJE:
[Mensaje del cliente aquí]

---
Enviado desde el formulario web
```

## 🧪 Pruebas

Para probar el formulario:

1. Inicia el servidor de desarrollo:
```bash
pnpm dev
```

2. Navega al formulario de contacto
3. Completa todos los campos
4. Haz clic en "Enviar Mensaje"
5. Verifica:
   - ✅ Email recibido en `EMAIL_TO`
   - ✅ WhatsApp se abre con el mensaje formateado

## 🔧 Solución de Problemas

### Error al enviar email

- **Verifica las credenciales SMTP** en `.env.local`
- **Gmail**: Asegúrate de usar una contraseña de aplicación, no tu contraseña normal
- **Firewall**: Verifica que el puerto 587 no esté bloqueado

### WhatsApp no se abre

- **Verifica el número** en `NEXT_PUBLIC_WHATSAPP_NUMBER` (sin espacios, sin guiones, con código de país)
- **Formato correcto**: `593983366831` (código país + número)

### Variables de entorno no se cargan

- Reinicia el servidor de desarrollo después de crear/modificar `.env.local`
- Las variables con `NEXT_PUBLIC_` son accesibles en el cliente
- Las variables sin este prefijo solo están disponibles en el servidor

## 📝 Personalización

### Cambiar el formato del email

Edita [app/api/send-email/route.ts](app/api/send-email/route.ts), específicamente la sección `html` en `mailOptions`.

### Cambiar el formato de WhatsApp

Edita [components/contact-form.tsx](components/contact-form.tsx), en la función `handleSubmit`, modifica la variable `whatsappMessage`.

## 🔒 Seguridad

- ✅ Las credenciales SMTP están en `.env.local` (no se suben a git)
- ✅ Validación de campos en el servidor
- ✅ Manejo seguro de errores sin exponer información sensible
- ⚠️ **IMPORTANTE**: Nunca subas `.env.local` a tu repositorio

## 📦 Dependencias Agregadas

- `nodemailer`: ^6.9.15 - Para envío de emails
- `@types/nodemailer`: ^6.4.16 - TypeScript types

## 🎨 Servicios Disponibles

Los servicios que aparecen en el selector son:
- Maquillaje de Novia
- Eventos Especiales
- Editorial y Moda
- Clases de Maquillaje
- Otro servicio

Puedes modificarlos en [components/contact-form.tsx](components/contact-form.tsx) en la sección del `Select`.
