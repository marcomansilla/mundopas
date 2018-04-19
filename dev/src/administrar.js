Vue.use(Vuex);

// Vuex code
const store = new Vuex.Store({
    state: {
	presentacion:false,
	imagenes:false,
	titulo:''

    },
    mutations: {
	toggleModal(state, data) {
	    state[data.element]=data.display;
	    state.titulo=data.title;
	}
    }
});


// Componets imported
import modal from './components/modal.min.js'
import presentacion from './components/presentacion.min.js'
import imagenes from './components/imagenes.min.js'

// Main vue instance
var app = new Vue({
    store:store,
    components:{
	modal,
	presentacion,
	imagenes
    },
    delimiters:['${','}'],
    el:'#main',
    data:{
    },
    computed:{
	presentacion(){
	    return store.state.presentacion;
	},
	imagenes(){
	    return store.state.imagenes;
	},

    },
    methods: {
	editarPresentacion(){
	    store.commit('toggleModal',{display:true, element:'presentacion', title:'Editar Presentacion'})
	},
	editarImagenes(){
	    store.commit('toggleModal',{display:true, element:'imagenes', title:'Editar Imagenes'})
	}
    }
});
