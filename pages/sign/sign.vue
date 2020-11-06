<template>
  <form
    novalidate
    class="md-layout md-alignment-top-center"
    @submit.prevent="submitForm"
  >
    <md-card
      class="md-layout-item md-small-size-100 md-medium-size-70 md-large-size-50 md-xlarge-size-33 md-elevation-9"
    >
      <md-card-header>
        <div v-if="display === displayType.SIGN_UP" class="md-title">
          {{ $t('pages.sign.title.signUp') }}
        </div>
        <div v-if="display === displayType.SIGN_IN" class="md-title">
          {{ $t('pages.sign.title.signIn') }}
        </div>
      </md-card-header>

      <md-card-content>
        <md-field md-clearable>
          <label for="pseudo">{{ $t('pages.sign.pseudo') }}</label>
          <md-input
            id="pseudo"
            v-model="form.pseudo"
            name="pseudo"
            autocomplete="pseudo"
            :disabled="sending"
          />
        </md-field>
        <md-field>
          <label for="password">{{ $t('pages.sign.password') }}</label>
          <md-input
            id="password"
            v-model="form.password"
            type="password"
            name="password"
            autocomplete="password"
            :disabled="sending"
          />
        </md-field>
      </md-card-content>

      <md-progress-bar v-if="sending" md-mode="indeterminate" />

      <md-card-actions>
        <md-button type="submit" class="md-primary" :disabled="sending">
          <span v-if="display === displayType.SIGN_UP">
            {{ $t('pages.sign.sending.signUp') }}
          </span>
          <span v-if="display === displayType.SIGN_IN">
            {{ $t('pages.sign.sending.signIn') }}
          </span>
        </md-button>
      </md-card-actions>
    </md-card>
  </form>
</template>

<router lang="js">
{
  name: 'sign',
  alias: [
    {
      name: 'sign-up',
      path: '/sign-up'
    },
    {
      name: 'sign-in',
      path: '/sign-in'
    },
    {
      path: '/login',
      redirect: '/sign-in'
    },
  ],
  caseSensitive: true
}
</router>

<script lang="ts" src="./sign.ts" />
