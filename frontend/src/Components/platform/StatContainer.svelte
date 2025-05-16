<script>
    import clsx from 'clsx';
    const { stat ,className = ' '} = $props();
    // todo change font too bold

    // to avoid bg-gray-300 being overridden by custom bg classes
    const hasCustomBg = /bg([-\[])/.test(className);
</script>

<div
        class={clsx(
    'inline-block rounded-lg w-auto px-3.5 py-1 font-semibold',
    !hasCustomBg && 'bg-gray-300',
    className
  )}
>
    {stat}
</div>
