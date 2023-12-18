<script>
  import { onMount } from 'svelte';
  import { isLoggedIn, user } from '../../lib/stores';
  import { trpc } from '../../trpc';
  import { goto } from '$app/navigation';

  let pizzasData = [];
  let userData = {}; 
  let isLoading = true;

  onMount(async () => {
    loadUserData();
  });

  function formatPrice(price) {
    return `€${price.toFixed(2)}`;
  }

  $: if ($isLoggedIn && $user) {
    loadUserData();
  }

  async function loadUserData() {
    try {
      const response = await trpc.user.getByEmail.query({ email: $user.email });
      userData = response || {};
      
      const pizzasResponse = await trpc.pizza.get.query();
      pizzasData = pizzasResponse;
      
      isLoading = false;
    } catch (error) {
      console.error("Erro ao carregar dados do usuário:", error);
      isLoading = false; 
    }
  }

  function redirectToMenu() {
    goto('/menu');
  }

  $: totalCarrinho = userData.cart?.items.reduce((total, item) => total + item.price * item.quantity, 0) || 0;

  async function removeItem(productId) {
    try {
      await trpc.user.removeItemFromCart.mutate({email: $user.email, productId});
      loadUserData();
    } catch (error) {
      console.error('Erro ao remover item:', error)
    }
  }

  async function finalizeOrder() {
  try {
    await trpc.user.finalizeOrder.mutate({ email: $user.email });
    loadUserData(); 
  } catch (error) {
    console.error('Erro ao finalizar o pedido:', error);
  }
}


</script>

<div class="flex flex-col items-center justify-center my-10">
  <div class="bg-white shadow-xl rounded-lg p-6 w-3/5">
    <h1 class="text-3xl font-bold mb-4">Carrinho</h1>
    
    {#if isLoading}
      <p class="text-gray-500">Carregando...</p>
    {:else}
      {#if userData.cart?.items && userData.cart.items.length > 0}
        <ul class="space-y-4">
          {#each userData.cart.items as item, index}
            {#each pizzasData as pizza}
              {#if pizza._id === item.productId}
                <li class="flex items-center justify-between p-4 border-b border-gray-200">
                  <img src={pizza.imageUrl} alt={pizza.name} class="w-20 h-20 rounded mr-4 object-cover" />
                  <div class="flex-1">
                    <h3 class="text-lg font-semibold">{pizza.name}</h3>
                    <p class="text-sm text-gray-600">Quantidade: {item.quantity}</p>
                    <p class="text-sm text-gray-600">Preço: {formatPrice(item.price)}</p>
                  </div>
                  <span class="text-lg font-bold mr-4">{formatPrice(item.price * item.quantity)}</span>
                  <button 
                    class="text-red-500 hover:text-red-700"
                    on:click={() => removeItem(item.productId)}
                  >
                    &#10005; 
                  </button>
                </li>
              {/if}
            {/each}
          {/each}
        </ul>
        <div class="text-right mt-6">
          <h2 class="text-2xl font-bold mb-4">Total: {formatPrice(totalCarrinho)}</h2>
          <button 
            class="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            on:click={finalizeOrder}
          >
            Finalizar Pedido
          </button>
        </div>
      {:else}
        <p class="text-gray-600">O carrinho está vazio.</p>
        <button 
          class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" 
          on:click={redirectToMenu}
        >
          Iniciar Pedido
        </button>
      {/if}
    {/if}
  </div>
</div>