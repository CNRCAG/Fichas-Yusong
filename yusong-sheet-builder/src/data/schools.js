export const schools = [
  {
    id: "seirin",
    name: "Seirin Academy",
    themeClass: "school-seirin",
    color: "#3b2a6d",
  },
  {
    id: "shinnen",
    name: "Instituto Shinnen",
    themeClass: "school-shinnen",
    color: "#17445a",
  },
  {
    id: "yosuk",
    name: "Yosuk Girls School",
    themeClass: "school-yosuk",
    color: "#8a2a73",
  },
  {
    id: "yusong",
    name: "Yusong High",
    themeClass: "school-yusong",
    color: "#9b2d3a",
  },
  {
    id: "zanfei",
    name: "Zanfei High",
    themeClass: "school-zanfei",
    color: "#2d5747",
  },
  {
    id: "custom",
    name: "Outra",
    themeClass: "school-custom",
    color: "#555555",
  },
];

export function getSchoolById(id) {
  return schools.find((school) => school.id === id) || schools[0];
}