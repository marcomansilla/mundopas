export default {
    template:`
	<div>
	    <form>
		<div class="form-group">
		    <label for="Agregar">Agregar imagenes</label>
		    <input name="" type="file" multiple value="" class="form-control" @change="processImg($event)" />
		</div>
	    </form>

	    <div class="progress">
		<div class="progress-bar progress-bar-striped" id="uploadFiles" role="progressbar" :style="'width:'+progress+'%'" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
	    </div>

	    <hr/>
	    <h4 class="float-sm-left">Imagenes subidas</h4> <p class="info info-default float-sm-right">Para eliminar una imagen haga click sobre la misma</p>
	    <br/>
	    <hr/>
	    <div class="container row">
		<div class="col-sm-3 img-container" v-for="imagen in imagenes" @click="deleteCurrent(imagen.id)">
		    <img alt="" :src="'../default/download/'+ imagen.imagen" class="img-thumbnail"/>
		    <i class="fa fa-trash img-deletable"></i>
		</div>
	    </div>
	</div>
    `,
    data(){
	return {
	    subir:null,
	    imagenes:[],
	    imagen:'',
	    fileCount:0,
	    currentFile:0,
	}
    },
    computed:{
	progress(){
	    return (this.currentFile*100)/this.fileCount || 0
	}
    },
    methods:{
	datos(){
	    axios.get('../servicios/api/imagenes')
		 .then(response=>this.imagenes=response.data.rows)
		 .catch(errors=>errors.data)
	},
	deleteCurrent(id){
	    var remove=confirm('Esta imagen será eliminada, esta operación no puede ser revertida. ¿Confirmar?')
	    if (remove==true){
		axios.delete(`../servicios/api/imagenes/${id}`)
		     .then(response=>
			 {
			     console.log(response.data)
			     this.datos();
			 })
		     .catch(errors=>console.log(errors.data))

	    }
	},
	postData(url, values){
	    axios.post(url,values)
		 .then((response)=>{
		     console.log('file uploaded');
		     this.datos();
		 })
		 .catch((error)=>{
		     console.log(error.data);
		 });
	    console.log('posting data');
	},
	processImg(e){
	    var files = e.target.files;
	    this.fileCount = e.target.files.length;
	    var url='../servicios/api/imagenes';
	    if (this.fileCount>1){
		for (let i=0; i<this.fileCount; i++){
		    const config = {
			onUploadProgress: progressEvent => console.log(progressEvent.loaded)
		    }
		    let formData = new FormData();
		    console.log('Uploading file...');
		    formData.append('titulo', files[i].name);
		    formData.append('imagen', files[i]);
		    axios.post(url, formData, config).then(response=>{
			this.currentFile=i+1;
			this.datos();
		    })
		}
		setTimeout(()=>{
		    this.currentFile=0;
		    this.fileCount=0;
		    console.log('reset progress')
		},3000);
		e.target.reset();
	    }else if (this.fileCount==1){
		let formData = new FormData();
		console.log('Uploading file...');
		formData.append('titulo', files[0].name);
		formData.append('imagen', files[0]);
		this.postData('../servicios/api/imagenes', formData)
		this.subir=null;
	    }
	}
    },
	mounted(){
	    this.datos();
	}
}
