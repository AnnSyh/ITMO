import projectsCards from "../utils/projectsCards.js";
import ProjectsSlider from "./ProjectsSlider.js";

const projectSlider = new ProjectsSlider(projectsCards);
projectSlider.setEventListenersToProjectButtons();
projectSlider.displayCards(projectsCards);