<script>
  import { onMount } from 'svelte';
  import { isLoggedIn, user } from '../../lib/stores';
  import { trpc } from '../../trpc';

  let pizzasData = [];
  let userData = {}; 
  let isEditing = false;

  onMount(async () => {
    loadUserData();
  });

  $: if ($isLoggedIn && $user) {
    loadUserData();
  }

  function formatPrice(price) {
    return `€${price.toFixed(2)}`;
  }

  async function loadUserData() {
    try {
      const response = await trpc.user.getByEmail.query($user);
      userData = response || {};

      const pizzaResponse = await trpc.pizza.get.query();
      pizzasData = pizzaResponse; 
    } catch (error) {
      console.error("Erro ao carregar dados do usuário:", error);
    }
  }

  function toggleEdit() {
    isEditing = !isEditing;
  }

  async function saveChanges() {
    try {
      const updateData = {
        id: userData._id, 
        update: {
          name: userData.name,
          lastname: userData.lastname,
          address: userData.address,
          phone: userData.phone
        }
      };

      const updatedUser = await trpc.user.update.mutate(updateData);
      userData = updatedUser;
      isEditing = false; 
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
    }
  }

  async function repeatOrder(orderIndex) {
    const order = userData.lastOrders[orderIndex];
    try {
      for (const item of order.items) {
        await trpc.user.addItemToCart.mutate({
          email: $user.email,
          item: {
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
          }
        });
      }
      alert("Produtos adicionados ao carrinho com sucesso!");
      loadUserData();
    } catch (error) {
      console.error("Erro ao repetir o pedido:", error);
    }
  }
</script>

<h1 class="text-3xl font-bold my-4">PROFILE</h1>

{#if $isLoggedIn}
  <div class="p-4 border rounded-lg shadow space-y-4">
    <img src="{$user.photoURL}" alt="Profile" class="w-24 h-24 rounded-full mx-auto">

    {#if isEditing}
      <div class="space-y-3">
        <input type="text" bind:value={userData.name} class="w-full p-2 border rounded" placeholder="Nome">
        <input type="text" bind:value={userData.lastname} class="w-full p-2 border rounded" placeholder="Sobrenome">
        <input type="text" value={userData.email} class="w-full p-2 border rounded" disabled placeholder="Email">
        <input type="text" bind:value={userData.address} class="w-full p-2 border rounded" placeholder="Endereço">
        <input type="tel" bind:value={userData.phone} class="w-full p-2 border rounded" placeholder="Telefone">
        <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" on:click={saveChanges}>Salvar Alterações</button>
      </div>
    {:else}
      <div class="text-center space-y-2">
        {#if userData.name}
          <p class="font-semibold">{userData.name} {userData.lastname}</p>
          <p>{userData.email}</p>
          <p>{userData.address || 'Endereço não informado'}</p>
          <p>{userData.phone || 'Telefone não informado'}</p>
        {:else}
          <p>Carregando dados do usuário...</p>
        {/if}
        <button class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" on:click={toggleEdit}>Editar Perfil</button>
      </div>
    {/if}
  </div>
{/if}

<h2 class="text-2xl font-bold my-4 text-center">Últimos Pedidos</h2>

{#if $isLoggedIn && userData.lastOrders && userData.lastOrders.length > 0}
  <div class="space-y-6 max-w-4xl mx-auto">
    {#each userData.lastOrders as order, orderIndex}
      <div class="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
        <h3 class="font-bold text-lg mb-3">Pedido feito em: {new Date(order.orderDate).toLocaleDateString()}</h3>
        <ul class="space-y-2">
          {#each order.items as item}
            {#each pizzasData as pizza}
              {#if pizza._id === item.productId}
                <li class="flex items-center justify-between">
                  <div class="flex items-center">
                    <img src={pizza.imageUrl} alt={pizza.name} class="w-16 h-16 rounded-full mr-4" />
                    <div>
                      <h4 class="text-md font-semibold">{pizza.name}</h4>
                      <p class="text-sm">Quantidade: {item.quantity}</p>
                      <p class="text-sm">Preço: {formatPrice(item.price)}</p>
                    </div>
                  </div>
                  <span class="font-semibold">{formatPrice(item.price * item.quantity)}</span>
                </li>
              {/if}
            {/each}
          {/each}
        </ul>
        <div class="flex justify-between items-center mt-4">
          <span class="text-xl font-bold">Total: {formatPrice(order.total)}</span>
          <button 
            class="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            on:click={() => repeatOrder(orderIndex)}
          >
            Repetir Pedido
          </button>
        </div>
      </div>
    {/each}
  </div>
{:else}
  <p class="text-center text-gray-600">Nenhum pedido realizado.</p>
{/if}

