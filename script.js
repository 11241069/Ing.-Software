//heat
//función para calcular el proceso de calentamiento del agua en segundos
//params: N/A (por ahora)
//return value: N/A
//observaciones:
//es probable que sea necesario separar esta función en más partes en el futuro

var heat = function () {
                // es más fácil recalcular estos cuando se cambian
                var volumen = document.getElementById('volumen');//volumen por calentar
                var energia = document.getElementById('energia');//energía del calentador en cuestión
                var startTemp = document.getElementById('startTemp');//temperatura actual del agua
                var endTemp = document.getElementById('endTemp').value;//temperatura final deseada
                var eficiencia = document.getElementById('eficiencia').value;//eficiencia; los calentadores no son 100% eficientes y podríamos valernos de
																			 //esta misma eficiencia para los cálculos de pérdida por la forma y material del contenedor
																			 
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
                
                if (startTempInF > endTempInF) {//hay que modificar esto después, el calentador también pude enfriar según especificaciones del ing.
                    startTemp.value = 40;
                    endTemp.value = 100;
                    alert('Temperatura inicial no puede ser mayor que Temperatura final');
                }
                
                var tiempo = document.getElementById('tiempo');
                // forumla basada en galones/watts/Farenheit
                tiempo.value = Math.round(100 * ((volumenGal*8.33*453.59237)*(((5/9)*(endTempInF-32))-((5/9)*(startTempInF-32)))/(enerWatts*0.238845896628*eficiencia)));
				
}
