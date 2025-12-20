<script lang="ts">
  import type { SnackbarType } from '$lib/types/SnackbarType';

  export let type: SnackbarType = 'info'
  export let show: boolean = false;
  export let message: string = ''
</script>

<div
  class="
    fixed bottom-8 left-1/2 -translate-x-1/2
    min-w-[280px] max-w-[400px]
    px-4 py-3 rounded-lg shadow-lg
    flex items-center gap-2
    text-white z-[9999]
    opacity-0 pointer-events-none
    transition-opacity
  "
  class:opacity-100={show}
  class:pointer-events-auto={show}
  class:animate-[slideUp_0.5s_ease]={show}
  class:animate-[fadeOut_0.5s_ease_2.5s_forwards]={show}

  class:bg-[#43a047]={type === "success"}
  class:bg-[#d50000]={type === "error"}
  class:bg-amber-400={type === "warning"}
  class:bg-[#078bff]={type === "info"}
>
  <slot name="icon" />
  <span>{message}</span>
</div>

<style>
    /* Slide animations */
    @keyframes slideUp {
        from {
            transform: translateX(-50%) translateY(40px);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }

    @keyframes fadeout {
        from {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        to {
            transform: translateX(-50%) translateY(40px);
            opacity: 0;
        }
    }
</style>