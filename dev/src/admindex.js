import socios from './components/socios.min.js'

var app = new Vue({
    components:{
	socios
    },
    el:'#main',
    delimiters:['${','}'],
    data:{
	message:'Hola mundo'
    }
});
