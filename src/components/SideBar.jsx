import { AiFillLinkedin, AiFillContacts, AiFillHome, AiFillSmile } from "react-icons/ai";

const SideBarIcon = ({ icon, text = 'tooltip', downIcon }) => (
  downIcon ? (
    <div className="sidebar-icon group">
      {icon}
      <span className="sidebar-tooltip2 group-hover:scale-100">{text}</span>
    </div>
  ) : (
    text !== "LinkedIn" && text !== "Mail" && text !== "Phone" ? (
      <div className="sidebar-icon group">
        {icon}
        <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
      </div>
    ) : (
      // Handle the case when text is "LinkedIn", "Mail", or "Phone"
      <div className="sidebar-icon2 group">
        {icon}
        <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
      </div>
    )
  )
);
export default {SideBarIcon };

