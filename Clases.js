class Persona {
    id;
    nombre;
    apellido;
    edad;
  
    constructor(id, nombre, apellido, edad) {
      this.id = id || 0;
      this.nombre = nombre || "";
      this.apellido = apellido || "";
      this.edad = edad || 0;
    }
  
    toString() {
      return ("ID: " + this.id + " - Nombre: " + this.nombre + " - Apellido: " + this.apellido + " - Edad: " + this.edad);
    }
  }
  
  class Heroe extends Persona {
    alterego;
    ciudad;
    publicado;
  
    constructor(id, nombre, apellido, edad, alterego, ciudad, publicado) {
      super(id, nombre, apellido, edad);
      this.alterego = alterego || "";
      this.ciudad = ciudad || "";
      publicado > 1940 ? (this.publicado = publicado) : (this.publicado = 0);     
    }
  
    toString() {
      return ("Alter Ego: " + this.alterego + " - Ciudad: " + this.ciudad + " - Publicado: " + this.publicado);
    }
  }
  
  class Villano extends Persona {
    enemigo;
    robos;
    asesinatos;
  
    constructor(id, nombre, apellido, edad, enemigo, robos, asesinatos) {
      super(id, nombre, apellido, edad);
      this.enemigo = enemigo || "";
      robos > 0 ? (this.robos = robos) : (this.robos = 0);
      asesinatos > 0 ? (this.asesinatos = asesinatos) : (this.asesinatos = 0);
    }
  
    toString() {
      return ("Enemigo: " + this.enemigo + " - Robos: " + this.robos + " - Asesinatos: " + this.asesinatos);
    }
  }
  
  //Cargo las personas
  let datos = JSON.parse(
    '[{"id":1, "nombre":"Clark", "apellido":"Kent", "edad":45, "alterego":"Superman", "ciudad":"Metropolis","publicado":2002},{"id":2, "nombre":"Bruce", "apellido":"Wayne", "edad":35, "alterego":"Batman", "ciudad":"Gotica","publicado":20012},{"id":3, "nombre":"Bart", "apellido":"Alen", "edad":30, "alterego":"Flash", "ciudad":"Central","publicado":2017},{"id":4, "nombre":"Lex", "apellido":"Luthor", "edad":18, "enemigo":"Superman", "robos":500,"asesinatos":7},{"id":5, "nombre":"Harvey", "apellido":"Dent", "edad":20, "enemigo":"Batman", "robos":750,"asesinatos":2},{"id":666, "nombre":"Celina", "apellido":"kyle", "edad":23, "enemigo":"Batman", "robos":25,"asesinatos":1}]'
    );
  
  //cargo un array de personas con heroes y villanos
  let personas = CargaInicial(datos);
  
  function CargaInicial(datos) {
    let arrayPersonas = [];
    datos.forEach((p) => {
      if (p.hasOwnProperty("alterego")) {
        arrayPersonas.push(new Heroe(p.id, p.nombre, p.apellido, p.edad, p.alterego, p.ciudad, p.publicado));
      } else {
        arrayPersonas.push(new Villano(p.id, p.nombre, p.apellido, p.edad, p.enemigo, p.robos, p.asesinatos));
      }
    });
    return arrayPersonas;
  }
  //console.log(personas);

  //Al iniciar cargo la tabla con las personas
  document.getElementById("cuerpo").addEventListener("load", CargarTabla(personas));
  
  //carga la tabla con las personas que recibe
  function CargarTabla(personas) {
    personas.forEach((p) => {
      CargarData(p);
    });
  }
  
  function CargarData(p) {
    let tbody = document.getElementById("tbody");
    let tr = document.createElement("tr");
    let datos = [];
    datos.push(p.id, p.nombre, p.apellido, p.edad, p.alterego, p.ciudad, p.publicado, p.enemigo, p.robos, p.asesinatos);
    for (let i = 0; i < datos.length; i++) {
      let td = document.createElement("td");
      td.textContent = datos[i];
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  
  document.getElementById("select").addEventListener("change", Filtrar);
  
  function Filtrar() {
    let seleccion = document.getElementById("select").value;
    if (seleccion == "todos") { //no filtro nada cargo la tabla total
      RefrescarTabla();
      CargarTabla(personas);
      return personas;
    } else if (seleccion == "heroe") {//hago filter futbolistas si es esa seleccion
      RefrescarTabla();
      let heroes = personas.filter((array) => {
        if (array.hasOwnProperty("alterego")) 
        return array;
      });
      heroes.forEach((p) => {
        CargarData(p);
      });
      return heroes;
    } else {//hago filter profesionales si es esa seleccion
      RefrescarTabla(); 
      let villanos = personas.filter((array) => {
        if (array.hasOwnProperty("enemigo")) 
        return array;
      });
      villanos.forEach((p) => {
        CargarData(p);
      });
      return villanos;
    }
  }
  
  function RefrescarTabla() {
    let tbody = document.getElementById("tbody");
    for (let i = tbody.children.length; i > 0; i--) {
      tbody.removeChild(tbody.firstElementChild);
    }
  }
  
  //calcular la edad promedio
  let boton = document.getElementById("botonCalcular");
  boton.addEventListener("click", CalcularEdadPromedio);
  
  function CalcularEdadPromedio() {
    let txtEdadPromedio = document.getElementById("txtEdadPromedio");
  
    let personas = Filtrar(); //realizo primero un filtro segun seleccion
    let edades = personas.map((element) => {
          return element.edad;});
  
    let acumulador = 0;
    edades.forEach((e) => {
      acumulador += e;
    });
  
    let promedio = acumulador / edades.length;
    txtEdadPromedio.value = promedio;
  }


   //comportamiento checkboxes
   let cId = document.getElementById("checkId");
   let cNombre = document.getElementById("checkNombre");
   let cApellido = document.getElementById("checkApellido");
   let cEdad = document.getElementById("checkEdad");
   let cAlterEgo = document.getElementById("checkAlterEgo");
   let cCiudad = document.getElementById("checkCiudad");
   let cPublicado = document.getElementById("checkPublicado");
   let cEnemigo = document.getElementById("checkEnemigo");
   let cRobos = document.getElementById("checkRobos");
   let cAsesinatos = document.getElementById("checkAsesinatos");
 
   let thId = document.getElementById("thId");
   let thNombre = document.getElementById("thNombre");
   let thApellido = document.getElementById("thApellido");
   let thEdad = document.getElementById("thEdad");
   let thAlterEgo = document.getElementById("thAlterEgo");
   let thCiudad = document.getElementById("thCiudad");
   let thPublicado = document.getElementById("thPublicado");
   let thEnemigo = document.getElementById("thEnemigo");
   let thRobos = document.getElementById("thRobos");
   let thAsesinatos = document.getElementById("thAsesinatos");
 
   let arrCheck = [];
   arrCheck.push(cId,cNombre,cApellido,cEdad,cAlterEgo,cCiudad,cPublicado,cEnemigo,cRobos,cAsesinatos);
   let arrHead = [];
   arrHead.push(thId,thNombre,thApellido,thEdad,thAlterEgo,thCiudad,thPublicado,thEnemigo,thRobos,thAsesinatos);

   for(let i = 0; i<arrCheck.length;i++)
   {
     arrCheck[i].addEventListener("change", () => {ocultarMostrarColumnas(arrCheck[i],arrHead[i])});
   }
 
   function ocultarMostrarColumnas(elementoCheck, elementoHead) {

    let tbody = document.getElementById("tbody");
    let tr = tbody.childNodes;
    
    // let elementoCuerpo = document.getElementById("td");
          if(elementoCheck.checked){
           elementoHead.style.display="";
           //elementoCuerpo.style.display="";
       }
       else {
           elementoHead.style.display="none";
           //elementoCuerpo.style.display="none";
       }
   }

  //ocultar y mostrar el abm
  let formAbm = document.getElementById("formAbm");
  let formDatos = document.getElementById("Datos");
  
  formAbm.style.display="none";
  
  let btnAgregar = document.getElementById("btnAgregar");
  btnAgregar.addEventListener("click",MostrarAbm);
  
  function MostrarAbm(){ 
    formAbm.style.display="";
    formDatos.style.display="none";
  } 
 
  //form abm: select heroe o villano
  document.getElementById("selectAbm").addEventListener("change", ElegirTipo);
  let divVillano = document.getElementById("divVillano");
  divVillano.style.display="none";
  
  function ElegirTipo() {
    let divVillano = document.getElementById("divVillano");
    let divHeroe = document.getElementById("divHeroe");
  
    if(document.getElementById("selectAbm").value == "heroeAbm")
    {
      divHeroe.style.display="";
      divVillano.style.display="none";
    } else {
      divHeroe.style.display="none";
      divVillano.style.display="";
    }
  }

  //alta
  let btnAlta = document.getElementById("btnAlta");
  btnAlta.addEventListener("click",Alta);

  function Alta() {
    let nuevaPersona = CargaAlta();
    personas.push(nuevaPersona);
    RefrescarTabla();
    CargarTabla(personas);
    MostrarDatos();
  }

  function CargaAlta() {   
    let id = Math.floor(Math.random() * 10000);
    let nombre = document.getElementById("campoNombre").value;
    let apellido = document.getElementById("campoApellido").value;
    let edad = document.getElementById("campoEdad").value;
    
    if(document.getElementById("selectAbm").value == "heroeAbm")
    {
        let alterego = document.getElementById("campoAlterEgo").value || "";
        let ciudad = document.getElementById("campoCiudad").value || "";
        let publicado = document.getElementById("campoPublicado").value || 0;
        return new Heroe(id, nombre, apellido, edad, alterego, ciudad, publicado);
    } else {
        let enemigo = document.getElementById("campoEnemigo").value || "";
        let robos = document.getElementById("campoRobos").value || 0;
        let asesinatos = document.getElementById("campoAsesinatos").value || 0;
        return new Villano(id, nombre, apellido, edad, enemigo, robos, asesinatos);
    }
  }

  //modificacion
  
  //baja
  
  //cancelar
  let btnCancelar = document.getElementById("btnCancelar");
  btnCancelar.addEventListener("click",MostrarDatos);
  
  function MostrarDatos(){ 
    formAbm.style.display="none";
    formDatos.style.display="";
  }


  //ordenar form datos
  
 