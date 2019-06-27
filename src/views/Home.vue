<template>
  <section class="home px-4">
    <div class="jumbotron">
      <h1>WNC Mutual Aid - Developer Projects</h1>
      <hr/>
      <p>These tools offer Proof-of-Concept technology for the purpose of collecting feedback which will be used to help shape the design of an official Asset Mapping solution.</p>
    </div>
    <div class="mb-4 spacer"></div>

    <b-row>
      <b-col cols="3">
        <div class="card shadow my-4">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary"><router-link to="/maps">Watershed Maps</router-link></h6>
          </div>
          <div class="card-body">
            Create a map with custom watershed boundaries.
          </div>
        </div>
      </b-col>
      <b-col cols="3">
        <div class="card shadow my-4">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary"><router-link to="/asset-classification">Asset Classification</router-link></h6>
          </div>
          <div class="card-body">
            Define the classification schemes used for Assets.
          </div>
        </div>
      </b-col>
      <b-col cols="3">
        <div class="card shadow my-4">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary"><router-link to="/assets">Asset Map</router-link></h6>
          </div>
          <div class="card-body">
            Create, view and filter Assets.
          </div>
        </div>
      </b-col>
      <b-col cols="3">
        <div class="card shadow my-4">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary"><router-link to="/interview">Interview Form</router-link></h6>
          </div>
          <div class="card-body">
            Record Assets and Relationships in the context of an Interview.
          </div>
        </div>
      </b-col>
    </b-row>

  </section>
</template>
