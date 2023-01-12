<template>
  <div class="container is-widescreen">
        <!-- Slideshow container -->
    <div>
    <carousel1>
            <carousel-slide v-for="slide in slides" :key="slide" class="carousel-slider">
                <img :src="slide" :alt="slide">
            </carousel-slide>
    </carousel1>
  </div>
    <section class="section">
      <div style="text-align: center;font-size: 30px;font-weight: bold;color:black;">
        <p>Recommend Book</p>
      </div>
      <div class="columns is-12" style="margin-top:3%">
          <carousel :per-page="4" :mouse-drag="true" :navigationEnabled="true" >
            <slide> 
                <router-link :to="`/blogs/detail/18`"><img src="https://thumbs.nosto.com/quick/magento-7943498d/orig/MG0255-01/ba93e14f7408324e609797a6d431fa3e922bb9f9eafda299fda32813d51db12da/A" style="width:95%"></router-link>
            </slide>
            <slide>
                <router-link :to="`/blogs/detail/17`"><img src="https://thumbs.nosto.com/quick/magento-7943498d/orig/MG0321-01/0b7cdf1a973a9618b967366e9062a8a5051dc66be34f0b8f9f3a299b42afbf65a/A" style="width:95%"></router-link>
            </slide>
            <slide>
               <router-link :to="`/blogs/detail/14`"><img src="https://thumbs.nosto.com/quick/magento-7943498d/orig/LN0348-01/e17304e841300da05e063226ca908096b7011431e29e596cd74484f6ae67ed6ba/A" style="width:95%"></router-link>
            </slide>
            <slide>
                <router-link :to="`/blogs/detail/12`"><img src="https://thumbs.nosto.com/quick/magento-7943498d/orig/LN0327-01/facbf1e7a13a0d5981a9f50b71ebf5eeb54d8dc519c3bb0223f30c7e745ee6e1a/A" style="width:95%"></router-link>
            </slide>
            <slide>
                <router-link :to="`/blogs/detail/19`"><img src="https://thumbs.nosto.com/quick/magento-7943498d/orig/LN0290-01/203c8aaa4389cf31de019e97d026456c8c34b897866e8fe081d54184d49b3437a/A" style="width:95%"></router-link>
            </slide>
        </carousel>
      </div>
    </section>
  </div>
</template>
<script>
import Carousel1 from './components/carousel/Carousel1.vue';
import CarouselSlide from './components/carousel/CarouselSlide';
import { Carousel, Slide } from 'vue-carousel';

export default {
  props: ['user', 'my_cart'],
  methods: {
    
    },mount () {
        this.show()
    },
    data(){
        return {
            slides: [
                "https://i.pinimg.com/originals/7b/a4/78/7ba4784afbb9a20e203c9207e764e929.png",
                "https://i.pinimg.com/originals/c3/d4/be/c3d4be580b064c96d29c62a41311ed55.jpg",
                "https://i.pinimg.com/originals/c9/d7/4d/c9d74d2e266a0f81e7b78147593d3253.jpg",
                "https://i.pinimg.com/originals/6c/3a/7e/6c3a7ea552101c3a1d6b383d07ca47ff.jpg"
            ],
        }
    },
    components : {
        Carousel1 : Carousel1,
        CarouselSlide : CarouselSlide,
        Carousel,
        Slide
    },
}
</script>

<style>
    .app {
        display:flex;
        justify-content: space-between;
    }
    .carousel {
        position:relative;
        overflow: hidden;
        width:1350px;
        height:600px;
        z-index:10;
        margin-top: 10%;
    }
    .btn {
        padding:5px 10px;
        background-color:rgba(0,0,0,0.5);
        border:1px solid transparent;
        margin:5px 10px;
        color:#FFF;
        height:50px;
        width:50px;
        position:absolute;
        margin-top:-25px;
        z-index:2;
    }
    .btn:hover {
        cursor: pointer;
    }
    .btn:focus{
        outline:none;
    }
    .btn-next {
        top:50%;
        right:0;
    }
    .btn-prev {
        top:50%;
        left:0;
    }
    .carousel-slider {
        position:absolute;
        top:0;
        left:0;
        bottom:0;
        right:0;
    }
    .carousel-slider img {
        width:100%;
        height:100%;
    }
</style>