<template>
  <validation-observer ref="formObs" v-slot="{ invalid }">
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
          <validation-provider
            v-slot="{ errors, failedRules }"
            name="pseudo"
            rules="required|alpha"
          >
            <md-field md-clearable :class="{ 'md-invalid': errors.length > 0 }">
              <label for="pseudo">{{ $t('pages.sign.pseudo') }}</label>
              <md-input
                id="pseudo"
                v-model="form.pseudo"
                name="pseudo"
                autocomplete="pseudo"
                :disabled="sending"
              />
              <span v-if="failedRules.required" class="md-error">
                {{ $t('pages.sign.error.pseudo.required') }}
              </span>
              <span v-else-if="failedRules.alpha" class="md-error">
                {{ $t('pages.sign.error.pseudo.alpha') }}
              </span>
              <span v-else-if="errors[0] === 404" class="md-error">
                {{ $t('pages.sign.error.pseudo.notFound') }}
              </span>
              <span v-else-if="errors[0] === 409" class="md-error">
                {{ $t('pages.sign.error.pseudo.conflict') }}
              </span>
            </md-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors, failedRules }"
            name="password"
            rules="required"
          >
            <md-field :class="{ 'md-invalid': errors.length > 0 }">
              <label for="password">{{ $t('pages.sign.password') }}</label>
              <md-input
                id="password"
                v-model="form.password"
                type="password"
                name="password"
                autocomplete="password"
                :disabled="sending"
              />
              <span v-if="failedRules.required" class="md-error">
                {{ $t('pages.sign.error.password.required') }}
              </span>
              <span v-else-if="errors[0] === 403" class="md-error">
                {{ $t('pages.sign.error.password.forbidden') }}
              </span>
            </md-field>
          </validation-provider>
        </md-card-content>

        <md-progress-bar v-if="sending" md-mode="indeterminate" />

        <md-card-actions>
          <md-button
            type="submit"
            class="md-primary"
            :disabled="invalid || sending"
          >
            <span v-if="display === displayType.SIGN_UP">
              {{ $t('pages.sign.sending.signUp') }}
            </span>
            <span v-if="display === displayType.SIGN_IN">
              {{ $t('pages.sign.sending.signIn') }}
            </span>
          </md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar
        :md-active.sync="showErrorSnackbar"
        :md-duration="2000"
        md-position="center"
        md-persistent
      >
        {{ $t('pages.sign.error.tryAgainLater') }}
        <md-button class="md-primary" @click="showErrorSnackbar = false">
          ×
        </md-button>
      </md-snackbar>
    </form>
  </validation-observer>
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
