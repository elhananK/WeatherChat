import {Api} from "./Api.js";
import {Data} from "./Data.js";
import {City} from "./City.js";


var api = new Api();
var data = new Data();
var view = new View();


data.cities = data.getFromLocalStorage();
view.renderCities(data);


$('#searchBtn').on('click', function () {
   let $cityName = $('#searchInp').val();
   let temp = api.getTemp($cityName)
   .then(function(cityAPI){
      let cTemp = cityAPI.query.results.channel.item.condition.temp;
      let date = data.getDate();
      let time = data.getTime();
      
            
      let city = new City($cityName, cTemp, date, time);      

      data.pushToCities(city);
      data.saveToLocalStorage();
      data.cities = data.getFromLocalStorage();

      view.renderCities(data);
      $('#searchInp').val("");

   }).catch(function(err){
      console.log(err);
   })
});


$('body').on('click', '#deleteCity', function () {
   data.removeCityFromArray(this);
   view.renderCities(data);
});


$('body').on('click', '#commentBtn', function () {
   data.comment(this);
   view.renderCities(data);

});

class View {
    constructor() {}
 
    renderCities(data) {
       $('.container-fluid').empty();
       
       var source = $('#city-template').html();
       var template = Handlebars.compile(source);
       var newHTML = template(data);
       $('.container-fluid').append(newHTML);
    }
 };
