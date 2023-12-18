<script>
// @ts-nocheck

  import {trpc} from '../trpc'
  import {user} from "./stores"

  /**
	 * @type {{ img: any; name: any; description: any; price: any; }}
	 */
   export let info;

  let isInCart = false;
  let quantity = 1;
  const userEmail = $user.email

  const addToCart = async () => {
    const item = {
      productId: info._id,
      quantity: 1, 
      price: info.price,
    };

    try {
      const response = await trpc.user.addItemToCart.mutate({ email: userEmail, item: item });
      isInCart = true;
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);
    }
  };

</script>

<div class="w-60 h-60 overflow-hidden rounded-lg">
  <img src={info.imageUrl} alt={info.name} class="w-full h-full object-cover">
</div>
<h3 class="text-xl font-semibold text-gray-800 mt-4">{info.name}</h3>
<p class="text-gray-600 text-sm">{info.description}</p>
<p class="text-lg font-bold text-gray-900 mt-2">€{info.price}</p>
<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 mt-4" on:click={addToCart}>Add to cart</button>

