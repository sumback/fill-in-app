<template>
  <div class="page-container">
    <md-app style="min-height: 100vh;">
      <md-app-toolbar class="md-primary">
        <div class="md-toolbar-row">
          <md-button
            v-if="!menuVisible"
            class="md-icon-button"
            @click="toggleMenu"
          >
            <md-icon>menu</md-icon>
          </md-button>

          <span class="md-title">{{ name }}</span>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" md-persistent="full">
        <md-toolbar class="md-transparent" md-elevation="0">
          <span>Navigation</span>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-dense" @click="toggleMenu">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>
        <md-list>
          <md-list-item>
            <nuxt-link to="/sign-up">
              S'inscrire
            </nuxt-link>
          </md-list-item>

          <md-list-item>
            <nuxt-link to="/login">
              S'identifier
            </nuxt-link>
          </md-list-item>

          <md-list-item>
            <nuxt-link to="/users">
              Utilisateurs
            </nuxt-link>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <nuxt />
      </md-app-content>
    </md-app>
  </div>
</template>

<script lang="ts" src="./default.ts" />
