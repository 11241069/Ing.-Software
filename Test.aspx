<%--Directiva--%>
<%@ Page Language="C#" %>
<%--Codigo en linea--%>
  
<script runat="server">
protected void Page_Load(object sender, EventArgs e)
{
    //this.btnAceptar.Attributes.Add("OnClick", "javascript:return heat();");
}
</script>
 
<%--HTML para dibujar los controles en pantalla--%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Simulador de Calentador de Agua</title>
    <%--Codigo JavaScript--%>
    <script language="javascript" type="text/javascript" src="script.js"></script>
    <link rel="stylesheet" type="text/css" href="StyleSheet.css"/>
</head>
<body>
    <div class="header">
        <h1>Calentador de Agua</h1>
    </div>
    <div class="container">
        <form>
            <table border="0">
				
				<tr>
                    <td class="name">Volumen del tanque:</td>
                    <td>
                        <input type="text" size="6" value="20" id="volumenTanque" />
                        <select id="unidadesVolTanque">
                            <option selected="selected" value="litros">litros</option>
                            <option value="galones">galones</option>
                        </select>
                    </td>
                </tr>				
				
                <tr>
                    <td class="name">Volumen de agua:</td>
                    <td>
                        <input type="text" size="6" value="20" id="volumen" />
                        <select id="unidadesVol">
                            <option selected="selected" value="litros">litros</option>
                            <option value="galones">galones</option>
                        </select>
                    </td>
                </tr>
					
				<tr>
                    <td class="name">Temperatura agua entra:</td>
                    <td>
                        <input type="text" size="6" value="15" id="tempEntra" />
                        <select  id="unidadesTEntra">
                            <option selected="selected" value="C">&deg;C</option>
                            <option value="F">&deg;F</option>
                        </select>
                    </td>
                </tr>
					
				<tr>
                    <td class="name">Tasa de entrada de agua:</td>
                    <td>
                        <input type="text" size="6" value="20" id="tasaEntrada" />
                        <select id="unidadesTasaEntrada">
                            <option selected="selected" value="litros">lit/s</option>
                            <option value="galones">gal/s</option>
                        </select>
                    </td>
                </tr>				
				
                <tr>
                    <td class="name">Tasa de salida de agua:</td>
                    <td>
                        <input type="text" size="6" value="20" id="tasaSalida" />
                        <select id="unidadesTasaSalida">
                            <option selected="selected" value="litros">lit/s</option>
                            <option value="galones">gal/s</option>
                        </select>
                    </td>
                </tr>
					
					
                <tr>
                    <td class="name">Energia:</td>
                    <td>
                        <input type="text" size="6" value="3000" id="energia" />
                        watts
                    </td>
                </tr>
                <tr>
                    <td class="name">Temperatura incial:</td>
                    <td>
                        <input type="text" size="6" value="15" id="startTemp" />
                        <select  id="unidadesTIni">
                            <option selected="selected" value="C">&deg;C</option>
                            <option value="F">&deg;F</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td class="name">Temperatura final:</td>
                    <td>
                        <input type="text" size="6" value="80" id="endTemp" />
                        <select id="unidadesTFin">
                            <option selected="selected" value="C">&deg;C</option>
                            <option value="F">&deg;F</option>
                        </select>
                        (El agua ebulle en 100&deg;C/212&deg;F)
                    </td>
                </tr>
                <tr>
                    <td class="name">Eficiencia:</td>
                    <td>
                        <input type="text" size="6" value="95" id="eficiencia" />%
                    </td>
                </tr>
                <tr>
                    <td class="name">Tiempo:</td>
                    <td>
                        <input type="text" size="6" readonly="readonly" id="tiempo" />
                        segundos
                    </td>
                </tr>
            </table>
            <div class="input-container">
                <input type = "button" id="btnCalcular" value="Calcular" onclick="heat();" />
			    <input type = "button" id="btnDetener" value="Detener" onclick="detener();" />
                <input type = "button" id="btnReCalcular" value="ReCalcular" onclick="recalcular();" disabled/>
                <input type = "button" id="btnGuardar" value="Guardar" onclick="guardar();" />
            </div>			
            <table>
				<tr>
					<td class="name">Tiempo transcurrido:</td>
					<td>
					<div id = "tiempoTranscurrido"></div>
					</td>
				</tr>
						
				<tr>
					<td class="name">Temperatura actual:</td>
					<td>
					<div id="temperaturaActual"></div>&deg;C
					</td>
				</tr>
					
				<tr>
					<td class="name">Volumen actual de agua:</td>
					<td>
					<div id="volumenActual"></div>L
					</td>
				</tr>
					
				<tr>
					<td class="name">Estado del calentador:</td>
					<td>
					<div id="estado"></div>
					</td>
				</tr>
			</table>
        </form>
    </div>
</body>
</html>