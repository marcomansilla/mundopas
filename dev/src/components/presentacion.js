export default {
    template:`
	<div>
	    <form action="" class="form">
		<div class="form-group">
		    <label for="titulo">Titulo</label>
		    <input name="titulo" type="text" v-model="form.titulo" class="form-control"/>
		    <div class="error_wrapper fade in" v-show="form.errors.has('titulo')">
			<div class="error"><p v-text="form.errors.get('titulo')"></p></div>
		    </div>
		</div>
		<div class="form-group">
		    <label for="ck">Contenido</label>
		    <textarea cols="30" name="ck" rows="10" class="form-control" id="ck" v-model="form.contenido"></textarea>
		</div>
		<div class="pull-right">
		    <button class="btn btn-warning"><i class="fa fa-times-circle"></i> Cancelar</button>
		    <button class="btn btn-primary" @click.prevent="enviarFormulario"><i class="fa fa-check"></i> Actualizar</button>
		</div>
	    </form>
	</div>
    `,
    data(){
	return {
	    form: new Form({
		id:null,
		titulo:'',
		contenido:''
	    }),
	}
    },
    methods:{
	datos(){
	    axios.get('../servicios/api/presentacion/1')
		 .then(response=>{
		     console.log(response.data.row)
		     this.form.id=response.data.row.id;
		     this.form.titulo=response.data.row.titulo;
		     this.form.contenido=response.data.row.contenido
		 })
		 .catch(error=>console.log(error))
	},
	enviarFormulario(){
	    this.form.submit('put','../servicios/api/presentacion/1')
	}
    },
    created(){

    },
    mounted(){
	this.datos();
	if (CKEDITOR.instances.ck) CKEDITOR.instances.ck.destroy();
	CKEDITOR.replace('ck');
    }
}
