<script>
  import farinha from '$lib/assets/farinha.jpg'
  import ingredientesCentro from '$lib/assets/ingredientesCentro.jpg'
  import mesaComIngredientes from '$lib/assets/mesaComIngredientes.jpg'

  /**
	 * @type {any}
	 */
   export let title;
  /**
	 * @type {any}
	 */
   export let content;
  /**
	 * @type {string}
	 */
   export let img;

  if (img === 'home') img = mesaComIngredientes;
  if (img === 'menu') img = farinha;
  if (img === 'about') img = ingredientesCentro;
</script>

<section class="flex justify-center items-center w-3/4 mx-auto bg-cover bg-center rounded-lg shadow-lg" style="background-image: url({img}); height: 30vh;">
  <div class="text-white text-center">
    <h1 class="text-4xl font-bold">{title}</h1>
    <p class="text-lg">{content}</p>
  </div>
</section>


