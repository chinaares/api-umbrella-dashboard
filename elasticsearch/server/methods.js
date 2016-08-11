import { Meteor } from 'meteor/meteor';
import ElasticSearch from 'elasticsearch';
import _ from 'lodash';

Meteor.methods({
  getElasticSearchData (opts) {

    // Check if user is authorised
    if (Meteor.user()) {

      const settings = Settings.findOne(); // Get settings object

      let host; // init variable for host

      try {

        host = settings.elasticsearch.host; // Try-catch if host value exists

      } catch (e) {

        throw new Meteor.Error(500, 'Elasticsearch host is not defined. Please check your settings.');

        return false;
      }

      const esClient = new ElasticSearch.Client({ host }); // Init ES client

      // record start time
      var startTime = new Date();
      console.log("Fetching data. Time:", startTime);

      // Get elasticsearch data and return
      return esClient.search(opts).then((res) => {

        // later record end time
        var endTime = new Date();
        console.log("End time:", endTime);
        // time difference in ms
        let timeDiff = endTime - startTime;

        // strip the ms
        timeDiff /= 1000;

        // get seconds (Original had 'round' which incorrectly counts 0:28, 0:29, 1:30 ... 1:59, 1:0)
        const seconds = Math.round(timeDiff % 60);

        console.log("Fetching chart data took", seconds, "seconds.");

        return res;
      }, (err) => {

        throw new Meteor.Error(500, 'Analytics data is not found.');

        return false;
      });
    } else {

      throw new Meteor.Error(500, 'User is not authorised.');

      return false;
    }
  }
});
