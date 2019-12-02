export class DateRange{
    public beginDate:Date;
    public endDate:Date;

    constructor(){
        this.beginDate = new Date(Date.now());
        this.endDate = new Date(Date.now()-1);
    }

}