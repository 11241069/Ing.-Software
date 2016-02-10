//heat
//función para calcular el proceso de calentamiento del agua en segundos
//params: N/A (por ahora)
//return value: N/A
//observaciones:
//es probable que sea necesario separar esta función en más partes en el futuro

//variables para hacer actualizaciones relevantes
var tTrans = 0;
var tTot = 0;
var calcularId;
var tempAct = 0.0;
var tempIni = 0.0;
var tempFin = 0.0;
var volumenMax = 0;
var volumenActual = 0;
var tempEntra = 0;
var tasaEntrada = 0;
var tasaSalida = 0;

//estados posibles del calentador - ver function estado()
var calentando = false;
var enfriando = false;
var entraAgua = false;
var saleAgua = false;
//override para detener la simulación - se vuelve true cuando se alcanza la temperatura deseada
var stop = false;

var heat = function () {
                document.getElementById('btnCalcular').disabled = true;
                document.getElementById('btnReCalcular').disabled = false;
                // es más fácil recalcular estos cuando se cambian
                var volumen = document.getElementById('volumen');//volumen por calentar
                var energia = document.getElementById('energia');//energía del calentador en cuestión
                var startTemp = document.getElementById('startTemp');//temperatura actual del agua
                var endTemp = document.getElementById('endTemp').value;//temperatura final deseada
                var eficiencia = document.getElementById('eficiencia').value;//eficiencia; los calentadores no son 100% eficientes y podríamos valernos de
																			 //esta misma eficiencia para los cálculos de pérdida por la forma y material del contenedor
				
				volumenMax = document.getElementById('volumenTanque').value;//volumen máximo del tanque
				volumenActual = volumen.value;
				tasaEntrada = document.getElementById('tasaEntrada').value;//tasa de entrada de agua
				tasaSalida = document.getElementById('tasaSalida').value;//tasa de salida de agua
				tempEntra = document.getElementById('tempEntra').value;//tasa de salida de agua
				
				if (isNaN(volumen.value) || volumen.value < 0) {
                    volumen.value = 0;
                    alert('El volumen debe ser >= 0');
					
                }
                if (isNaN(energia.value) || energia.value < 0) {
                    energia.value = 0;
                    alert('Energia debe ser >= 0');
                }
                if (isNaN(eficiencia) || eficiencia.value < 0 || eficiencia.value > 100) {
                    eficiencia.value = 95;
                    alert('Porcentaje de eficienciadebe estar entre 0 y 100%');
                }
				
                var unidadesVol = document.getElementById('unidadesVol').options[document.getElementById('unidadesVol').selectedIndex].value;
                var unidadesTIni = document.getElementById('unidadesTIni').options[document.getElementById('unidadesTIni').selectedIndex].value;
                var unidadesTFin = document.getElementById('unidadesTFin').options[document.getElementById('unidadesTFin').selectedIndex].value;
                
                if (unidadesTIni == 'F' && startTemp.value < 32) {
                    startTemp.value = 32;
                    alert('Temperatura inicial debe estar sobre congelamiento');
                }
                if (unidadesTIni == 'F' && startTemp.value > 212) {
                    startTemp.value = 212;
                    alert('Temperatura inicial debe estar bajo evaporización');
                }
                if (unidadesTIni == 'C' && startTemp.value > 100) {
                    startTemp.value = 100;
                    alert('Temperatura inicial debe estar bajo evaporización');
                }
                if (unidadesTFin == 'F' && endTemp.value < 32) {
                    endTemp.value = 32;
                    alert('Temperatura inicial debe estar sobre congelamiento');
                }
                if (unidadesTFin == 'F' && endTemp.value > 212) {
                    endTemp.value = 212;
                    alert('Temperatura inicial debe estar bajo evaporización');
                }
                if (unidadesTFin == 'C' && endTemp.value > 100) {
                    endTemp.value = 100;
                    alert('Temperatura inicial debe estar bajo evaporización');
                }

                var volumenGal = (unidadesVol == 'litros') ? volumen.value * 0.264 : volumen.value;
                var enerWatts = energia.value;
                var startTempInF = (unidadesTIni == 'C') ? startTemp.value * 1.8 + 32 : startTemp.value;
                var endTempInF = (unidadesTFin == 'C') ? endTemp * 1.8 + 32 : endTemp;
                
				estado(-666);
                if (startTempInF < endTempInF) {                    
					estado(1);
                }else{//hay que modificar esto después, el calentador también pude enfriar según especificaciones del ing.
					//startTemp.value = 40;
                    //endTemp.value = 100;
                    estado(2);
                    //alert('Temperatura inicial no puede ser mayor que Temperatura final');					
				}
                
                var tiempo = document.getElementById('tiempo');
                // forumla basada en galones/watts/Farenheit
                tiempo.value = tTot = Math.abs(Math.round(100 * ((volumenGal*8.33*453.59237)*(((5/9)*(endTempInF-32))-((5/9)*(startTempInF-32)))/(enerWatts*0.238845896628*eficiencia))));
				tempAct = tempIni = startTemp.value;
				tempFin = endTemp;
				calcularId = setInterval(calculate, 1000);
				
				
}

