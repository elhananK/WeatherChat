class City {
   constructor(name, weather, date, time) {
      this.name = name;
      this.weather = weather;
      this.date = date;
      this.time = time;
      this.comments = [];
      this.id = Date.now();
   }
};


class Comment {
   constructor(comment){
      this.comment = comment;
   }
};


export {City, Comment};