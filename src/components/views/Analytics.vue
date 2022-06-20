<template>
  <v-card id="chartcard" class="mx-auto my-4">
    <v-card-title>Аналитика по визитам</v-card-title>
    <v-card-text>
      <div style="height: inherit;" ref="chartdiv"></div>
    </v-card-text>
    <v-card-actions>
      <v-btn text @click="logout">
        Выйти
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4lang_ru_RU from "@amcharts/amcharts4/lang/ru_RU";

am4core.useTheme(am4themes_animated);

export default {
  name: 'AnalyticsPage',
  computed: {
    getGraphicData() {
      return this.$store.getters.getGraphicData;
    },
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ name: 'auth' });
    },
    createChart() {
      let chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);

      chart.paddingRight = 20;

      chart.data = this.getGraphicData.map((item) => { return { date: item.date, value: item.visits } });

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;

      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "value";

      series.tooltipText = "{valueY.value}";
      series.bullets.push(new am4charts.CircleBullet());
      chart.cursor = new am4charts.XYCursor();

      chart.language.locale = am4lang_ru_RU;

      this.chart = chart;
    },
  },
  mounted() {
    document.title = 'Аналитика';
    if (!localStorage.getItem('leadhit-site-id')) {
      this.$router.push({ name: 'auth' });
    }
    this.createChart();
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  },
}
</script>

<style lang="scss">
#chartcard {
  height: inherit;

  .v-card__text {
    height: inherit;
  }
}
</style>