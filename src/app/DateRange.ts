export class DateRange{
    public beginDate:Date;
    public endDate:Date;

    constructor(){
        this.beginDate = new Date(Date.now()-3600*1000*24);
        this.endDate = new Date(Date.now());
    }

}