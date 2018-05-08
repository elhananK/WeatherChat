class Api {
   constructor(cityName) {
      this.name = cityName;
   }

   getTemp(cityName) {
      return $.ajax({method: "GET",
       url: 'https://query.yahooapis.com/v1/public/yql?q=select item.condition ' + 'from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + cityName + '") and u="c"&format=json'})
   }
};


export {getAPI};

