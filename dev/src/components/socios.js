export default {
    template:`
	<div class="container">
	    <div class="row">
		<div class="col-md-3 webprod"  v-for="socio in socios" v-if="socio.activado">
		    <div class="card">
			<a :href="socio.web" target="_blank" class="align-middle"><img alt="" class="img-responsive" :src="'../default/download/'+socio.logo"/></a>
		    </div>
		</div>
	    </div>
	</div>
    `,
    data(){
	return {
	    socios:[]
	}
    },
    methods: {
	getSocios(){
	    axios.get('../servicios/api/socios')
		 .then((response)=>{
		     this.socios=response.data.rows;
		 })
		 .catch((error)=>console.log(error))
	}
    },
    created(){
	this.getSocios();
    }

}
