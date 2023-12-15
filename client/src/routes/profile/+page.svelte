<script>
  import { onMount } from 'svelte';
  import { isLoggedIn, user } from '../../lib/stores';
  import { trpc } from '../../trpc';

  let userData = {}; 
  let isEditing = false;

  onMount(async () => {
    loadUserData();
  });

  $: if ($isLoggedIn && $user) {
    loadUserData();
  }

  async function loadUserData() {
    try {
      const response = await trpc.user.getByEmail.query($user);
      userData = response || {};
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
        id: userData._id, // Certifique-se de que _id está disponível
        update: {
          name: userData.name,
          lastname: userData.lastname,
          address: userData.address,
          phone: userData.phone
        }
      };

      const updatedUser = await trpc.user.update.mutate(updateData);
      userData = updatedUser;
      console.log('Dados atualizados:', userData);
      isEditing = false; 
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
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
