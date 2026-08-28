import seirinEmblem from "../assets/emblems/seirin.png";
import shinnenEmblem from "../assets/emblems/shinnen.png";
import yosukEmblem from "../assets/emblems/yosuk.png";
import yusongEmblem from "../assets/emblems/yusong.png";
import zanfeiEmblem from "../assets/emblems/zanfei.png";

export const schools = [
  {
    id: "seirin",
    name: "Academia Seirin",
    themeClass: "school-seirin",
    color: "#3b2a6d",
    emblem: seirinEmblem,
  },
  {
    id: "shinnen",
    name: "Instituto Shinnen",
    themeClass: "school-shinnen",
    color: "#17445a",
    emblem: shinnenEmblem,
  },
  {
    id: "yosuk",
    name: "Academia Yosuk",
    themeClass: "school-yosuk",
    color: "#8a2a73",
    emblem: yosukEmblem,
  },
  {
    id: "yusong",
    name: "Academia Yusong",
    themeClass: "school-yusong",
    color: "#9b2d3a",
    emblem: yusongEmblem,
  },
  {
    id: "zanfei",
    name: "Academia Zanfei",
    themeClass: "school-zanfei",
    color: "#2d5747",
    emblem: zanfeiEmblem,
  },
  {
    id: "custom",
    name: "Outra",
    themeClass: "school-custom",
    color: "#555555",
    emblem: null,
  },
];

export function getSchoolById(id) {
  return schools.find((school) => school.id === id) || schools[0];
}