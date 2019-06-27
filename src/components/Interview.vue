<template>
  <b-container fluid class="interview">
    <div class="jumbotron">
      <h1>Asset Mapping Interview</h1>
    </div>
    <b-row>
      <b-col>
        <div class='px-4'>
          <b-form-group label="Current Interview">
            <b-form class="d-flex no-gutters">
              <b-col cols="10">
                <b-form-select v-model="selectedId">
                  <option :value="null">New Interview</option>
                  <option v-for="interview in interviews" :key="interview.id" :value="interview.id">
                    {{interview.interviewerName}} &mdash; {{interview.intervieweeName}}
                  </option>
                </b-form-select>
              </b-col>
              <b-col cols="2" v-if="selectedId">
                <b-button v-on:click="deleteInterview()" variant="light" class="ml-1">
                  <fa-icon icon="times" />
                </b-button>
              </b-col>
            </b-form>
          </b-form-group>
        </div>
      </b-col>
    </b-row>

    <b-row class="mb-4">
      <b-col cols="6">
        <h4>Interviewer:</h4>
        <b-form-input v-model="interview.interviewerName" placeholder="Interviewer Name" class="mb-1"></b-form-input>
      </b-col>
      <b-col cols="6">
        <h4>Interviewee:</h4>
        <b-form-input v-model="interview.intervieweeName" placeholder="Interviewee Name" class="mb-1"></b-form-input>
      </b-col>
    </b-row>
    <b-row class="mb-4">
      <b-col class="d-flex justify-content-end">
        <b-button v-on:click="saveInterview(interview)" variant="primary">Save</b-button>
      </b-col>
    </b-row>

    <b-row v-if="selectedId">
      <b-col>
        <b-card no-body>
          <b-tabs pills card>
            <b-tab title="Assets" active><Assets :interviewId="interview.id" /></b-tab>
            <b-tab title="Relationships"><AssetRelationships :interviewId="interview.id" /></b-tab>
          </b-tabs>
        </b-card>
      </b-col>
    </b-row>

  </b-container>
</template>
<script>
import Assets from './Assets.vue';
import AssetRelationships from './AssetRelationships.vue';

export default {
  name: 'interview',
  components: {
    Assets,
    AssetRelationships
  },
  data: function() {
    return {
      interviews: [],
      selectedId: null
    };
  },
  computed: {
    interview: function() {
      return this.selectedId && this.interviews ?
        this.interviews.filter(i => i.id === this.selectedId)[0] : {interviewerName: '', intervieweeName: ''};
    }
  },
  mounted() {
    let self = this;
    fetch("/api/interviews").then( res => res.json() )
      .then( interviews => {
        self.interviews = interviews;
      })
  },
  methods: {
    deleteInterview: function(interview) {
      let self = this;
      self.$bvModal.msgBoxConfirm("Are you sure you want to delete this asset interview?")
        .then( confirm => {
          if (confirm) {
            fetch("/api/interviews/" + interview.id, {
              method: "DELETE"
            }).then( () => {
              self.interviews = self.interviews.filter( i => i.id !== interview.id );
            })
          }
        })
    },
    updateInterview: function(interview) {
      let self = this;
      fetch("/api/interviews/" + interview.id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProps)
      }).then( res => {

      });
    },
    saveInterview: function() {
      let self = this;
      fetch("/api/interviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.interview)
      }).then( res => res.json() )
	      .then((interview) => {
          self.interviews.push(interview);
          self.selectedId = interview.id;
          self.interview = interview;
        });
    },
  }
}
</script>
