export interface MyProps {
    courseName: string;
  }
  
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
  }
  interface CourseDescriptionPart extends CoursePartBase {
    description: string;
  }
  
  interface CourseSpecialPart extends CourseDescriptionPart{
    type: "special";
    requirements: string[];
    description: string;
  }
  
  interface CourseNormalPart extends CourseDescriptionPart {
    type: "normal";
    description: string;
  }
  interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
  }
  
  interface CourseSubmissionPart extends CourseDescriptionPart {
    type: "submission";
    exerciseSubmissionLink: string;
    description: string;
  }
  
export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart |CourseSpecialPart ;
  

