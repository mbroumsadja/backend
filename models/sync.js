import User from '../models/user.js';
import Session from '../models/session.js';
import Message from '../models/msg.js';
import Admin from '../models/admin.js';

await Admin.sync({force:true})
await User.sync({force:true})
await Message.sync({force:true})
await Session.sync({force:true})