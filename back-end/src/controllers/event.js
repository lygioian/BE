import EventService from "../services/event";
import UserService from "../services/user";
import _ from "lodash";

class EventController {
    async create(req,res) {
        try {
            const role = await UserService.getUserRole(req.payload._id);
            if (role == "student" || role == "teacher") {
                return res.status(401).json({
                    success: false,
                    message: "Invalid credentials"
                })
            }
            const event = await EventService.create({...req.body, createdAt: new Date(), userCreated: req.payload._id});
            return res.status(200).json({success: true, data: event});
        } catch (err){
            console.log(err);
            return res.status(400).json({success: false});
        }
    }

    async update(req, res) {
        try {
            const eventID = req.params.id;
            const event = await EventService.getById(eventID);
            if(req.payload._id != event.eventUnit && req.payload._id != event.eventLeader && req.payload._id != event.userCreated ) {
                    return res.status(401).json({
                    success: false,
                    message: "Invalid credentials"
                 })
            }
            if (req.body.createdAt) {
                delete req.body.createdAt;
            }
            if(req.body.eventUnit && req.body.eventUnit != event.eventUnit){
                if(req.payload._id != event.userCreated){
                    return res.status(401).json({
                        success: false,
                        message: "Invalid credentials"
                     })
                }
            }
            if(req.body.eventLeader && req.body.eventLeader != event.evenUnit){
                if(req.payload._id != event.userCreated && req.payload._id != event.eventUnit){
                    return res.status(401).json({
                        success: false,
                        message: "Invalid credentials"
                     })
                }
            }
            const eventUpdated = await EventService.update(eventID, req.body);
            return res.status(200).json({success: true, data: eventUpdated});
         } catch (err) {
            console.log(err);
            return res.status(400).json({success: false});
        }
    }

    async register(req, res) {
        try {
            const eventID = req.params.id;
            const event = await EventService.getById(eventID);
            if (event.userRegistered.length >= event.maxRegister) {
                return res.status(401).json({
                    success: false,
                    message: "Full, cannot register anymore"
                })
            }
            var check = await event.userRegistered.every(value => {return value.userId != req.payload._id});
            if (!check) {
                return res.status(401).json({
                    success: false,
                    message: "User have already registered"
                })
            }
            event.userRegistered.push({userId: req.payload._id, createdAt: new Date()});
            const data = await EventService.update(eventID, {userRegistered: [...event.userRegistered]});
            return res.status(200).json({success: true, data});
        } catch (err) {
            console.log(err);
            return res.status(400).json({success: false});
        }
    }

    async getAll(req, res) {
        try {
          const events = await EventService.getAll();
          return res.status(200).json({ success: true, data: events });
        } catch (err) {
          return res.status(400).json({ success: false });
        }
    }
    
    async getById(req, res) {
        try {
          const event = await EventService.getById(req.params.id);
    
          return res.status(200).json({ success: true, data: event });
        } catch (err) {
          return res.status(400).json({ success: false });
        }
    }

    async cancelRegister(req, res) {
        try {
            const eventID = req.params.id;
            const event = await EventService.getById(eventID);
            if (!event){
                return res.status(401).json({
                    success: false,
                    message: "Event ID not exist"
                })
            }
            const checkArr = await event.userRegistered.filter(val => { return req.payload._id != val.userId});
            if (checkArr.length == event.userRegistered.length) {
                return res.status(401).json({
                    success: false,
                    message: "You didn't register for this event"
                })
            }
            const data = await EventService.update(eventID,{userRegistered: [...checkArr]});
            return res.status(200).json({success: true, data});
        } catch (err) {
            console.log(err);
            return res.status(400).json({success: false});
        }
    }
}

export default new EventController();
