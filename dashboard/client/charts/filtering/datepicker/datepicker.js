import { Template } from 'meteor/templating';

Template.timeFrameSelectPicker.onRendered(function () {

  const instance = this;

  this.$('.input-daterange').datepicker({
    format: "dd M yyyy",
    todayHighlight: true,
    endDate: "+1d"
  });

})
