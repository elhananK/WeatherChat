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
      // Getting the data from the API should be part of the API class code. make your function in the APi class last promise so that it will return a City object
      let cTemp = cityAPI.query.results.channel.item.condition.temp;
      let date = data.getDate();
      let time = data.getTime();
      
            
      let city = new City($cityName, cTemp, date, time);      

      data.pushToCities(city);
      data.saveToLocalStorage(); // Saving data is part of the data layer. it should be a private function  unknown to outsiders 
      data.cities = data.getFromLocalStorage(); // Only the data layer should ever change the data! This line of code shouldn't be here

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
 //Should be in a separate file
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
