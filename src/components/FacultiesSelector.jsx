import { faculties } from "../assets/faculties";

export const getFaculties = () => {
  return faculties;
};

export const getMajorsByFacultyId = (facultyId) => {
  const faculty = faculties.find((f) => f.id === facultyId);
  return faculty ? faculty.majors : [];
};
