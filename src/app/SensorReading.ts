import {SingleReading} from './SingleReading';

export interface SensorReading{
    name:string;
    readings:Array<SingleReading>;
}