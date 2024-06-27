class DateClass {
    private timeZone: string;
    constructor(timeZone : string){
        this.timeZone = timeZone
    }
    getTime() {
        var d = new Date()
        return d.getTime()
    }
    getMonth(){
        var d = new Date()
        return d.getMonth()
    }   1

    getITmeZone() {
        return this.timeZone
    }
}

const dateObject = new DateClass("IND")
const response = dateObject.getMonth()
console.log(response);
