export type CreateEvent = {
    title : string ,
    start_datetime : string, 
    end_datetime : string, 
    location_name : string,
    createdBy : string
}

export type Event = {
    id: string,
    title : string ,
    start_datetime : string, 
    end_datetime : string,
    // TODO: fix backend about this field. Using models User is the best way ? btw, this is only for development environment 
    createdBy: string,
    createdByFullName : string,
    location_name : string,
    official_lattitude : number,
    official_longitude: number,
    is_presence_active : boolean,
    status : string
}


export type EventToList = {
    id: string,
    title : string ,
    start_datetime : string, 
    end_datetime : string,
    // TODO: fix backend about this field. Using models User is the best way ? btw, this is only for development environment 
    createdBy: string,
    createdByFullName : string,
    location_name : string,
    is_presence_active : boolean,
    status : string
}

