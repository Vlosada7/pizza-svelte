<script>
  import {isLoggedIn, user} from '../../lib/stores'
</script>

<h1>PROFILE</h1>


{#if $isLoggedIn}
<img src="{$user.photoURL}" alt="">
<h3>{$user.displayName}</h3>
<p>{$user.email}</p>
{/if}