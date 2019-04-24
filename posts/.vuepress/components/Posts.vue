<template>
  <div>
    <div class="posts" v-if="filtered.length">
      <div class="post" v-for="post in filtered" :key="post.key">
        <h2 class="post-title">
          <router-link :to="post.path">{{ post.title }}</router-link>
        </h2>
        <div class="post-subtitle">{{ formatTime(post.frontmatter.time) }}</div>
        <router-link :to="post.path">
          <img class="post-cover" :src="post.frontmatter.cover" :alt="post.title">
        </router-link>
        <p class="post-caption">{{ post.frontmatter.caption }}</p>
      </div>
    </div>
    <ul class="pagination">
      <li class="page-item page-prev" v-show="page > 1">
        <router-link :to="'?page=' + (parseInt(page) - 1)">Newer Posts</router-link>
      </li>
      <li class="page-item page-next" v-show="posts.length > page * limit">
        <router-link :to="'?page=' + (parseInt(page) + 1)">Older Posts</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { parse, format } from "date-fns";

export default {
  data() {
    return {
      limit: 6,
      page: this.$route.query.page || 1
    };
  },

  computed: {
    posts() {
      console.log(this.$site.pages);
      return this.$site.pages
        .filter(item => {
          return item.path != "/";
        })
        .sort((a, b) => {
          return new Date(b.frontmatter.time) - new Date(a.frontmatter.time);
        });
    },
    filtered() {
      let offset = (this.page - 1) * this.limit;
      return this.posts.slice(offset, offset + this.limit);
    }
  },

  methods: {
    formatTime(time) {
      return format(time, "MMMM D, YYYY");
    }
  },

  watch: {
    $route(to) {
      this.page = to.query.page || 1;
    }
  }
};
</script>

<style>
.post {
  margin-bottom: 3.6rem;
}

.post-title {
  border-bottom: none;
  margin-bottom: 0;
}

.post-cover {
  margin-top: 2rem;
}

.pagination {
  display: flex;
  list-style: none;
  padding: 0;
}

.page-item {
  flex: 1 0 50%;
}

.page-item a {
  font-size: 1.25rem;
}

.page-next {
  text-align: right;
}
</style>
