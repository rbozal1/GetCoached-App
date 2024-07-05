<template>
<div>
<base-dialog :show="!!error" title="An error occured!" @close="handleError">
<p>{{ error }}</p>

</base-dialog>

  <section>
    <coach-filter @change-filter="setFilters"></coach-filter>
    </section>
  <section>
    <base-card>
    <div class="controls">
      <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
      <base-button v-if="!isCoach && !isLoading" link to="/register">Register as Coach!</base-button>
    </div>  
    <div v-if="isLoading">
      <base-spinner></base-spinner>
    </div>
    <ul v-else-if="hasCoaches">
      <coach-item 
      v-for="coach in filteredCoaches" 
      :key="coach.id" 
      :id="coach.id" 
      :first-name="coach.firstName"
      :last-name ="coach.lastName"
      :rate="coach.hourlyRate"
      :areas="coach.areas"
      ></coach-item>
    </ul>
    <h3 v-else>No coaches found.</h3>
    </base-card>
    </section>
</div>  
</template>

<script>
import CoachFilter from '../../components/coaches/CoachFilter.vue';
import CoachItem from '../../components/coaches/CoachItem.vue';




export default {
  components: {
    CoachFilter,
    CoachItem,
   
    
  },
  data() {
   return {
    isLoading: false,
    error: null,
    activeFilters: {
      personal: true,
      basketball: true,
      soccer: true,
    },
   };
  },
  computed: {
    
    isCoach() {
        return this.$store.getters['coaches/isCoach'];
      },

    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches'];
      return coaches.filter((coach) => {
        if (this.activeFilters.personal && coach.areas.includes('personal')) {
          return true;
        }
        if (this.activeFilters.basketball && coach.areas.includes('basketball')) {
          return true;
        }
        if (this.activeFilters.soccer && coach.areas.includes('soccer')) {
          return true;
        }
        
        return false;
      });
    },
    hasCoaches() {
     return !this.isLoading && this.$store.getters['coaches/hasCoaches']
    },
   
  },
  created() {
   this.loadCoaches();
  },
  methods: {
    setFilters(updatedFilters) {
     this.activeFilters = updatedFilters;
    },
    async loadCoaches(refresh = false) {
      this.isLoading= true;
      try  {
         await this.$store.dispatch('coaches/loadCoaches', {forceRefresh: refresh});
      } catch (error) {
         this.error = error.message || 'Something went wrong!';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>