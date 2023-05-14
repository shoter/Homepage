import React, {Component} from "react";
import Posts from "../../code/posts/Posts";
import MobileProjectEntry from "./MobileProjectEntry";
import { Projects } from "../../code/projects/Projects";

export default class MobileProjects extends Component
{
    render = () => {
        var projects = Projects.map(p => (
          <MobileProjectEntry
            id={p.id}
            key={p.id}
            iconUrl={p.iconUrl}
            name={p.title}
            startDate={p.startDate}
            endDate={p.endDate}
          />
        ));
    
        return (
              <div className="mobile-project-list">
                {projects}
              </div>
        );
      }
}
