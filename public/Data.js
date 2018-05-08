import {Comment} from "./City.js";

const storage_id = 'weather-chat';
class Data {
   constructor() {
      this.cities = [];
   }

   pushToCities(city) {
      this.cities.push(city)
   };


   _findPostById(cities, id) {
      for (let i = 0; i < cities.length; i++) {
         if (cities[i].id == id) {
            return i;
         }
      }
   }


   removeCityFromArray(deleteCard) {
      let $cardID = $(deleteCard).closest('.city').data().id; // the data layer shouldnt touch the HTML. It should only handle data. This line of code should be part of controller;
      let cardIndex = this._findPostById(this.cities, $cardID);
      this.cities.splice(cardIndex, 1);
      this.saveToLocalStorage();
      this.cities = this.getFromLocalStorage() 
   }


   comment(card) {
      let $comment = $(card).prev('#commentInp').val(); // shouldn't be here
      let comment = new Comment($comment);
      let $cardID = $(card).closest('.city').data().id; // shouldnt be here 
      let cardIndex = this._findPostById(this.cities, $cardID);
      
      this.cities[cardIndex].comments.push(comment);
      this.saveToLocalStorage();
      this.cities = this.getFromLocalStorage();
   }
   

   getDate() {
      let dateObj = new Date();
      let month = dateObj.getMonth() + 1; 
      let day = dateObj.getDate();
      let year = dateObj.getFullYear();
      let date = day + "/" + month + "/" + year;
      return date;
   };

   getTime() {
      let dateObj = new Date();
      let hour = dateObj.getHours();
      let minutes = dateObj.getMinutes();
      let time = hour + ":" + minutes;
      return time;
   };

   saveToLocalStorage() {
    localStorage.setItem(storage_id, JSON.stringify(this.cities));
    }


    getFromLocalStorage() {
    return JSON.parse(localStorage.getItem(storage_id) || '[]');
    }



};


export {
   WeatherData
};
