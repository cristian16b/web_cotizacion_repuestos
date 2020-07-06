export const API_BASE_URL = 'http://localhost/web_cotizacion_repuestos/public';
//export const API_BASE_URL = 'http://www.eisenparts.com';
export const API_LOGIN = API_BASE_URL + '/api/login_check';
export const API_LOGIN_SOCIAL = API_BASE_URL + '/api/login_social';
export const API_REGISTER = API_BASE_URL + '/api/register';
// las siguientes son apis que necesitan token
export const API_REPUESTOS_FILTER = API_BASE_URL + '/api/v1/repuesto/getByName';
export const API_AUTO_MARCA_FILTER = API_BASE_URL + '/api/v1/marca/auto/getByName';
export const API_AUTO_MODELO_FILTER = API_BASE_URL + '/api/v1/modelo/auto/getByName';
export const API_GUARDAR_SOLICITUD_REPUESTO = API_BASE_URL + '/api/v1/solicitud/repuesto/nueva';
export const API_MIS_SOLICITUDES = API_BASE_URL + '/api/v1/solicitudes/repuesto/listar';
// las siguientes son apis publiucas
export const API_OBTENER_FOTO_REPUESTO = API_BASE_URL + '/recurso/get/foto';
export const API_PROVINCIA = API_BASE_URL + '/provincia/getByName';
export const API_LOCALIDAD = API_BASE_URL + '/localidad/getByName';
// lo siguiente son las key del captcha de verificacion de persona
export const API_CAPTCHA_PUBLIC = '6Ld2A_0UAAAAADDGvROkBFyPOPDkZWqoLLkbaWym';
export const API_CAPTCHA_PRIVATE = '6Ld2A_0UAAAAALQJE4OHpHCktkGQRsIwbuzZKDZ4';
export const API_FACEBOOK = '245924643289636';