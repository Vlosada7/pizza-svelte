<script>
  import { onMount } from 'svelte';
  import { isLoggedIn, user } from '../../lib/stores';
  import { trpc } from '../../trpc';
  import { goto } from '$app/navigation';

  let userData = {}; 
  let isLoading = true;

  onMount(async () => {
    loadUserData();
  });

  $: if ($isLoggedIn && $user) {
    loadUserData();
  }

  async function loadUserData() {
    try {
      const response = await trpc.user.getByEmail.query({ email: $user.email });
      userData = response || {};
      isLoading = false; // Dados carregados
    } catch (error) {
      console.error("Erro ao carregar dados do usuário:", error);
      isLoading = false; // Dados carregados, mesmo com erro
    }
  }

  function redirectToMenu() {
    goto('/menu'); // Redireciona para a página do menu
  }
</script>

{#if $isLoggedIn}
  <div class="flex flex-col items-center justify-center my-10">
    <div class="bg-white shadow-xl rounded-lg p-6 w-full max-w-md">
      <h1 class="text-3xl font-bold mb-4">CART</h1>
      
      {#if isLoading}
        <p class="text-gray-500">Carregando...</p>
      {:else}
        {#if userData.cart && userData.cart.length > 0}
          <ul class="list-disc pl-5 space-y-2">
            {#each userData.cart as item}
              <li>
                Produto: {item.productId}, Quantidade: {item.quantity}, Preço: {item.price}
              </li>
            {/each}
          </ul>
          <!-- Aqui você pode adicionar botões ou links para checkout ou continuar comprando -->
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
{/if}


