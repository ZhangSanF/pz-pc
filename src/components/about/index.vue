<template>
    <div class="wrapper-content">
        <Introduction v-show="IntroductionShow" :panelShow="panelShow" />
    </div>
</template>

<script>
import Introduction from './Introduction'
export default {
    name:'about',
    data() {
        return {
        }
    },
    components:{ Introduction },
}
</script>