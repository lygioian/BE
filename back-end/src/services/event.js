import Event from "../models/event";
import UserService from "./user";

class EventService {

    async create(data) {
        const event = await Event.create(data);
        return event;
    }

    async getAll() {
        const events = await Event.find();
        return events;
    }
    
    async getById(id) {
        const event = await Event.findById(id);
        return event;
    }
      
    async update(id, data){
        const event = await Event.findByIdAndUpdate(id, data,{
          new: true,
          runValidators: true
        });
        return event;
    }
}

export default new EventService();