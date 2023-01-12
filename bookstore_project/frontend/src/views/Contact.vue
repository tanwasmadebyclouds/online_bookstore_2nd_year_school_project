<template>
  <div class="container is-widescreen">
    <section class="section" v-if="error">
    </section>
    <section class="hero">
    </section>
    <section class="section">
      <div class="content">
        <div class="columns is-multiline ">
          <br><br>
          <h1 class="column is-12 ">Contact Us</h1>
          <div class="column is-6" style="margin-top:3%;">
            <figure class="image">
                <img
                  src="https://i.pinimg.com/564x/e8/31/ae/e831ae9f214edb8af507e6003975d7bd.jpg"
                  alt="Placeholder image"
                  style="height: 500px;width: 310px;margin-right:25%; border-radius:10px;"
                />
              </figure>
          </div>
          <div class="column is-6" style="margin-top:12%;">
              <h4 class="title is-4">Based in: </h4>
              <br>
              <br>
              <br>
              <p class="title is-4">Tel: (+66)</p>
              <br>
              <br>
              <br>
              <p class="title is-4">Email: </p>
              <div class="buttons" style="margin-top:15%;">
                <a class="button is-light">
                    <img src ="https://cdn-icons-png.flaticon.com/128/1384/1384031.png" style="height:50px;">
                </a>
                <a class="button is-light" style="margin-left:10%;">
                    <img src="https://cdn-icons-png.flaticon.com/128/1384/1384005.png" style="height:50px;">
                </a>
                <a class="button is-light" style="margin-left:10%;">
                    <img src="https://cdn-icons-png.flaticon.com/512/733/733635.png" style="height:50px;">
                </a>
                </div>
          </div>
        </div>
        
      </div>
    </section>
  </div>
  <!-- <figure class="image" >
                  <img
                    :src="'http://localhost:3000/'+image.file_path"
                    alt="Placeholder image"
                    style="height: 500px; object-fit: cover;"
                  />
                </figure> -->
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      blog: {},
      comments: [],
      images: [],
      error: null,
      commTxt: "",
      editToggle: -1,
      editCommentMessage: "",
    };
  }
};
</script>