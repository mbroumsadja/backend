import User from '../models/user.js';
import Session from '../models/session.js';
import Message from '../models/msg.js';
import Admin from '../models/admin.js';

await Admin.sync({ force: false})
await User.sync({ force:false})
await Message.sync({ force:false})
await Session.sync({ force:false})