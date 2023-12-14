<script>
	import Card from "$lib/Card.svelte";
  import Intro from "$lib/Intro.svelte";
	import {trpc} from '../../trpc'

  /**
	 * @type {any[]}
	 */
  let data = [];

  async function fetchData() {
    try {
      const response = await trpc.pizza.get.query();
      data = response;
    } catch (error) {
      console.error('Erro ao buscar dados', error)
    }
  }

  fetchData();

</script>

<Intro 
  title='Conheca nosso menu'
  content='Uma pizza melhor que a outra num precinho camarada'
  img = 'menu'
/>
<section class="mt-20 mx-auto w-3/4 grid grid-cols-4 gap-4">
  {#each data as pizza}
    <div class="bg-white rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out p-4 text-center flex flex-col justify-center items-center">
      <Card info={pizza}/>
    </div>
  {/each}
</section>
