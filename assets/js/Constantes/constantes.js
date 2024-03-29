export const API_BASE_URL = 'http://localhost/web_cotizacion_repuestos/public';
// export const API_BASE_URL = 'https://www.eisenparts.com';
export const API_LOGIN = API_BASE_URL + '/api/login_check';
export const API_LOGIN_SOCIAL = API_BASE_URL + '/api/login_social';
export const API_REGISTER = API_BASE_URL + '/api/register';
// las siguientes son apis que necesitan token
export const API_REPUESTOS_FILTER = API_BASE_URL + '/api/v1/repuesto/getByName';
export const API_AUTO_MARCA_FILTER = API_BASE_URL + '/api/v1/marca/auto/getByName';
export const API_AUTO_MODELO_FILTER = API_BASE_URL + '/api/v1/modelo/auto/getByName';
export const API_GUARDAR_SOLICITUD_REPUESTO = API_BASE_URL + '/api/v1/solicitud/repuesto/nueva';
export const API_MIS_SOLICITUDES = API_BASE_URL + '/api/v1/solicitudes/repuesto/listar';
export const API_BUSCAR_MIS_SOLICITUDES = API_BASE_URL + '/api/v1/solicitudes/repuesto/buscar';//(se debera eliminar)
export const API_BUSCAR_COTIZACIONES_RECIBIDAS = API_BASE_URL + '/api/v1/listar/cotizaciones';
export const API_MI_PERFIL = API_BASE_URL + '/api/v1/perfil/getPerfil'; 
export const API_ULTIMAS_SOLICITUDES = API_BASE_URL + '/api/v1/solicitudes/ultimas/listar';
export const API_BUSCAR_SOLICITUDES = API_BASE_URL + '/api/v1/solicitudes/buscar';
export const API_ENVIAR_COTIZACION = API_BASE_URL + '/api/v1/cotizaciones/enviar';
export const API_CANCELAR_SOLICITUD = API_BASE_URL + '/api/v1/solicitud/repuesto/cancelar/';
export const API_LISTAR_MIS_COTIZACIONES = API_BASE_URL + '/api/v1/listar/cotizaciones/';
export const API_LISTAR_MIS_COMPRAS = API_BASE_URL + '/api/v1/listar/compras/';
export const API_LISTAR_MIS_VENTAS = API_BASE_URL + '/api/v1/listar/ventas/';
export const API_MERCADO_PAGO_MOSTRAR_BOTON_PAGO = API_BASE_URL + '/api/v1/mercadoPago/pagar';
// las siguientes son apis publicas
export const API_OBTENER_FOTO_COTIZACION = API_BASE_URL + '/recurso/get/foto/cotizacion'
export const API_OBTENER_FOTO_REPUESTO = API_BASE_URL + '/recurso/get/foto';
export const API_PROVINCIA = API_BASE_URL + '/provincia/getByName';
export const API_LOCALIDAD = API_BASE_URL + '/localidad/getByName';
export const API_OBTENER_CONSTANCIA = API_BASE_URL + '/recurso/get/archivo/';
export const API_CAMBIAR_CONTRASENIA = API_BASE_URL +  '/cambiarContrasenia';
export const API_CONTACTO = API_BASE_URL +  '/contacto/enviar';
// lo siguiente son las key del captcha de verificacion de persona
export const API_CAPTCHA_PUBLIC = '6Ld2A_0UAAAAADDGvROkBFyPOPDkZWqoLLkbaWym';
export const API_CAPTCHA_PRIVATE = '6Ld2A_0UAAAAALQJE4OHpHCktkGQRsIwbuzZKDZ4';
// lo siguiente son las keys de los login social
export const API_FACEBOOK = '245924643289636';
export const API_GMAIL_KEY = '775255573684-f20unn7pj53doijh2cofbj3g44c68up3.apps.googleusercontent.com';
export const API_GMAIL_PRIVATE = 'SSNU0kKOvu3fLpnnaVbrfzYp';
// roles de usuario
export const ROL_COMERCIANTE = "ROLE_COMERCIANTE";
export const ROL_USER = "ROLE_USER";