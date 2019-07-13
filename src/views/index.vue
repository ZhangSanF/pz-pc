<template>
    <div class="index">
        <Header/>
        <div class="content">
          <router-view/>
        </div>
        <Footer/>
        <Sidebar/>
        <Service/>
    </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Sidebar from '@/components/Sidebar'
import Service from '@/components/Service'

export default {
  name: 'index',
  components:{ Header, Footer, Sidebar, Service }
}
</script>

<style>
.content{
  padding-top: 132px;
}
</style>
