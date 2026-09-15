<template>
<div :title="$t(title)">
  <div :class="iconClass"></div>
  <div class="global_params_value">
    <div v-if="isMax">
      <img src="assets/misc/checkmark.png" class="checkmark" :alt="$t('Completed!')">
    </div>
    <div v-else>
      {{value}}{{suffix}}
    </div>
  </div>
</div>
</template>

<script lang="ts">

import {defineComponent} from 'vue';
import {MAX_OCEAN_TILES, MAX_OXYGEN_LEVEL, MAX_TEMPERATURE, MAX_VENUS_SCALE} from '@/common/constants';
import {GlobalParameter} from '@/common/GlobalParameter';

type BaseGlobalParameter = 'tecnologia' | 'fe' | 'estandartes' | 'rotas-comerciais';

const attributes: Record<BaseGlobalParameter, {max: number, title: string, iconClass: string}> = {
  [GlobalParameter.TECNOLOGIA]: {max: MAX_TEMPERATURE, title: 'Technology', iconClass: 'tecnologia-tile'},
  [GlobalParameter.FE]: {max: MAX_OXYGEN_LEVEL, title: 'Faith', iconClass: 'fe-tile'},
  [GlobalParameter.ESTANDARTES]: {max: MAX_OCEAN_TILES, title: 'Banners', iconClass: 'estandarte-tile'},
  [GlobalParameter.ROTAS_COMERCIAIS]: {max: MAX_VENUS_SCALE, title: 'Trade Routes', iconClass: 'rota-comercial-tile'},
};

export default defineComponent({
  name: 'GlobalParameterValue',
  props: {
    param: {
      type: String as () => BaseGlobalParameter,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  computed: {
    isMax(): boolean {
      return this.value === attributes[this.param].max;
    },
    title(): string {
      return attributes[this.param].title;
    },
    iconClass(): string {
      return attributes[this.param].iconClass;
    },
    suffix(): string {
      return this.param === GlobalParameter.FE ? '%' : '';
    },
  },
});

</script>
