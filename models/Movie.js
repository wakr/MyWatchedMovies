

// Movie-model to abstract database objects
function Movie(name, date){
    this._name = name;
    this._date = date;

    this.getName = function(){
        return this._name;
    };

    this.getDate = function () {
        return this._date;
    };
}

module.exports = Movie;