function calculate(){		
	updateTiempo();
	updateTemperatura();
	updateEstado();
	
}

function detener(){
	clearInterval(calcularId);
	tTrans = 0;
	tempAct = 0;
	document.getElementById('temperaturaActual').innerHTML = tempAct;
	document.getElementById('tiempoTranscurrido').innerHTML = tTrans;
	document.getElementById('estado').innerHTML = "";
	document.getElementById('btnCalcular').disabled = false;
	document.getElementById('btnReCalcular').disabled = true;
}
function guardar() {

}
function recalcular(){
    clearInterval(calcularId);
    document.getElementById('startTemp').value = tempAct;
    heat();
}

function updateTiempo(){
	if(tTrans <= tTot-1){
			tTrans++;
	}
	document.getElementById('tiempoTranscurrido').innerHTML = tTrans;
		
}

function updateTemperatura(){
	if(calentando){
		if(tempAct<=tempFin){
			var temp = Math.abs(tempFin-tempIni)*1.0/(tTot);
			(tempAct) = (tempAct*1 + temp);
		}else{
			estado(666);
			estado(-1);
		}
	}else if (enfriando){
		if(tempAct>=tempFin){
			//var temp = Math.abs(tempFin-tempIni)*1.0/(tTot);
			//(tempAct) = (tempAct*1 - temp);
			estado(3);
			if (volumenActual <= volumenMax - tasaEntrada) {
			    
			    (tempAct) -= ((volumenActual * 0.264 * tempAct * 1.8 + 32) + (volumenActual * 0.264 + tasaEntrada * tempEntra * 1.8 + 32)) / (volumenActual * 0.264 + (volumenActual * 0.264 + tasaEntrada));
				(volumenActual) = (volumenActual * 1 + tasaEntrada * 1);
                
			}else{
				estado(4);
				(volumenActual) = (volumenActual*1 - tasaSalida*1);
			}
			
		}else{
			estado(1);
			estado(-2);
			estado(-3);
			estado(-4);
		}
	}
	document.getElementById('temperaturaActual').innerHTML = (tempAct).toFixed(4);
}

function estado(state){//también conocido como peaceful mongoose, o el megavisor :)
	switch(state) {
    case (1):
        calentando = true;
        break;
    case (2):
        enfriando = true;
        break;
	case (3):
        entraAgua = true;
        break;
	case (4):
        saleAgua = true;
        break;
	case (666):
	    stop = true;
	    break;
	case (-1):
        calentando = false;
        break;
    case (-2):
        enfriando = false;
        break;
	case (-3):
        entraAgua = false;
        break;
	case (-4):
        saleAgua = false;
        break;
	case (-666):
		stop = false;
    default:
		break;
	}	
}

function updateEstado(){
	if(stop)
		clearInterval(calcularId);
	
	var myEstado = "";
	if(calentando)
		myEstado += "El calentador está calentando. ";
	if(enfriando)
		myEstado += "El calentador está enfriando. ";
	if(entraAgua)
		myEstado += "El calentador está dejando entrar agua. ";
	if(saleAgua)
		myEstado += "El calentador está dejando salir agua. ";
	
	document.getElementById('estado').innerHTML = myEstado;
	document.getElementById('volumenActual').innerHTML = volumenActual;
	
}