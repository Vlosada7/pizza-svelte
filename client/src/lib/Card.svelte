<script>
  import { onMount } from 'svelte';
  import { trpc } from '../trpc';
  import { user } from './stores';

  export let info;

  let quantity = 0;
  const userEmail = $user.email;

  onMount(async () => {
    loadCart();
  });

  async function loadCart() {
    try {
      const response = await trpc.user.getByEmail.query({ email: userEmail });
      const cart = response.cart;
      const cartItem = cart.items.find(item => item.productId === info._id);
      if (cartItem) {
        quantity = cartItem.quantity;
      }
    } catch (error) {
      console.error('Erro ao carregar dados do carrinho:', error);
    }
  }

  const addToCart = async () => {
    const item = {
      productId: info._id,
      quantity: quantity + 1, 
      price: info.price,
    };

    try {
      await trpc.user.addItemToCart.mutate({ email: userEmail, item: item });
      quantity += 1;
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
    }
  };

  const removeFromCart = async () => {
    if (quantity > 1) {
      const item = {
        productId: info._id,
        quantity: quantity - 1,
        price: info.price,
      };

      try {
        await trpc.user.removeItemFromCart.mutate({ email: userEmail, productId: info._id });
        quantity -= 1;
      } catch (error) {
        console.error('Erro ao remover item:', error);
      }
    } else if (quantity === 1) {
      try {
        await trpc.user.removeItemFromCart.mutate({ email: userEmail, productId: info._id });
        quantity = 0;
      } catch (error) {
        console.error('Erro ao remover item:', error);
      }
    }
  };
</script>

<div class="w-60 h-60 overflow-hidden rounded-lg">
  <img src={info.imageUrl} alt={info.name} class="w-full h-full object-cover">
</div>
<h3 class="text-xl font-semibold text-gray-800 mt-4">{info.name}</h3>
<p class="text-gray-600 text-sm">{info.description}</p>
<p class="text-lg font-bold text-gray-900 mt-2">€{info.price}</p>

{#if quantity === 0}
  <button 
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 mt-4"
    on:click={addToCart}>
    Add to cart
  </button>
{:else}
  <div class="flex items-center mt-4">
    <button 
      class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-l-full transition duration-300 ease-in-out"
      on:click={removeFromCart}>
      -
    </button>
    <span class="mx-2">{quantity}</span>
    <button 
      class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-r-full transition duration-300 ease-in-out"
      on:click={() => addToCart()}>
      +
    </button>
  </div>
{/if}
