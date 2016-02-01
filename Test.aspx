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
    <title>Mi primera aplicacion - Maestros del Web</title>
    <%--Codigo JavaScript--%>
    <script language="javascript" type="text/javascript" src="script.js"></script>
</head>
<body>
        <div>
            <form>
                <table border="0">
                    <tr>
                        <td class="name">Volumen:</td>
                        <td>
                            <input onChange="heat()" type="text" size="6" value="20" id="volumen" />
                            <select onChange="heat()" id="unidadesVol">
                                <option selected="selected" value="litros">litros</option>
                                <option value="galones">galones</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="name">Energia:</td>
                        <td>
                            <input onChange="heat()" type="text" size="6" value="3000" id="energia" />
                            watts
                        </td>
                    </tr>
                    <tr>
                        <td class="name">Temperatura incial:</td>
                        <td>
                            <input onChange="heat()" type="text" size="6" value="15" id="startTemp" />
                            <select onChange="heat()" id="unidadesTIni">
                                <option selected="selected" value="C">&deg;C</option>
                                <option value="F">&deg;F</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="name">Temperatura final:</td>
                        <td>
                            <input onChange="heat()" type="text" size="6" value="80" id="endTemp" />
                            <select onChange="heat()" id="unidadesTFin">
                                <option selected="selected" value="C">&deg;C</option>
                                <option value="F">&deg;F</option>
                            </select>
                            (El agua ebulle en 100&deg;C/212&deg;F)
                        </td>
                    </tr>
                    <tr>
                        <td class="name">Eficiencia:</td>
                        <td>
                            <input onChange="heat()" type="text" size="6" value="95" id="eficiencia" />%
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
				
				<input type = "button" id="btnAceptar" value="Calcular" onclick="heat();" />
            </form>
        </div>
		
    </body>
</html>