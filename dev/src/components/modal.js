export default{
    template:`
	<div>
	    <div class="modal fade show" id="vueModal" tabindex="-1" role="dialog" aria-labelledby="vueModalLabel" aria-hidden="true" style="display:block" >
		<div class="modal-dialog modal-lg" role="document">
		    <div class="modal-content">
			<div class="modal-header">
			    <h5 class="modal-title" id="vueModalLabel"><slot name="title"></slot></h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="cerrarPresentacion">
				    <span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
			    <slot name="body"></slot>
			</div>
		    </div>
		</div>
	    </div>
	<div class="modal-backdrop fade show"></div>
	</div>
    `,
    methods:{
	cerrarPresentacion(){
	    let elementName =Object.keys(this.$store.state)[Object.values(this.$store.state).indexOf(true)]
	    this.$store.commit('toggleModal', {display:false, element:elementName, title:''})
	}
    }
}
