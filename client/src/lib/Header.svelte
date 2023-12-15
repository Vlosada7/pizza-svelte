<script>
  import logo from '$lib/assets/logo.png'
  import {auth} from '../firebase'
  import {GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged} from 'firebase/auth'
  import { isLoggedIn, user} from './stores'
  import {goto} from '$app/navigation'
  import {trpc} from '../trpc'

  
  const login = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);

      $user = res.user;
      $isLoggedIn = true;

      await createUserInDatabase($user);

      goto('/profile');
    } catch (error) {
      console.error(error);
    }
  };

  const createUserInDatabase = async ($user) => {
    try {
      const fullName = $user.displayName.split(' ');
      const name = fullName[0];
      let lastname = '';

      if (fullName.length > 1) {
        lastname = fullName.slice(1).join(' ');
      }

      const userData = {
        name: name,
        lastname: lastname,
        email: $user.email,

      };
      console.log(userData.email);
      const existingUser = await trpc.user.getByEmail.query(userData);
      if (!existingUser) {
        await trpc.user.create.mutate(userData);
      } 
    } catch (error) {
      console.error("Erro ao criar/atualizar usuário no banco de dados:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      $isLoggedIn = false;
      $user = {}
    } catch (error) {
      console.error(error)
    }
  }

  onAuthStateChanged(auth, authUser => {
    $user = authUser;
    $isLoggedIn = !!authUser
  });

</script>

<header class=" text-black py-4">
  <div class="container mx-auto flex items-center justify-between">
    <a href="/" class="logo">
      <img class="h-24" src="{logo}" alt="Logo Pizzaria">
    </a>
    <nav>
      <ul class="flex gap-6">
        <li><a href='/' class="hover:text-red-500 transition-colors duration-300">Home</a></li>
        <li><a href='/menu' class="hover:text-red-500 transition-colors duration-300">Menu</a></li>
        <li><a href='/aboutUs' class="hover:text-red-500 transition-colors duration-300">About Us</a></li>

        {#if !$isLoggedIn}
          <li>
            <a href="/" class="bg-red-500 hover:bg-white hover:text-red-500 text-white font-bold py-2 px-4 rounded transition-colors duration-300" on:click={login}>
              Login
            </a>
          </li>
        {/if}

        {#if $isLoggedIn}
        <li><a href='/profile' class="hover:text-red-500 transition-colors duration-300">Profile</a></li>
        <li><a href='/cart' class="hover:text-red-500 transition-colors duration-300">Cart</a></li>
          <li>
            <a href="/" class="bg-red-500 hover:bg-white hover:text-red-500 text-white font-bold py-2 px-4 rounded transition-colors duration-300" on:click={logout}>
              Logout
            </a>
          </li>
        {/if}

      </ul>
    </nav>
  </div>
</header>


